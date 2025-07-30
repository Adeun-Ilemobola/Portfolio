function BrickWall({ list }: { list: string[][] }) {
  return (
    <div className="p-2 flex flex-col gap-y-3">
      {Array.from({ length: list.length }).map((_, row) => {
        const rowFlor = list[row] || [];
        return (
          <div
            key={row}
            className={`
              flex 
              gap-x-3 
              gap-y-3 
              ${row % 2 === 1 ? 'pl-[3.25rem]' : ''}
            `}
          >
            {Array.from({ length: rowFlor.length }).map((_, col) => {
              const brickIndex = rowFlor[col];
              return (
                <div
                  key={`${col}-${row}`}
                  className="
                    w-[10rem] h-[5rem]
                    rounded-xl border border-cyan-500/20
                    backdrop-blur-md
                    flex items-center justify-center
                    hover:scale-105 transition-transform duration-300
                    shadow-lg hover:shadow-[0_0_20px_#67e8f9]
                    bg-gradient-to-br from-[#0f172a]/70 via-[#1e293b]/60 to-[#0f172a]/70
                    hover:ring-2 hover:ring-cyan-400/50
                  "
                >
                  <h1 className="text-[1.3rem] font-medium tracking-wide text-cyan-200/80">
                    {brickIndex}
                  </h1>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default BrickWall;   