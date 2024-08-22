import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET;

export const generateToken = (user) => {
  const tokenPayload = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  // ! Crear el token con duracion de una hora
  const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "1h" });

  return token;
};

export const verifyToken = (req, res, next) => {
  // ! Obtener el token de los headers de la solicitud
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No hay token proporcionado." });
  }

  try {
    //! Verificar el token
    const decoded = jwt.verify(token, secretKey);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token no válido." });
  }
};

//decodificar el token
export const decodedToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    if (!decoded) {
      throw new Error("Failed to decode token");
    }
    return decoded;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const verifyAdminOrSeller = (req, res, next) => {
  const { role } = req.user;

  // ! Verificar si el rol es "ADMIN" o "SELLER"
  if (role === "ADMIN" || role === "SELLER") {
    next(); // Permitir el acceso
  } else {
    return res
      .status(403)
      .json({ message: "Acceso denegado. Requiere rol de ADMIN o SELLER." });
  }
};

export const verifyAdmin = (req, res, next) => {
  const { role } = req.user;

  // ! Verificar si el rol es "ADMIN" o "SELLER"
  if (role === "ADMIN") {
    next(); // Permitir el acceso
  } else {
    return res
      .status(403)
      .json({ message: "Acceso denegado. Requiere rol de ADMIN." });
  }
};

export const decodeGoogleToken = (token) => {
  const decoded = jwt.decode(token, { complete: true });
  console.log(decoded);
};
