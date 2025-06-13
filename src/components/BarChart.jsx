const BarChart = ({ data }) => {
  const days = data.dias;
  const conections = data.conexiones;

  const chartData = days.map((dia, index) => ({
    dia: dia,
    conexiones: conections[index]
  }));

  return (
    <div className="max-w-md mx-auto bg-blue-300/20 backdrop-blur-xs rounded-2xl p-4 border border-blue-300 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-blue-900 text-lg font-medium">Cyberark-PSM</h3>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-500 cursor-pointer hover:text-gray-700"
        >
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
        </svg>
      </div>

      <div className="h-48 mb-6">
        <svg width="100%" height="100%" viewBox="0 0 300 180">
          {[0, 2, 4, 6, 8, 10, 12, 14].map(value => (
            <g key={value}>
              <line
                x1="40"
                y1={160 - value * 10}
                x2="280"
                y2={160 - value * 10}
                stroke="#e2e8f0"
                strokeWidth="1"
                opacity="0.5"
              />
              <text
                x="30"
                y={165 - value * 10}
                textAnchor="end"
                className="text-xs fill-blue-900"
                dominantBaseline="middle"
              >
                {value}
              </text>
            </g>
          ))}

          {chartData.map((item, index) => {
            const barWidth = 25;
            const barSpacing = 35;
            const x = 50 + index * barSpacing;
            const barHeight = item.conexiones * 10;
            const y = 160 - barHeight;

            return (
              <g key={item.dia}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="#60a5fa90"
                  strokeWidth="1"
                  rx="4"
                  ry="4"
                />
                <text
                  x={x + barWidth / 2}
                  y="175"
                  textAnchor="middle"
                  className="text-xs fill-blue-900"
                >
                  {item.dia}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="space-y-3 text-sm bg-sky-100/60 rounded-xl lg:px-5 px-2 py-3 flex items-start gap-2">
        <div className="flex items-center justify-between">
          <span className="text-blue-900 font-bold text-xs">Conexiones</span>
        </div>

        <div className="border-l-1 border-l-blue-900 px-2 text-xs">
          <div className="flex gap-1">
            <div className="flex items-center space-x-2">
              <span className="text-blue-900">
                Realizadas (sesiones PSM){' '}
              </span>
            </div>
            <span className="text-blue-900 font-bold">
              {data.sesiones.toString().padStart(3, '0')}
            </span>
          </div>
          <div className="flex gap-1">
            <div className="flex items-center space-x-2">
              <span className="text-blue-900">No Securizadas</span>
            </div>
            <span className="text-blue-900 font-bold">
              {data.noAutorizadas.toString().padStart(3, '0')}
            </span>
          </div>

          <div className="flex gap-1">
            <div className="flex items-center space-x-2">
              <span className="text-blue-900">Legítimas / Temporales</span>
            </div>
            <span className="text-blue-900 font-bold">
              {data.temporalidades}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BarChart;
