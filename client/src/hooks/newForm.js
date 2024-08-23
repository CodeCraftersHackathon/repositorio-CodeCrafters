import { useState } from 'react';

export const useForm = (initialValues, customErrorMessages = {}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type } = event.target;

    setValues((prevValues) => {
      const currentValue = prevValues[name];

      let newValue;
      if (type === 'textarea') {
        newValue = value.split('\n');
      } else {
        newValue = value;
      }

      if (Array.isArray(currentValue)) {
        return {
          ...prevValues,
          [name]: newValue, // Reemplaza el array con el nuevo array
        };
      } else {
        return {
          ...prevValues,
          [name]: newValue, // Setea el valor directamente si no es un array
        };
      }
    });
  };

  const handleSubmit = (callback) => (event) => {
    event.preventDefault();
    if (validateForm()) {
      callback();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in values) {
      if (!values[key]) {
        newErrors[key] = customErrorMessages[key] || 'Este campo es requerido';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setValues(initialValues); // Restablece los valores iniciales
    setErrors({}); // Limpia los errores
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues,
    resetForm
  };
};
