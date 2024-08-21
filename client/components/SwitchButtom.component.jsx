export const SwitchButtonComponent = ({ text, secondaryText, icon, secondaryIcon, toggle, handleToggle }) => {

    return (
        <button onClick={handleToggle} className="p-1 bg-ipf-white transition-colors duration-300 hover:bg-ipf-gray-l rounded-md border-2 border-black focus:ring-2 focus:ring-slate-300">
            {icon && secondaryIcon ? (
                toggle ? icon : secondaryIcon
            ) : (
                toggle ? text : secondaryText
            )}
        </button>
    );
};
