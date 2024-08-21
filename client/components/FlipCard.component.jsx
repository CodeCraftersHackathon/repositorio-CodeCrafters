export const FlipCardComponent = ({ img = "", title = "", description = "", list = [] }) => {
    return (
        <div className="group/sub h-56 w-64 [perspective:1000px]">
            <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover/sub:[transform:rotateY(180deg)] bg-slate-200">

                <div className="absolute inset-0">
                    <img className="h-full w-full rounded-xl object-fill shadow-black/40" src={img} alt={description} />
                </div>
                <div className="absolute inset-0 h-full w-full rounded-xl bg-black px-2 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-auto hide-scrollbar">
                    <h4 className="font-bold text-xl underline pt-2">{title}</h4>
                    <p>¿Qué temas abarca?</p>
                    <p>{description}</p>
                    <div className="flex flex-col justify-start">
                        {list.map((item, key) => (
                            <li className="text-left" key={key}>{item}</li>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
