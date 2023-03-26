import { useEffect } from "react";
import Hero from "./components/Hero";
import Row from "./components/Row";

const Movies = () =>{
    const movie_genres = [
        {
        "id": 28,
        "name": "Action"
        },
        {
        "id": 12,
        "name": "Adventure"
        },
        {
        "id": 16,
        "name": "Animation"
        },
        {
        "id": 35,
        "name": "Comedy"
        },
        {
        "id": 80,
        "name": "Crime"
        },
        {
        "id": 99,
        "name": "Documentary"
        },
        {
        "id": 18,
        "name": "Drama"
        },
        {
        "id": 10751,
        "name": "Family"
        },
        {
        "id": 14,
        "name": "Fantasy"
        },
        {
        "id": 36,
        "name": "History"
        },
        {
        "id": 27,
        "name": "Horror"
        },
        {
        "id": 10402,
        "name": "Music"
        },
        {
        "id": 9648,
        "name": "Mystery"
        },
        {
        "id": 10749,
        "name": "Romance"
        },
        {
        "id": 878,
        "name": "Science Fiction"
        },
        {
        "id": 10770,
        "name": "TV Movie"
        },
        {
        "id": 53,
        "name": "Thriller"
        },
        {
        "id": 10752,
        "name": "War"
        },
        {
        "id": 37,
        "name": "Western"
        }
    ]
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[]);
    return(
        <>
            <Hero media_type="movie"/>
            <div className="row_wrapper">
                <Row media_type="movie" row_id="1" title_text="top movies"/>
                <Row media_type="movie" row_id="2" title_text="action" genre={28}/>
                <Row media_type="movie" row_id="3" title_text="crime" genre={80}/>
                <Row media_type="movie" row_id="4" title_text="thriller" genre={53}/>
                <Row media_type="movie" row_id="5" title_text="science fiction" genre={878}/>  
            </div>
        </>
    )
}

export default Movies;