import { check, header, param, body } from "express-validator";
import { validateSchema } from "../helpers/expressValidator.js";

const allowedFields = ['userName', 'role', 'validatePassword', 'password', 'email', "user"]

//! CREACION DE CLIENTE

export const validateStudent = [
    check("userName")
        .exists().withMessage("Debe escoger un nombre de usuario")
        .isAlphanumeric().withMessage("El nombre solo debe contener caracteres alfanumericos"),

    check("email")
        .exists().withMessage("Debe escoger un email")
        .isEmail(),

    check("password")
        .exists().withMessage("Debe escoger una contraseña")
        .isStrongPassword().withMessage("La contraseña debe contener al menos una mayuscula, minuscula, numero, caracter especial y al menos 8 caracteres"),

    check("validatePassword")
        .exists().withMessage("Debe confirmar su contraseña"),

    body("validatePassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    }),

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