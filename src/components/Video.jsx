const Video = ({name, site, video_id}) =>{
    return (
        <>
            <iframe
                src={`https://www.youtube.com/embed/${video_id}`}
                allow='autoplay; encrypted-media'
                allowFullScreen
                name={name}
                className="youtube_video"
            />
        </>
    )
}

export default Video;