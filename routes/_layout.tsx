import { FreshContext } from "$fresh/server.ts";
import Header from "../components/Header.tsx";

export default async function Layout(req: Request, ctx: FreshContext) {
    const name:string = `${ctx.state.name || "unknown"}`
  
    return (
      <div class="page-container">
        <Header name = {name}/>
        <ctx.Component />
      </div>
    );
  }