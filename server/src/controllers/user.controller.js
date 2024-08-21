import UserService from "../services/UserService.js"

export const getUserById = async (req, res) => {
    try {
        const user = await UserService.findOne(req.params.id);
        if (!user) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontro al usuario",
            });
        }
        return res.json(user)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
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
                statusCode: 404,
                status: "Not Found",
                message: "No se encontro al usuario",
            });
        }
        return res.json(user)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const getUsersByRole = async (req, res) => {
    try {
        const users = await UserService.findByRole(req.params.role);
        if (!users) {
            throw ({
                statusCode: 404,
                status: "Not Found",
                message: "No se encontraron el usuarios",
            });
        }
        return res.json(users)

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status,
        })
    }
}

export const createClient = async (req, res) => {
    try {
        await UserService.createClient(req.body)
        return res.status(201).json({
            message: 'Cliente registrado'
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status
        })
    }
}

export const createSeller = async (req, res) => {
    try {
        await UserService.createSeller(req.body)
        return res.status(201).json({
            message: 'Usuario registrado'
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await UserService.delete(req.params.id)
        return res.status(201).json({
            message: 'Usuario Eliminado'
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
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
            message: 'Login correcto', token
        })
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message,
            status: error.status
        })
    }
}
