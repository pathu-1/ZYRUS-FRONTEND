import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = ({ media_type }) =>{
    const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w1280"
    const [show, setShows] = useState([]);
    const get_trending = async () =>{
        const request = await axios.post("https://zyrus-backend.vercel.app/graphql", {
            query: `
                query TrendingNow($media_type: String) {
                    trendingNow(media_type: $media_type) {
                        id
                        name
                        poster_path
                        backdrop_path
                        overview
                        title
                        media_type
                    }
                }
            `,
            variables:{
                media_type: media_type
            }
        });
        const data = await request.data.data.trendingNow;
        setShows(data);
    }
    useEffect(()=>{
        get_trending();
    }, []);
    return(
        <>
            {
                show.map((ele)=>(
                    <div key={ele.id} style={{
                        background: `url(${BASE_IMAGE_PATH}${ele.backdrop_path})`,
                        backgroundSize: "cover"
                    }} className="hero_image">
                        <div className="hero_poster_heading">
                            {ele.name || ele.title}
                        </div>
                        <div className="hero_poster_overview">
                            {ele.overview}<br/>
                            <Link to={`/${ele.media_type}/${ele.id}`} className="hero_link">read more</Link>
                        </div>
                    </div>
                )).slice(0, 1)
            }
        </>
    )
}

export default Hero;