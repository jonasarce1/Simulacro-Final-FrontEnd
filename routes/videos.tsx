import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Video } from "../types.ts";
import VideoList from "../components/VideoList.tsx";

type State = {
    id: string,
    name: string,
    email: string
}

type Data = {
    videos: Video[],
    userId: string
}

export const handler:Handlers<Data, State> = {
    GET: async(req:Request, ctx:FreshContext<State, Data>) => {
        const API_URL = Deno.env.get("API_URL");
        const id = ctx.state.id;

        if(!API_URL){
            throw new Error("API_URL no encontrado");
        }

        const response = await fetch(`${API_URL}/videos/${id}`);

        const videos:Video[] = await response.json();

        return ctx.render({
            videos,
            userId: id
        })
    }
}

const Page = (props: PageProps<Data, State>) => {
    const {videos, userId} = props.data;

    return(
        <div class = "video-page-container">
            <h1 class="video-list-title">Curso Deno Fresh</h1>
            <VideoList videos = {videos} userId = {userId}/>
        </div>
    )
}


export default Page;