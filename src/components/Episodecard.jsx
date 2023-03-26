const Episodecard = ({ episode_number, name, overview, still_path}) =>{
    const BASE_IMAGE_PATH = "https://image.tmdb.org/t/p/w1280";
    const mediaMatch = window.matchMedia('(min-width: 500px)');
    return(
        <>
            <div className="episode_card">
                {still_path 
                    && <img src={`${BASE_IMAGE_PATH+still_path}`}/>
                }
                <div className="episode_card_info">
                    <div className="episode_number_name" style={{padding: still_path? mediaMatch ? 0: "0 0 0 4rem": "1rem 2rem 1rem 2rem"}}>{episode_number}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{name}</div>
                    <div className="epiosode_card_overview" style={{marginLeft: still_path? 0 : "4rem"}}>
                        {overview}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Episodecard;