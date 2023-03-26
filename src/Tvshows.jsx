import { useEffect } from "react";
import Hero from "./components/Hero"
import Row from "./components/Row";

const Tvshows = () =>{
    const tv_genres = [
        {
        "id": 10759,
        "name": "Action & Adventure"
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
        "id": 10762,
        "name": "Kids"
        },
        {
        "id": 9648,
        "name": "Mystery"
        },
        {
        "id": 10763,
        "name": "News"
        },
        {
        "id": 10764,
        "name": "Reality"
        },
        {
            "id": 10765,
            "name": "Sci-Fi & Fantasy"
        },
        {
        "id": 10766,
        "name": "Soap"
        },
        {
        "id": 10767,
        "name": "Talk"
        },
        {
        "id": 10768,
        "name": "War & Politics"
        },
        {
        "id": 37,
        "name": "Western"
        }
    ]
    useEffect(()=>{
        window.scrollTo(0, 0)
    },[]);
    return (
        <>
            <Hero media_type="tv"/>
            <div className="row_wrapper">
                <Row row_id="1" media_type="tv" title_text="top tv shows"/>
                <Row row_id="2" media_type="tv" title_text="dramas" genre={18}/>
                <Row row_id="3" media_type="tv" title_text="action and adventure" genre={10759}/>
                <Row row_id="4" media_type="tv" title_text="mystry" genre={9648}/>
                <Row row_id="5" media_type="tv" title_text="sci-fi and fantasy" genre={10765}/>
            </div>
        </>
    )
}

export default Tvshows;