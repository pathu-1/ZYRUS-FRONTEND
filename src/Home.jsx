import Hero from "./components/Hero"
import Row from "./components/Row";

const Home = () =>{
    return(
        <>
            <Hero media_type="tv"/>
            <div className="row_wrapper">
                <Row media_type="all" row_id="1" title_text="trending now"/>
                <Row media_type="movie" row_id="2" title_text="romentic movies" genre={10749}/>
                <Row media_type="movie" row_id="3" title_text="horror movies" genre={27}/>
                <Row media_type="tv" row_id="4" title_text="comedy shows" genre={35}/>
            </div>
        </>
    )
}

export default Home;
