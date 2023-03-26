import { useState, useEffect } from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Info from "./Info";
import Tvshows from "./Tvshows";
import Movies from "./Movies";
import Search from "./Search";
import Loading from "./Loading";
import Actor from "./Actor";
import Castpage from "./Castpage";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Footer from "./components/Footer";
import Episodes from "./Episodes";

const App = () =>{
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setLoading(false), 5000)
    }, []);
    return (
        <>
            { 
                loading == false ? (
                    <Router>
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/:media_type/:id/" element={<Info/>}/>
                            <Route path="/tvshows" element={<Tvshows/>}/>
                            <Route path="/movies" element={<Movies/>}/>
                            <Route path="/search" element={<Search/>}/>
                            <Route path="/person/:person_id/" element={<Actor/>}/>
                            <Route path="/:media_type/:id/cast/" element={<Castpage/>}/>
                            <Route path="/:media_type/:id/season/:season_number" element={<Episodes/>}/>
                        </Routes>
                        <Footer/>
                    </Router>
                ):( 
                    <Loading/>
                ) 
            } 
        </>
    )
}

export default App;