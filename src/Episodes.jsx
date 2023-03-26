import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Episodecard from "./components/Episodecard";

const Episodes = () =>{
    const {id, season_number} = useParams();
    const mediaMatch = window.matchMedia('(min-width: 500px)');
    const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
    const [showinfo, setShowInfo] = useState({});
    const [episodes, setEpisodes] = useState([]);

    const get_episode_info = async (id, season_number) =>{
        const request = await axios.post("https://zyrus-backend.vercel.app/graphql", {
            query: `
            query GetShowInfo($id: ID, $season: Int){
                getShowInfo(id: $id) {
                    id
                    backdrop_path
                    name
                    poster_path
                }
                getSeasonDetails(id: $id, season: $season) {
                    episode_number
                    name
                    overview
                    still_path
                }
            }
            `,
            variables:{
                id: id,
                season: parseInt(season_number)
            }});
            const data = await request.data.data;
            setShowInfo(data.getShowInfo);
            setEpisodes(data.getSeasonDetails);
    }
    useEffect(()=>{
        get_episode_info(id, season_number);
        window.scrollTo(0, 0);
    }, []);
    return(
        <>
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
                            <div className="infobanner_body" style={{bottom: mediaMatch? "-2rem": "-6rem"}}>
                                <div className="show_original_name" style={{textTransform: "uppercase"}}>
                                    season: {season_number}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
           <div className="episodes_page" style={{marginTop: mediaMatch? "3rem" : "none"}}>
                {
                    episodes && (
                        <div className="episodes_div">
                            {
                                episodes.map((ele, idx)=>(
                                    <Episodecard episode_number={ele.episode_number} name={ele.name} overview={ele.overview} still_path={ele.still_path}/>
                                ))
                            }
                        </div>
                    )
                }
           </div>
        </>
    )
}

export default Episodes;