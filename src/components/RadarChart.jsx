const RadarChart = () => {
  // Valores para posicionar los puntos en el radar
  const hoursPositions = [
    { label: '12 AM', x: 50, y: 10 },
    { label: '2 AM', x: 85, y: 30 },
    { label: '4 AM', x: 85, y: 70 },
    { label: '6 AM', x: 50, y: 90 },
    { label: '8 AM', x: 15, y: 70 },
    { label: '10 AM', x: 15, y: 30 }
  ];

  // Datos para las líneas del radar
  const sqlPoints = [40, 70, 50, 30, 60, 45];
  const xssPoints = [60, 50, 30, 70, 40, 55];

  // Función para generar los puntos del polígono
  const generatePolygonPoints = (points, scale = 1) => {
    return hoursPositions
      .map((pos, i) => {
        const distance = points[i] * scale * 0.4;
        const x = 50 + (pos.x - 50) * (distance / 100);
        const y = 50 + (pos.y - 50) * (distance / 100);
        return `${x},${y}`;
      })
      .join(' ');
  };

  return (
    <div className="bg-blue-50 rounded-xl p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-slate-800 mb-1">
        Total amenazas avanzadas
      </h3>

      <div className="flex items-center space-x-4 mb-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
          <span className="text-red-500 font-medium">SQL injection</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
          <span className="text-purple-500 font-medium">XSS malware</span>
        </div>
      </div>

      <div className="relative w-full aspect-square">
        {/* Radar background */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Hexagonal grid lines */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
            <polygon
              key={i}
              points="50,10 85,30 85,70 50,90 15,70 15,30"
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth="0.5"
              transform={`scale(${scale}) translate(${50 - 50 * scale}, ${
                50 - 50 * scale
              })`}
            />
          ))}

          {/* Axis lines */}
          <line
            x1="50"
            y1="10"
            x2="50"
            y2="90"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="0.5"
          />
          <line
            x1="15"
            y1="30"
            x2="85"
            y2="70"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="0.5"
          />
          <line
            x1="15"
            y1="70"
            x2="85"
            y2="30"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="0.5"
          />

          {/* SQL injection area */}
          <polygon
            points={generatePolygonPoints(sqlPoints)}
            fill="rgba(239, 68, 68, 0.2)"
            stroke="#ef4444"
            strokeWidth="1"
          />

          {/* XSS malware area */}
          <polygon
            points={generatePolygonPoints(xssPoints)}
            fill="rgba(168, 85, 247, 0.2)"
            stroke="#a855f7"
            strokeWidth="1"
          />

          {/* Hour labels */}
          {hoursPositions.map((pos, i) => (
            <text
              key={i}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="4"
              fill="#64748b"
            >
              {pos.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default RadarChart;
