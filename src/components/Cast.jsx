import { Link } from "react-router-dom";
const Cast = ({original_name, profile_path, person_id}) =>{
    const BASE_PATH = "https://image.tmdb.org/t/p/w500";
    return(
        <>
            <Link to={`/person/${person_id}`} style={{textDecoration: "none", color: "#f9fafb"}}>
                <div className="cast_wrapper">
                    <img src={`${BASE_PATH+profile_path}`}  className="cat_image"/>
                    <div className="cast_name_card">
                        <div className="cast_name">{original_name}</div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Cast;