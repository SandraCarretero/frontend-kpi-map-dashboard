const LineChart = ({ data }) => {
  const maxValue = Math.max(...data.internas, ...data.externas);
  const points = data.meses.length;

  // Generar puntos para las líneas
  const generatePath = values => {
    return values
      .map((value, index) => {
        const x = (index / (points - 1)) * 280 + 20;
        const y = 100 - (value / maxValue) * 80;
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">
          Ciberamenazas internas y externas
        </h3>
        <span className="text-sm text-slate-500">Últimos 3 meses</span>
      </div>

      {/* Leyenda */}
      <div className="flex items-center space-x-6 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
          <span className="text-sm text-slate-600">Internas</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          <span className="text-sm text-slate-600">Externas</span>
        </div>
      </div>

      {/* Gráfico de líneas */}
      <div className="h-24 mb-4">
        <svg viewBox="0 0 320 120" className="w-full h-full">
          {/* Grid */}
          <defs>
            <pattern
              id="gridPattern"
              width="40"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 20"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="320" height="120" fill="url(#gridPattern)" />

          {/* Línea interna */}
          <path
            d={generatePath(data.internas)}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Línea externa */}
          <path
            d={generatePath(data.externas)}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Puntos internos */}
          {data.internas.map((value, index) => (
            <circle
              key={`internal-${index}`}
              cx={(index / (points - 1)) * 280 + 20}
              cy={100 - (value / maxValue) * 80}
              r="4"
              fill="#06b6d4"
            />
          ))}

          {/* Puntos externos */}
          {data.externas.map((value, index) => (
            <circle
              key={`external-${index}`}
              cx={(index / (points - 1)) * 280 + 20}
              cy={100 - (value / maxValue) * 80}
              r="4"
              fill="#10b981"
            />
          ))}
        </svg>
      </div>

      {/* Etiquetas del eje X */}
      <div className="flex justify-between text-sm text-slate-600">
        {data.meses.map(mes => (
          <span key={mes}>{mes}</span>
        ))}
      </div>
    </div>
  );
};

export default LineChart;
