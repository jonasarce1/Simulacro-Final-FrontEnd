import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

type FavProps = {
    userId: string,
    videoId: string,
    fav: boolean
}

const FavButton: FunctionComponent<FavProps> = ({userId, videoId, fav}) => {
    const [isFav, setIsFav] = useState(fav);

    const toggleFav = async (userId:string, videoId:string) => {
        //No se puede Deno env get en cliente
        const response = await fetch(`https://videoapp-api.deno.dev/fav/${userId}/${videoId}`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }
        });

        if(response.status === 200){
            setIsFav(!isFav);
        }
    }

    return (
        <button class = "fav-button" onClick = {() => toggleFav(userId, videoId)}>
            {isFav ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
        </button>
    )
}

export default FavButton;