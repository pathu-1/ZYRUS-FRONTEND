import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./components/Card";
const Actor = () =>{
    const {person_id} = useParams();
    const [basicinfo, setBasicInfo] = useState({});
    const [work, setWork] = useState([]);
    const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
    const get_person = async () =>{
        const request = await axios.post(`https://zyrus-backend.vercel.app/graphql`,{
            query: `
            query GetPersonBasicInfo($id: ID) {
                getPersonBasicInfo(id: $id) {
                    id
                    biography
                    birthday
                    name
                    place_of_birth
                    profile_path
                    gender
                    homepage
                    known_for_deprtment
                    popularity
                }
                getPersonsWork(id: $id) {
                    id
                    poster_path
                    media_type
                }
            }
            `,
            variables:{
                id: person_id
            }
        });
        const data = await request.data.data;
        setBasicInfo(data.getPersonBasicInfo);
        setWork(data.getPersonsWork);
    }
    useEffect(()=>{
        get_person();
        window.scrollTo(0, 0);
    },[]);

    return(
        <>
           {
            basicinfo &&
                (
                <div className="basic_info_page">
                    <div className="person_banner">
                        <div className="person_banner_info">
                            <div className="person_banner_name">
                                {basicinfo.name}
                            </div>
                            <div className="person_banner_text">
                                <span>gender:</span> {basicinfo.gender==1? "female": "male"}
                            </div>
                            <div className="person_banner_text">
                                <span>popularity:</span> {basicinfo.popularity}
                            </div>
                            <div className="person_banner_text">
                                <span>date of birth:</span> {basicinfo.birthday}
                            </div>
                            {
                                basicinfo.place_of_birth && (
                                    <div className="person_banner_text">
                                        <span>birth place:</span> {basicinfo.place_of_birth}
                                    </div>
                                )
                            }
                        </div>
                        <img className="person_banner_image" src={`${BASE_IMAGE_PATH+basicinfo.profile_path}`}/>
                    </div>
                    {basicinfo.biography && (
                        <div className="persons_div">
                            <div className="persons_div_heading">
                                about
                            </div>
                            <div className="persons_div_content">
                                {basicinfo.biography}
                            </div>
                        </div>
                    )}
                    <div className="persons_div">
                        <div className="persons_div_heading">
                            works
                        </div>
                        <div className="persons_work_cards">
                            {
                                work && work.map((ele)=>(
                                    ele.poster_path!= null && <Card key={ele.id} poster_path={ele.poster_path} media_type={ele.media_type} card_id={ele.id}/>
                                )).reverse().slice(0,8)
                            }
                        </div>
                    </div>
                </div>
            )
           }
        </>
    )
}

export default Actor;