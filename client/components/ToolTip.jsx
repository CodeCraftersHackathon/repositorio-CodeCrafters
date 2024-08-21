import { Icon } from "../ui/Icon.component"

export const ToolTip = ({ orientation = "t", bgColor, borderColor, iconColor, text, icon }) => {
    // Clases para la posición y orientación del tooltip
    const positionClasses = {
        t: 'left-1/2 bottom-6 -translate-x-1/2 translate-y-0',  // Top
        r: 'left-full top-1/2 -translate-x-0 -translate-y-1/2 ml-2',  // Right
        b: 'left-1/2 top-full -translate-x-1/2 mt-2',  // Bottom
        l: 'right-full top-1/2 -translate-x-0 -translate-y-1/2 mr-2',  // Left
    };

    const arrowClasses = {
        t: 'left-1/2 bottom-[calc(100%-0px)] -translate-x-1/2 translate-y-2 border-b-transparent border-x-transparent',  // Top

        r: 'right-[calc(100%-0px)] top-1/2 -translate-y-1/2 translate-x-9 border-t-transparent border-l-transparent border-b-transparent',// Right

        b: 'left-1/2 top-[calc(100%-0px)] -translate-x-1/2 -translate-y-2 border-t-transparent',  // Bottom

        l: 'left-[calc(100%-0px)] top-1/2 -translate-y-1/2 -translate-x-2 border-l-transparent',  // Left
    };

    return (
        <div className="relative flex flex-col items-center group">

            <Icon color={iconColor} iconName={icon} />

            <div className="pointer-events-none ">
                <div className={`
                    absolute 
                    ${positionClasses[orientation]}
                    px-2 py-1
                    w-max max-w-60
                    ${bgColor} text-white 
                    rounded-md opacity-0 
                    transition-all duration-200
                    group-hover:opacity-100 
                    
                `}>
                    {text}
                </div>

                <div className={`
                    absolute 
                    ${arrowClasses[orientation]}
                    h-0 w-0 
                    border-8 ${borderColor}
                    opacity-0 transition-all duration-200
                    group-hover:opacity-100
                `}></div>
            </div>

        </div>
    )
}
