import { Link } from "react-router-dom";

const Seasoncard = ({air_date, name, overview, episode_count, poster_path, season_number, media_type, id}) =>{
    const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
    return(
        <>
            <Link to={`/${media_type}/${id}/season/${season_number}`} style={{textDecoration: "none", color: "#f9fafb"}}>
                <div className="season_wrapper">
                    <img src={`${BASE_IMAGE_PATH+poster_path}`}/>
                    <div className="season_card_info">
                        <div className="season_wrapper_name">{name}</div>
                        <div className="season_wrap_info"><b className="capitalize_season_heading">air date:</b> {air_date}</div>
                        <div className="season_wrap_info"><b className="capitalize_season_heading">episodes:</b> {episode_count}</div>
                        <div className="season_wrap_info">
                            {
                                overview ? overview : `${name} is premired on ${air_date}`
                            }
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Seasoncard;