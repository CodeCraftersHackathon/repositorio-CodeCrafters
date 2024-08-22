import { useState } from "react";

export const useToggle = (initailState = true) => {

    const [toggle, setToggle] = useState(initailState);

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return { toggle, handleToggle }

}
