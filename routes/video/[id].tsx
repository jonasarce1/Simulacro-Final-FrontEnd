import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Video } from "../../types.ts";
import VideoView from "../../components/VideoView.tsx";

type State = {
    id: string,
    name: string,
    email: string
}

type Data = {
    video: Video,
    userId: string
}

export const handler:Handlers<Data, State> = {
    GET: async(req:Request, ctx:FreshContext<State, Data>) => {
        const API_URL = Deno.env.get("API_URL");
        const userId = ctx.state.id;
        const videoId = ctx.params.id;

        if(!API_URL){
            throw new Error("API_URL no encontrado");
        }

        const response = await fetch(`${API_URL}/video/${userId}/${videoId}`);

        const video:Video = await response.json();

        return ctx.render({
            video,
            userId
        })
    }
}

const Page = (props: PageProps<Data, State>) => {
    const {video, userId} = props.data;

    return(
        <div class = "video-detail-container">
            <a href="/videos" class="back-button">← Go Back to List</a>
            <VideoView video = {video} userId = {userId}/>
        </div>
    )
}

export default Page;