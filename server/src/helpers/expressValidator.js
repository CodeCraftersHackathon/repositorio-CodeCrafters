import { validationResult } from "express-validator";

export const validateSchema = (allowedFields) => (req, res, next) => {
    const errors = validationResult(req);

    // Verificar si hay campos adicionales
    const receivedFields = Object.keys(req.body);
    const extraFields = receivedFields.filter(field => !allowedFields.includes(field));

    if (extraFields.length > 0) {
        return res.status(400).json({
            errors: { message: `Los siguientes campos no están permitidos: ${extraFields.join(', ')}` }
        });
    }

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().reduce((acc, error) => {
            const { path, msg } = error;
            if (!acc[path]) {
                acc[path] = [];
            }
            acc[path].push(msg);
            return acc;
        }, {});

        return res.status(400).json({ errors: formattedErrors });
    }

    next();
};