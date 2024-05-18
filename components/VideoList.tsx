import { FunctionComponent } from "preact";
import { Video } from "../types.ts";
import FavButton from "../islands/FavButton.tsx";

type VideoListProps = {
    videos: Video[],
    userId: string
}

const VideoList:FunctionComponent<VideoListProps> = ({videos, userId}) => {
    return(
        <div class="video-list-container">
            {videos.map((video:Video) => (
                <div class="video-item" data-fresh-key={userId}>
                    <a href={`/video/${video.id}`} class="video-link">
                    <img src={video.thumbnail} alt={video.title} class="video-thumbnail"/>
                    <div class="video-info">
                        <h3 class="video-title">{video.title}</h3>
                        <p class="video-description">{video.description}</p>
                        <p class="video-release-date">Release date: {video.date}</p>
                    </div>
                    </a>
                    <FavButton userId = {userId} videoId = {video.id} fav = {video.fav}/>
                </div>
            ))}
        </div>
    )
}

export default VideoList;