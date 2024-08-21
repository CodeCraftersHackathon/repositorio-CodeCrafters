import { useContext } from "react";
import { PageContext } from "../context/App.context";

export const ToggleComponent = ({ firstIcon, secondaryIcon, toggle, handleToggle }) => {
    const { darkTheme } = useContext(PageContext);

    return (
        <label htmlFor="check" className={`${darkTheme ? "bg-gray-100" : "bg-gray-700"} cursor-pointer relative w-12 h-6 rounded-full`}>
            <input
                type="checkbox"
                id="check"
                className="sr-only peer"
                checked={toggle}
                onChange={handleToggle}
            />
            <span className="w-2/5 h-4/5 bg-blue-600 absolute rounded-full right-1 top-0.5 peer-checked:bg-green-500 peer-checked:right-6 transition-all duration-500 flex items-center justify-center">
                {toggle ? firstIcon : secondaryIcon}
            </span>
        </label>
    );
};

export default ToggleComponent;
