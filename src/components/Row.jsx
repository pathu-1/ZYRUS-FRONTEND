import axios from "axios";
import { useState, useEffect } from "react";
import Card from "./Card";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";


const Row = ({ media_type, row_id, title_text, genre=0}) =>{
    const [rowstack, setRowStack] = useState([]);
    const get_data = async () => {
        if(genre===0){
            const request = await axios.post(`https://zyrus-backend.vercel.app/graphql`, {
                query: `
                    query TrendingNow($media_type: String) {
                        trendingNow(media_type: $media_type) {
                            id
                            name
                            poster_path
                            title
                            media_type
                        }
                    }
                `,
                variables:{
                    media_type: media_type
                }
            });

            const data = await request.data.data;
            setRowStack(data.trendingNow);
        }
        else if(genre!==0 && media_type==="movie"){
            const request = await axios.post(`https://zyrus-backend.vercel.app/graphql`, {
                query: `
                    query GetMoviesWithJenres($genre: Int) {
                        getMoviesWithJenres(genre: $genre) {
                            id
                            poster_path
                        }
                    }
                `,
                variables:{
                    genre: genre
                }
            });
            const data = await request.data.data;
            setRowStack(data.getMoviesWithJenres);
        }
        else{
            const request = await axios.post(`https://zyrus-backend.vercel.app/graphql`, {
                query: `
                    query GetShowsWithJenres($genre: Int) {
                        getShowsWithJenres(genre: $genre) {
                            poster_path
                            id
                        }
                    }
                `,
                variables:{
                    genre: genre
                }
            });
            const data = await request.data.data;
            setRowStack(data.getShowsWithJenres);
        }
    }

    const slideLeft = () =>{
        let slider = document.getElementById("slider"+row_id);
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () =>{
        let slider = document.getElementById("slider"+row_id);
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    useEffect(()=>{
        get_data();
    }, []);
    return(
        <>
            <div className="row_title_text">
                {title_text}
            </div>
            <div className="row">
                <BsArrowLeft
                    onClick={slideLeft}
                    size={30}
                    className="row_left_arrow row_arrow"
                    fill="#fff"
                />
                {
                    rowstack && (
                        <div className="row_stack" id={'slider' + row_id}>
                            {
                                rowstack.map((ele)=>(
                                    ele.poster_path && <Card key={ele.id} poster_path={ele.poster_path} media_type={ele.media_type || media_type} card_id={ele.id}/>
                                ))
                            }
                        </div>
                    )
                }
                <BsArrowRight
                    onClick={slideRight}
                    size={30}
                    className="row_right_arrow row_arrow"
                    fill="#fff"
                />
            </div>
        </>
    )
}

export default Row;