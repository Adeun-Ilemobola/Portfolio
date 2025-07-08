function BrickWall({ list}: { list: string[][]}) {
    return (
        <div className="p-2 flex flex-col gap-y-3"> 
            {Array.from({ length: list.length  }).map((_, row) => {
                const rowFlor = list[row] || [];
                return (
                    <div key={row}
                    className={`
                        flex 
                        gap-x-3 
                        gap-y-3 
                        ${row % 2 === 1 ? 'pl-[3.25rem]' : ''} /* half-brick offset on evens */
                       `}
                    >
                        {Array.from({ length: rowFlor.length }).map((_, col) => {
                            const brickIndex = rowFlor[col];
                            return(
                            <div
                                 key={`${col}-${row}`}
                                className="  
                                      w-[10rem] h-[5rem]
                                     rounded-lg border-1  backdrop-blur-md
                                    flex items-center justify-center
                                    hover:scale-105 transition-transform duration-300
                                    shadow-lg ring-1 ring-cyan-500/10
                                    bg-gradient-to-b from-gray-800/60 to-gray-900/30
                                "
                            >
                                <h1 className="text-[1.3rem] font-medium tracking-wide text-cyan-200/80">{brickIndex}</h1>
                            </div>
                        )})}
                    </div>
                )
            })}
        </div>
    )
}
export default BrickWall;   