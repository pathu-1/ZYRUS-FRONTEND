import { Link } from "react-router-dom";

const Card = ({poster_path, media_type, card_id}) =>{
    const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w500"
    return(
        <>
            <Link to={`/${media_type}/${card_id}`}>
                <div className="card">
                    <img src={`${BASE_IMAGE_PATH+poster_path}`}/>
                </div>
            </Link>
        </>
    )
}

export default Card;