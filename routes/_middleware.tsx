import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import jwt from "jsonwebtoken"; 

type State = {
    email: string,
    name: string,
    id: string
}

export async function handler(req: Request, ctx: FreshContext<State>) {
    if(ctx.destination !== "route"){
        const resp = await ctx.next();
        return resp;
    }

    if(ctx.route === "/login" || ctx.route === "/register"){
        const resp = await ctx.next();
        return resp;
    }

    const cookies = getCookies(req.headers);

    const auth = cookies.auth;

    if(!auth){
        return new Response ("", {
            status: 307,
            headers: {
                location: "/login"
            }
        })
    }

    const payload = jwt.verify(auth, Deno.env.get("JWT_SECRET"));

    if(!payload){
        return new Response("", {
            status: 307,
            headers: {
                location: "/login"
            }
        })
    }

    //esto es para que el resto de rutas puedan acceder a estos datos con ctx.state
    ctx.state.email = payload.email;
    ctx.state.name = payload.name;
    ctx.state.id = payload.id;

    //console.log(ctx.state.id);

    const resp = await ctx.next();
    return resp;
}