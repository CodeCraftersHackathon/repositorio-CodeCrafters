import { User } from "../models/User.js";
import { generateToken, verifyToken, decodeGoogleToken } from "../helpers/jwt.js"
import { verifyPassword } from "../helpers/validatePassword.js"

class UserService {

    async findAll() {
        try {
            return await User.find()
        } catch (error) {
            throw new Error("No se encontraron usuarios");
        }
    }
    async findOne(id) {
        try {
            return await User.findById(id)
        } catch (error) {
            throw new Error("No se encontro usuario");
        }
    }

    async findByNameOrEmail({ user }) {
        try {
            return await User.findOne({
                $or: [
                    { name: user },
                    { email: user }
                ]
            });
        } catch (error) {
            throw new Error("No se encontró el usuario");
        }
    }

    async findByRole(role) {
        try {
            if (role) {
                return await User.find({ role: role })
            } else {
                throw new Error("Elija el rol que quiere buscar");
            }
        } catch (error) {
            throw new Error(error.message || "No se encontraron usuarios");
        }
    }

    async createUser(user) {
        try {

            console.log(user);

            const existUser = await this.findByNameOrEmail({ user: user.userName })

            if (!existUser) {
                if (!user.role) {
                    return await User.create({ ...user, role: "STUDENT" });
                }
            } else {
                throw new Error("El nombre de usuario ya esta ocupado");
            }
        } catch (error) {
            throw new Error(error.message || "Error al crear usuario");
        }
    }


    async createUserGoogle(token) {
        try {
            // const existUser = await this.findByNameOrEmail({ user: token.name })

            // if (!existUser) {
            // if (!user.role) {
            return decodeGoogleToken(token)
            // User.create({ ...user, role: "STUDENT" });
            // }
            // } else {
            // throw new Error("El nombre de usuario ya esta ocupado");
        }
        // } 
        catch (error) {
            throw new Error(error.message || "Error al crear usuario");
        }
    }

    async delete(id) {
        try {
            const deletedUser = await this.findOne(id)
            console.log(deletedUser);

            if (deletedUser.role !== "ADMIN") {
                return await User.findByIdAndDelete(id)
            } else {
                throw new Error("No se puede eliminar al ADMIN")
            }

        } catch (error) {
            throw new Error("No fue posible eliminar al usuario");
        }
    }

    async login(data) {
        try {
            console.log(data);

            const existUser = await this.findByNameOrEmail({ user: data.user })

            console.log(existUser);

            const validPassword = await verifyPassword(data.password, existUser.password)

            console.log(validPassword);

            if (existUser && validPassword) {
                return generateToken(existUser)
            }
        } catch (error) {
            throw new Error(error.message || "Error al iniciar sesion");
        }
    }


    async insertManyFake(data) {
        try {
            const existUsers = await this.findAll()
                //! Inserta múltiples documentos en la colección
                await User.insertMany(data);
                return 'Datos insertados correctamente';
         
            

        } catch (error) {
            throw new Error(error.message || "Error al insertar datos");
        }
    }

}

export default new UserService()