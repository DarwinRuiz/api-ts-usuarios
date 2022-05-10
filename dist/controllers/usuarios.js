"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const searchEmailInUsers_1 = require("../helpers/searchEmailInUsers");
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll({
        where: {
            estado: 1 || true
        }
    });
    response.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    let usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        response.json({ usuario });
    }
    else {
        response.status(404).json({
            msg: `El usuario con el id ${id} no Existe!`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = request;
    try {
        if (yield (0, searchEmailInUsers_1.searchEmailInUsers)(body.email)) {
            return response.status(400).json({
                msg: "El email ya está en uso por otro usuario"
            });
        }
        const usuario = new usuario_1.default(body);
        yield usuario.save();
        response.status(201).json(usuario);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            msg: "Comuniquese con el Administrador del Recurso!"
        });
    }
});
exports.postUsuario = postUsuario;
const putUsuario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { body } = request;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return response.status(404).json({
                msg: `El usuario con el ${id} no existe!`
            });
        }
        if (yield (0, searchEmailInUsers_1.searchEmailInUsers)(body.email)) {
            return response.status(400).json({
                msg: "El email ya está en uso por otro usuario"
            });
        }
        yield usuario.update(body);
        response.json(usuario);
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            msg: "Comuniquese con el Administrador del Recurso!"
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return response.status(404).json({
                msg: `El usuario con el ${id} no existe!`
            });
        }
        yield usuario.update({ estado: false });
        response.json({
            msg: "Usuario Eliminado con Exito!"
        });
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            msg: "Comuniquese con el Administrador del Recurso!"
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map