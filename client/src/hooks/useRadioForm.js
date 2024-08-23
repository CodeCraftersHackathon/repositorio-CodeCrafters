import { useState } from 'react';

export const useRadioForm = (initialValue = '') => {
    const [selectedValues, setSelectedValues] = useState(initialValue);

    const handleSelect = (questionId, value) => {
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [questionId]: value,
        }));
    };

    return {
        selectedValues,
        handleSelect,
    };
};


