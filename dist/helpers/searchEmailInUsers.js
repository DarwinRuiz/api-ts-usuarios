"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchEmailInUsers = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const searchEmailInUsers = (emailABuscar) => {
    let respuesta = false;
    usuario_1.default.findOne({
        where: {
            email: emailABuscar
        }
    }).then(existeEmail => {
        if (existeEmail) {
            respuesta = true;
        }
    });
    return respuesta;
};
exports.searchEmailInUsers = searchEmailInUsers;
//# sourceMappingURL=searchEmailInUsers.js.map