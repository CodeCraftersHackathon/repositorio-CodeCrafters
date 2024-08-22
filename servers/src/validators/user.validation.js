import { check, header, param } from "express-validator";
import { validateSchema } from "../helpers/expressValidator.js";

const allowedFields = ['name', 'role', 'password', 'email', "user"]

//! CREACION DE CLIENTE

export const validateCliente = [
    check("name")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("email")
        .exists().withMessage("Debe escoger un email")
        .isEmail(),

    check("password")
        .exists().withMessage("Debe escoger una contraseña")
        .isStrongPassword().withMessage("La contraseña debe contener al menos una mayuscula, minuscula, numero, caracter especial y al menos 8 caracteres"),

    validateSchema(allowedFields)
]

//! CREACION DE VENDEDOR

export const validateSeller = [
    check("name")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("role")
        .exists().withMessage("Debe escoger un rol")
        .custom((value) => {
            if (value != 'SELLER' && value != 'CLIENT') {
                throw new Error('El campo role debe ser "SELLER" o "CLIENT');
            }
            return true;
        }).withMessage('El campo role debe ser "SELLER" o "CLIENT'),

    check("email")
        .exists().withMessage("Debe escoger un email")
        .isEmail().withMessage("Debe escoger un email valido"),

    check("password")
        .exists().withMessage("Debe escoger una contraseña")
        .isStrongPassword().withMessage("La contraseña debe contener al menos una mayuscula, minuscula, numero, caracter especial y al menos 8 caracteres"),

    validateSchema(allowedFields)
]

//! LOGIN

export const validateLogin = [
    check("user")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("password")
        .exists().withMessage("Debe escoger una contraseña"),

    validateSchema(["user", "password"])
]

export const validateNameOrEmail = [
    check("user")
        .exists().withMessage("Debe escoger un nombre de usuario o email"),

    validateSchema(allowedFields)
]


export const validateParamsId = [

    param("id")
        .exists().withMessage("Debe proporcionar un ID")
        .isAlphanumeric().withMessage("El ID no es valido"),

    validateSchema(["id"])

]

export const validateParamsRole = [

    param("role")
        .exists().withMessage("Debe proporcionar un rol")
        .custom((value) => {
            if (value != 'SELLER' && value != 'CLIENT') {
                throw new Error('El campo role debe ser "SELLER" o "CLIENT');
            }
            return true;
        }).withMessage('El campo role debe ser "SELLER" o "CLIENT'),

    validateSchema(["role"])

]


export const validateHeader = [

    header('Authorization')
        .exists().withMessage('El encabezado Authorization es requerido'),

    validateSchema(allowedFields)

]