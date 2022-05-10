import { Request, Response } from "express";
import { searchEmailInUsers } from "../helpers/searchEmailInUsers";
import Usuario from "../models/usuario";



export const getUsuarios = async (request: Request, response: Response) => {

    const usuarios = await Usuario.findAll({
        where: {
            estado: 1 || true
        }
    });

    response.json({ usuarios });
}

export const getUsuario = async (request: Request, response: Response) => {
    const { id } = request.params;

    let usuario = await Usuario.findByPk(id);

    if (usuario) {

        response.json({ usuario });

    } else {

        response.status(404).json({
            msg: `El usuario con el id ${id} no Existe!`
        })
    }

}

export const postUsuario = async (request: Request, response: Response) => {

    const { body } = request;

    try {

        if (await searchEmailInUsers(body.email)) {
            return response.status(400).json({
                msg: "El email ya está en uso por otro usuario"
            })
        }

        const usuario = new Usuario(body);
        await usuario.save();

        response.status(201).json(usuario);


    } catch (error) {
        console.log(error);

        response.status(500).json({
            msg: "Comuniquese con el Administrador del Recurso!"
        })
    }
}

export const putUsuario = async (request: Request, response: Response) => {

    const { id } = request.params;
    const { body } = request;

    try {

        const usuario = await Usuario.findByPk(id);


        if (!usuario) {
            return response.status(404).json({
                msg: `El usuario con el ${id} no existe!`
            })
        }


        if (await searchEmailInUsers(body.email)) {
            return response.status(400).json({
                msg: "El email ya está en uso por otro usuario"
            })
        }

        await usuario.update(body);

        response.json(usuario);


    } catch (error) {
        console.log(error);

        response.status(500).json({
            msg: "Comuniquese con el Administrador del Recurso!"
        })
    }
}

export const deleteUsuario = async (request: Request, response: Response) => {

    const { id } = request.params;

    try {

        const usuario = await Usuario.findByPk(id);


        if (!usuario) {
            return response.status(404).json({
                msg: `El usuario con el ${id} no existe!`
            })
        }

        await usuario.update({ estado: false });

        response.json({
            msg: "Usuario Eliminado con Exito!"
        })


    } catch (error) {
        console.log(error);

        response.status(500).json({
            msg: "Comuniquese con el Administrador del Recurso!"
        })
    }
}