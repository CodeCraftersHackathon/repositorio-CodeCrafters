import UserService from "../services/UserService.js"
import fakeUser from '../db/fake-user.json' assert { type: 'json' };


export const getUsers = async (req, res) => {
    try {
        const users = await UserService.findAll();
        return res.json(users)
    } catch (error) {
        return res.status(error.status || 500).json({
            status: 500,
            message: error.message,
            status: error.status,
        })
    }
}
export const getUserById = async (req, res) => {
    try {
        const user = await UserService.findOne(req.params.id);
        if (!user) {
            throw ({
                status: 404,
                status: "Not Found",
                message: "No se encontro al usuario",
            });
        }
        return res.json(user)

    } catch (error) {
        return res.status(error.status || 500).json({
            status: 500,
            message: error.message,
            status: error.status,
        })
    }
}

export const getUserByNameOrEmail = async (req, res) => {
    try {
        const user = await UserService.findByNameOrEmail(req.body);
        if (!user) {
            throw ({
                status: 404,
                status: "Not Found",
                message: "No se encontro al usuario",
            });
        }
        return res.json(user)

    } catch (error) {
        return res.status(error.status || 500).json({
            status: 500,
            message: error.message,
            status: error.status,
        })
    }
}

export const createStudent = async (req, res) => {
    try {
        await UserService.createUser(req.body)
        return res.status(201).json({
            status: 201,
            message: 'Estudiante registrado'
        })
    } catch (error) {
        return res.status(error.status || 500).json({
            status: 500,
            message: error.message,
            status: error.status
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await UserService.delete(req.params.id)
        return res.status(201).json({
            status: 204,
            message: 'Usuario Eliminado'
        })
    } catch (error) {
        return res.status(error.status || 500).json({
            status: 500,
            message: error.message,
            status: error.status
        })
    }
}

export const login = async (req, res) => {
    try {
        const token = await UserService.login(req.body)

        console.log(token);

        return res.status(201).json({
            status: 201,
            message: 'Login correcto', token
        })
    } catch (error) {
        return res.status(error.status || 500).json({
            status: 500,
            message: error.message,
            status: error.status
        })
    }
}

export const createFakeUser = async (req, res) => {
    try {
        const users = await UserService.insertManyFake(fakeUser)

        return res.status(201).json({
            status: 201,
            message: users
        })

    } catch (error) {
        return res.status(error.status || 500).json({
            status: 500,
            message: error.message,
            status: error.status
        })
    }
}

export const createStudentGoogle = async (req, res) => {
    try {
        const token = await UserService.createUserGoogle(req.body)
        return res.status(201).json({
            token
            // status: 201,
            // message: 'Estudiante registrado'
        })
    } catch (error) {
        return res.status(error.status || 500).json({
            status: 500,
            message: error.message,
            status: error.status
        })
    }
}