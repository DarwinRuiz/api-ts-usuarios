import Usuario from "../models/usuario";


export const searchEmailInUsers = (emailABuscar: string) => {
    
    let respuesta = false;
    
    Usuario.findOne({
        where: {
            email: emailABuscar
        }
    }).then(existeEmail => {
        if (existeEmail) {
            respuesta = true;
        } 
    })

    return respuesta;

};