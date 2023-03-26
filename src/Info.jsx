import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { TiStar } from "react-icons/ti";
import Cast from "./components/Cast";
import { Link } from "react-router-dom";
import Video from "./components/Video";
import Seasoncard from "./components/Seasoncard";


const Info = () =>{
    const {media_type, id} = useParams();
    const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
    const [showinfo, setShowInfo] = useState({});
    const [seriescast, setSeriescast] = useState([]);
    const [seriestrailer, setSeriesTrailer] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [movieinfo, setMovieInfo] = useState({});
    const [moviecast, setMoviecst] = useState([]);
    const [movietrailer, setMovieTrailer] = useState([]);

    const [backdropimages, setBackdropImages] = useState([]);
    const [posterimages, setPosterImages] = useState([]);

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
                    seasons{
                        air_date
                        episode_count
                        name
                        overview
                        poster_path
                        season_number
                    }
                }
                getSeriesCast(id: $id) {
                    id
                    original_name
                    profile_path
                }
                getSeriesTrailer(id: $id){
                    name
                    site
                    key
                }
                getSeriesImages(id: $id){
                    backdrops {
                      file_path
                    }
                    posters {
                      file_path
                    }
                }
            }
            `,
            variables:{
                id: id
            }});
            const data = await request.data.data;
            setShowInfo(data.getShowInfo);
            setSeriescast(data.getSeriesCast);
            setSeasons(data.getShowInfo.seasons);
            setSeriesTrailer(data.getSeriesTrailer);
            setBackdropImages(data.getSeriesImages.backdrops);
            setPosterImages(data.getSeriesImages.posters);
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
                    }
                    getMovieTrailer(id: $id) {
                        name
                        site
                        key
                    }
                    getMovieImages(id: $id){
                        backdrops {
                          file_path
                        }
                        posters {
                          file_path
                        }
                    }
                }
            `,
            variables:{
                id: id
            }});  
            const data = await request.data.data;
            setMovieInfo(data.getMovieInfo); 
            setMoviecst(data.getMovieCast);
            setMovieTrailer(data.getMovieTrailer);
            setBackdropImages(data.getMovieImages.backdrops);
            setPosterImages(data.getMovieImages.posters);
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
                                    backgroundImage: `url(${BASE_IMAGE_PATH}${showinfo.backdrop_path})`,
                                    backgroundSize: "cover"
                                }}
                                className="info_banner"
                            >
                                <div className="infobanner_heading">
                                    {showinfo.name}
                                </div>
                                <div className="infobanner_body">
                                    <div className="show_rating">
                                        <TiStar size={35} fill="#ffd500"/> <span>{showinfo.vote_average}</span> 
                                    </div>
                                    <div className="show_original_name">
                                        {showinfo.original_name}
                                    </div>
                                    <div className="show_seasons_episodes">
                                        <div>
                                            <span>seasons</span> {showinfo.number_of_seasons}
                                        </div>
                                        <div>
                                            <span>episodes</span> {showinfo.number_of_episodes}
                                        </div>
                                    </div>
                                    <div className="show_genere">
                                        {
                                            showinfo.genres && showinfo.genres.map((ele, idx)=>(
                                                <span key={idx}>{ele.name}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        showinfo && (
                            <div className="drama_info">
                                <div className="info_div drama_overview">
                                    <span>summary</span>
                                    {showinfo.overview}
                                </div>
                                <div className="info_div drama_cast">
                                    <span>cast</span>
                                    <div className="show_cast_display">
                                        {
                                            seriescast && seriescast.map((ele)=>(
                                                <Cast key={ele.id} original_name={ele.original_name} profile_path={ele.profile_path} person_id={ele.id}/>
                                            )).slice(0, 4)
                                        }
                                    </div>
                                </div>
                                <Link to={`/${media_type}/${id}/cast`} className="cast_more_link">view more</Link>
                                {
                                    seasons && (
                                        <div className="info_div" style={{marginTop: "3rem"}}>
                                            <span>seasons & episodes</span>
                                            <div>
                                                {
                                                    seasons.map((ele, idx)=>(
                                                        ele.poster_path!=null && <Seasoncard key={idx} air_date={ele.air_date} name={ele.name} overview={ele.overview} episode_count={ele.episode_count} poster_path={ele.poster_path} season_number={ele.season_number} media_type={media_type} id={id}/>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )
                                }
                                {
                                    seriestrailer.length!=0 && (
                                    <div className="info_div">
                                        <span>clips & trailes</span>
                                        <div className="show_trailers_display">
                                            {
                                                seriestrailer && seriestrailer.map((ele)=>(
                                                    <Video key={ele.key} name={ele.name} site={ele.site} video_id={ele.key}/>
                                                )).slice(0,4)
                                            }
                                        </div>
                                    </div>
                                )}
                                <div className="info_div">
                                    <span>backdrop images</span>
                                    <div className="show_backdrop_display">
                                        {
                                            backdropimages && backdropimages.map((ele, idx)=>(
                                                <img src={`${BASE_IMAGE_PATH+ele.file_path}`} key={idx} className="backdrop_image"/>
                                            )).slice(0,6)
                                        }
                                    </div>
                                </div>
                                <div className="info_div">
                                    <span>poster images</span>
                                    <div className="show_poster_display">
                                        {
                                            posterimages && posterimages.map((ele, idx)=>(
                                                ele.file_path!=null && <img src={`${BASE_IMAGE_PATH+ele.file_path}`} key={idx} className="poster_image"/>
                                            )).slice(0,4)
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
                                        <div className="show_rating">
                                            <TiStar size={35} fill="#ffd500"/> <span>{movieinfo.vote_average}</span> 
                                        </div>
                                        <div className="show_original_name">
                                            {movieinfo.original_title}
                                        </div>
                                        <div className="show_genere">
                                            {
                                                movieinfo.genres && movieinfo.genres.map((ele, idx)=>(
                                                    <span key={idx}>{ele.name}</span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                        movieinfo && (
                            <div className="drama_info">
                                <div className="info_div drama_overview">
                                    <span>summary</span>
                                    {movieinfo.overview}
                                </div>
                                <div className="info_div drama_cast">
                                    <span>cast</span>
                                    <div className="show_cast_display">
                                        {
                                            moviecast && moviecast.map((ele)=>(
                                                <Cast key={ele.id} original_name={ele.original_name} profile_path={ele.profile_path} person_id={ele.id}/>
                                            )).slice(0, 4)
                                        }
                                    </div>
                                </div>
                                <Link to={`/${media_type}/${id}/cast`} className="cast_more_link">view more</Link>
                                {
                                    movietrailer.length!=0 && (
                                    <div className="info_div" style={{marginTop: "3rem"}}>
                                        <span>clips & trailes</span>
                                        <div className="show_trailers_display">
                                            {
                                                movietrailer && movietrailer.map((ele)=>(
                                                    <Video key={ele.key} name={ele.name} site={ele.site} video_id={ele.key}/>
                                                )).slice(0, 4)
                                            }
                                        </div>
                                    </div>
                                )}
                                <div className="info_div">
                                    <span>backdrop images</span>
                                    <div className="show_backdrop_display">
                                        {
                                            backdropimages && backdropimages.map((ele, idx)=>(
                                                <img src={`${BASE_IMAGE_PATH+ele.file_path}`} key={idx} className="backdrop_image"/>
                                            )).slice(0,6)
                                        }
                                    </div>
                                </div>
                                <div className="info_div">
                                    <span>poster images</span>
                                    <div className="show_poster_display">
                                        {
                                            posterimages && posterimages.map((ele, idx)=>(
                                                ele.file_path!=null && <img src={`${BASE_IMAGE_PATH+ele.file_path}`} key={idx} className="poster_image"/>
                                            )).slice(0,4)
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

export default Info;
