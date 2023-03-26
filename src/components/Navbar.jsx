import { useEffect, useState } from "react";
import { CgSearch, CgClose } from "react-icons/cg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {RiArrowDropDownFill} from "react-icons/ri";

const Navbar = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    const [scroll, setScroll] = useState(false);
    const [ clicksearch, setClickSearch ] = useState(false);
    const [hidesearch, setHideSearch] = useState(true);
    const [query, setQuery] = useState("");
    const [mobilenav, setMobileNav] = useState(false);
    let queryParams = new URLSearchParams(location.search);

    const showInput = () =>{
        setClickSearch(!clicksearch);
        setHideSearch(!hidesearch);
    }

    const closeSearch = () =>{
        if(queryParams !== undefined && queryParams.has("query")){
            queryParams.delete("query");
            navigate(queryParams.toString());
        }
        showInput();
    }
    // const hideSearchElement = () =>{
    //     showInput();
    // }
    
    const fetch_search = () =>{
        if(query !== ""){
            navigate({
                pathname: "/search",
                search: `?query=${query}`
            })
        }
    }


    useEffect(()=>{
        fetch_search();
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 50){
                setScroll(true);
            }
            else{
                setScroll(false);
            }
        })
    },[query]);
    return(
        <>
            <div className={`navbar nav ${scroll && "nav_black"}`}>
                <div className="navbar_left">
                    <div className="navbar_logo">
                        zyrus
                    </div>
                    <div className="mobile_nav">
                        <div className="mobile_nav_heading" onClick={() => setMobileNav(!mobilenav)}>
                            browse <RiArrowDropDownFill size={25}/>
                        </div>
                        {
                            mobilenav && (
                                <div className="mobile_nav_section">
                                    <NavLink to="/" className={({ isActive }) => "nav_link" + (isActive ? " activated" : "")}>home</NavLink>
                                    <NavLink to="/tvshows" className={({ isActive }) => "nav_link" + (isActive ? " activated" : "")}>tv shows</NavLink>
                                    <NavLink to="/movies" className={({ isActive }) => "nav_link" + (isActive ? " activated" : "")}>movies</NavLink>
                                </div>
                            )
                        }
                    </div>
                    <div className="navbar_links">
                        <NavLink to="/" className={({ isActive }) => "nav_link" + (isActive ? " activated" : "")}>home</NavLink>
                        <NavLink to="/tvshows" className={({ isActive }) => "nav_link" + (isActive ? " activated" : "")}>tv shows</NavLink>
                        <NavLink to="/movies" className={({ isActive }) => "nav_link" + (isActive ? " activated" : "")}>movies</NavLink>
                    </div>
                </div>
                <div className="navbar_right">
                    {
                        clicksearch && <div className="search_input_group">
                            <CgSearch size={25} className="search_btn"/>
                                <input type="text" className="search_input" onChange={event => setQuery(event.target.value)}/>
                            <CgClose size={25} className="close_btn" onClick={closeSearch}/>
                        </div>
                    }
                    {hidesearch &&  <CgSearch size={25} onClick={showInput}/>}
                </div>
            </div>
        </>
    )
}

export default Navbar;