import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Cast from "./components/Cast";
import Character from "./components/Character";

const Castpage = () =>{
    const {media_type, id} = useParams();
    const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
    const mediaMatch = window.matchMedia('(min-width: 500px)');
    const [showinfo, setShowInfo] = useState({});
    const [seriescast, setSeriescast] = useState([]);
    const [movieinfo, setMovieInfo] = useState({});
    const [moviecast, setMoviecst] = useState([]);

    const get_info = async (id) =>{
        if(media_type === "tv"){
            const request = await axios.post("https://zyrus-backend.vercel.app/graphql", {
            query: `
            query GetShowInfo($id: ID) {
                getShowInfo(id: $id) {
                    id
                    media_type
                    name
                    backdrop_path
                    overview
                    popularity
                    title
                    poster_path
                    original_language
                    number_of_episodes
                    number_of_seasons
                    vote_average
                    original_name
                    genres{
                        name
                    }
                }
                getSeriesCast(id: $id) {
                    id
                    original_name
                    profile_path
                    gender
                    character
                    popularity
                }
            }
            `,
            variables:{
                id: id
            }});
            const data = await request.data.data;
            setShowInfo(data.getShowInfo);
            setSeriescast(data.getSeriesCast);
        }
        else{
            const request = await axios.post("https://zyrus-backend.vercel.app/graphql", {
            query: `
                query GetMovieInfo($id: ID) {
                    getMovieInfo(id: $id) {
                        id
                        backdrop_path
                        title
                        original_title
                        overview
                        genres {
                        name
                        }
                        vote_average
                    }
                    getMovieCast(id: $id) {
                        id
                        original_name
                        profile_path
                        character
                        gender
                        popularity
                    }
                }
            `,
            variables:{
                id: id
            }});  
            const data = await request.data.data;
            setMovieInfo(data.getMovieInfo); 
            setMoviecst(data.getMovieCast);
        }
    };

    useEffect(()=>{
        get_info(id);
        window.scrollTo(0, 0);
    }, []);
    return(
        <>
            {
                media_type === "tv" ? (
                    <div className="drama_info_page">
                    {
                        showinfo && (
                            <div 
                                style={{
                                    backgroundImage: `url(${BASE_IMAGE_PATH+showinfo.backdrop_path})`,
                                    backgroundSize: "cover"
                                }}
                                className="info_banner"
                            >
                                <div className="infobanner_heading">
                                    {showinfo.name}
                                </div>
                                <div className="infobanner_body">
                                    <div className="show_original_name">
                                        CAST
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        showinfo && (
                            <div className="drama_info">
                                <div className="info_div drama_cast">
                                    <div className="show_cast_display">
                                        {
                                            seriescast && seriescast.map((ele)=>(
                                                ele.profile_path!=null && <Character key={ele.id} gender={ele.gender} character={ele.character} popularity={ele.popularity} original_name={ele.original_name} profile_path={ele.profile_path}  person_id={ele.id}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                ):(
                    <div className="drama_info_page">
                        {
                            movieinfo && (
                                <div 
                                    style={{
                                        backgroundImage: `url(${BASE_IMAGE_PATH+movieinfo.backdrop_path})`,
                                        backgroundSize: "cover"
                                    }}
                                    className="info_banner"
                                >
                                    <div className="infobanner_heading">
                                        {movieinfo.title}
                                    </div>
                                    <div className="infobanner_body">
                                        <div className="show_original_name">
                                            CAST
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                        movieinfo && (
                            <div className="drama_info">
                                <div className="info_div drama_cast">
                                    <div className="show_cast_display">
                                        {
                                            moviecast && moviecast.map((ele)=>(
                                                ele.profile_path!=null && <Character key={ele.id} gender={ele.gender} character={ele.character} popularity={ele.popularity} original_name={ele.original_name} profile_path={ele.profile_path}  person_id={ele.id}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        }
                    </div>
                )
            }
        </>
    )
}

export default Castpage;