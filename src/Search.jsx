import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./components/Card";

const Search = () =>{
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [searchres, setSearchRes] = useState([]);
    const fetch_search = async () =>{
        const request = await axios.post(`https://zyrus-backend.vercel.app/graphql`,{
            query: `
                query Search($query: String) {
                    search(query: $query) {
                    id
                    media_type
                    poster_path
                    }
                }
            `,
            variables:{
                query: query
            }
        });
        const data = await request.data.data.search;
        setSearchRes(data);
    }

    useEffect(()=>{
        fetch_search();
    },[query])
    return (
        <>
            <div className="search_text">
                You are searching for {query}
            </div>
            <div className="search_results">
                {
                    searchres && searchres.map((ele) =>(

                        ele.poster_path && <Card key={ele.id} poster_path={ele.poster_path} media_type={ele.media_type} card_id={ele.id}/>
                    ))
                }
            </div>
        </>
    )
}

export default Search;