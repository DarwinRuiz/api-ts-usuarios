import { Sequelize } from "sequelize";

const database = new Sequelize( "node", "root", "ruiz23", {
    host: "localhost",
    dialect: "mysql",
    logging: true
} );


export default database;