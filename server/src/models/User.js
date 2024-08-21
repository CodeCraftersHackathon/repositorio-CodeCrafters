import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Definir el esquema de usuario
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, {
    timestamps: true
});

// Middleware para encriptar la contraseña antes de guardar
UserSchema.pre("save", async function (next) {
    const user = this

    // Solo encriptar la contraseña si ha sido modificada o es nueva

    if (!user.isModified("password")) {
        return next();
    }

    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        // Reemplazar la contraseña en texto plano con la encriptada
        user.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

// Verificar si ya existe un usuario ADMIN
UserSchema.statics.createDefaultAdmin = async function () {
    const User = this;

    const adminExists = await User.findOne({ name: "ADMIN" });

    if (!adminExists) {
        // Crear un nuevo usuario "ADMIN" con la contraseña "0000"
        const admin = new User({
            name: "ADMIN",
            password: "0000",
            email: "adminEmail@gmail.com",
            role: "ADMIN"
            // Esta será encriptada por el middlewarerole: "ADMIN"
        });
        await admin.save();
        console.log("Usuario ADMIN creado por defecto");
    }
};

// Crear el modelo
export const User = model("users", UserSchema);

// Crear el usuario ADMIN por defecto

User.createDefaultAdmin();
