import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { RouteConfig } from "$fresh/server.ts";
import {setCookie} from "$std/http/cookie.ts";
import jwt from "jsonwebtoken";
import { User } from "../types.ts";
import { isToken } from "$std/media_types/_util.ts";
import Login from "../components/Login.tsx";
import Register from "../components/Register.tsx";

export const config: RouteConfig = {
    skipInheritedLayouts: true, 
};

export type Data = {
    message: string
}

export const handler:Handlers = {
    POST: async(req:Request, ctx:FreshContext<unknown, Data>) => {
        const form = await req.formData();
        const email = form.get("email")?.toString();
        const password = form.get("password")?.toString();
        const name = form.get("name")?.toString();
        const url = new URL(req.url);

        const JWT_SECRET = Deno.env.get("JWT_SECRET");

        if(!JWT_SECRET){
            throw new Error("JWT_SECRET no encontrado");
        }

        const API_URL = Deno.env.get("API_URL");

        if(!API_URL){
            throw new Error("API_URL no encontrado");
        }

        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                name
            })
        })

        if(response.status == 400){
            return ctx.render({
                message: "Ya existe un usuario con ese email"
            })
        }
        
        if(response.status == 200){
            const data:Omit<User, "password" | "favs"> = await response.json();

            const token = jwt.sign({
                id: data.id,
                name: data.name,
                email: data.email
            }, JWT_SECRET, {
                expiresIn: "24h"
            });

            const headers = new Headers();
            headers.set("location", "/videos");

            setCookie(headers, {
                name: "auth",
                value: token,
                sameSite: "Lax",
                domain: url.hostname,
                path: "/",
                secure: true, 
            });
            
            return new Response(null, {
                status: 303,
                headers
            })
        }else{
            return ctx.render({
                message: "Error: Puede ser que el email ya exista o que ya haya un usuario asociado a ese email"
            })
        }
    }
}

const Page = (props:PageProps<Data>) => {
    return <Register message={props.data?.message}/>
}

export default Page;