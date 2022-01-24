import { Application } from "https://deno.land/x/oak/mod.ts";
import { Handlebars } from 'https://deno.land/x/handlebars/mod.ts';
import routerPages from "./routes/renderPages.routes.ts";
import routerUsers from './routes/users.routes.ts'
import { parse } from 'https://deno.land/std/flags/mod.ts';

const app = new Application();
const handle = new Handlebars();

app.use(routerPages.routes());
app.use(routerUsers.routes())

app.use(routerPages.allowedMethods())
app.use(routerUsers.allowedMethods())


console.log(`listening on port 3000...`);
const DEFAULT_PORT = 3000

const argPort = parse(Deno.args).port

await app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT });

export { handle }