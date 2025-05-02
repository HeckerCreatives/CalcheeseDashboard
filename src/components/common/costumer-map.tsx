export function CustomerMap() {
    return (
      <div className="h-[250px] w-full flex items-center justify-center">
        <div className="relative w-full h-full">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            {/* This is a simplified world map representation */}
            <path
              d="M150,100 Q300,50 450,100 T750,100 Q900,150 850,300 T750,400 Q600,450 450,400 T150,400 Q50,300 150,100"
              fill="#0040ff"
              stroke="#0040ff"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    )
  }
  