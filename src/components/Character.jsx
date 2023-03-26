import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const Character = ({id, gender, character, popularity,original_name, profile_path, person_id}) =>{
    const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";

    return(
        <>
            <Link to={`/person/${person_id}`} style={{textDecoration: "none", color: "#f9fafb"}}>
                <div className="character">
                    <img src={`${BASE_IMAGE_PATH+profile_path}`}/>
                    <div className="character_info_wrapper">
                        <div className="character_info">
                            <div className="character_info_heading">
                                name:
                            </div>
                            <div className="character_info_content">
                                {original_name}
                            </div>
                        </div>
                        <div className="character_info">
                            <div className="character_info_heading">
                                character:
                            </div>
                            <div className="character_info_content">
                                {character}
                            </div>
                        </div>
                        <div className="character_info">
                            <div className="character_info_heading">
                                popularity:
                            </div>
                            <div className="character_info_content">
                                {popularity}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Character;