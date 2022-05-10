import dotenv from "dotenv";
import Server from "./models/server";


dotenv.config();


const serverPrincipal = new Server();

serverPrincipal.listen();
