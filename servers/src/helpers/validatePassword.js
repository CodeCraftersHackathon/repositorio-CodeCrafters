import bcrypt from 'bcrypt'

export const verifyPassword = async (Password, PasswordHash) => {
    try {

        const match = await bcrypt.compare(Password, PasswordHash);
        if (match === true) {
            return match;
        }else{
            throw new Error("Las contraseñas no coinciden");
        }
    } catch (error) {
        throw new Error(error.message || 'Error al verificar la contraseña');
    }
}
