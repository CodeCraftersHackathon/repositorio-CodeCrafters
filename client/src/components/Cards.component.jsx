export const Cards = ({ img, title, content, children, footer = true, nav, subTitle }) => {

  const altImg = `https://ui-avatars.com/api?background=random&name=${title}`

  return (
      <article className="bg-white shadow rounded-xl  group w-72
      hover:shadow-2xl relative z-10">

          < div className="relative overflow-hidden cursor-pointer">

              {/* IMG */}
              <div className="h-72 w-72 rounded-xl">
                  <img src={img ? img : altImg} alt={`${title} img`}
                      className="h-full w-full object-cover duration-700 transition-transform
                  group-hover:scale-125 rounded-xl" />
              </div>

              {/* OSCURIDAD POR ENCIMA*/}
              <div className="rounded-xl absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 group-hover:from-black/30 group-hover:via-black/40 group-hover:to-black/50"></div>

              {/* TITULO Y CONTENIDO */}
              <div
                  onClick={nav}
                  className="p-5 space-y-3 absolute inset-0 rounded-xl
                  from-transparent via-transparent to-black/45 bg-gradient-to-b
                  translate-y-[60%] transition-all duration-500 group-hover:translate-y-10
                  ">

                  <a href="#" className="group-hover:text-blue-600 group-hover:underline inline-block">
                      <h4 className="font-bold text-xl leading-tight text-white text-border">{title}</h4>
                  </a>

                  <p className="text-slate-300 text-md text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {content}
                  </p>

                  <button className="text-black text-md text-justify opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-pulse rounded bg-slate-50 px-1 group-hover:underline group-hover:font-bold"
                  >
                      ¡Ir!
                  </button>
              </div>

          </div >

          {/* FOOTER DE LA TARJETA */}
          {footer && (
              < div className="flex justify-center items-center py-3 space-x-2" >

                  <p>{subTitle}</p>

                  <div className="space-y-2">
                      {children}
                  </div>
              </ div>
          )}
      </article >
  )
}