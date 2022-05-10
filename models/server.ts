import express from 'express';
import cors from 'cors';

import usuariosRoutes from '../routes/usuario';
import database from '../database/connection';

class Server {

    private app: express.Application;
    private port: string;
    private apiPaths = {
        usuarios: "/api/usuarios"
    }

    constructor() {

        this.app = express();
        this.port = process.env.PORT || "8000";

        //inicializamos la bases de datos
        this.connectionDataBase();

        //iniciar los middlewares
        this.middlewares();

        //definir rutas
        this.routes();
    }

    async connectionDataBase() {
        try {
            
            await database.authenticate();
            console.log("database on line");

        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //LECTURA DE BODY
        this.app.use( express.json() );


        //CARPETA PÚBLICA
        this.app.use( express.static("public") );
    }

    routes() {
        this.app.use( this.apiPaths.usuarios, usuariosRoutes );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`El servidor se está ejecutando en el puerto -> ${ this.port }`);
        })
    }

}

export default Server;