import { FunctionComponent } from "preact";
import FavButton from "../islands/FavButton.tsx";
import { Video } from "../types.ts";

type VideoProps = {
    video: Video,
    userId: string
}

const VideoView:FunctionComponent<VideoProps> = ({video, userId}) => {
    return(
        <>
            <div class="video-frame">
                <iframe width="100%" height="400px" src={`https://www.youtube.com/embed/${video.youtubeid}`} title={video.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <h2 class="video-detail-title">{video.title}</h2>
            <p class="video-detail-description">{video.description}</p>
            <FavButton userId = {userId} videoId = {video.id} fav = {video.fav}/>
        </>
    )
}

export default VideoView;