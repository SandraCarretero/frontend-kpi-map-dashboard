const RadarChart = ({ data }) => {
  const amenazas = data?.amenazasAvanzadas || {
    horas: ['2 AM', '4 AM', '6 AM'],
    valores: {
      'SQL injection': [4, 7, 5],
      'XSS malware': [6, 9, 3]
    }
  };

  const { horas, valores } = amenazas;
  const center = { x: 150, y: 150 };
  const maxRadius = 100;
  const maxValue = 10; // Valor máximo para normalizar

  // Función para convertir coordenadas polares a cartesianas
  const polarToCartesian = (angle, radius) => {
    const x = center.x + radius * Math.cos(((angle - 90) * Math.PI) / 180);
    const y = center.y + radius * Math.sin(((angle - 90) * Math.PI) / 180);
    return { x, y };
  };

  // Crear los niveles de la cuadrícula (círculos concéntricos)
  const gridLevels = [2, 4, 6, 8, 10];
  const angleStep = 360 / horas.length;

  // Generar puntos para cada línea de datos
  const generatePath = dataValues => {
    const points = dataValues.map((value, index) => {
      const angle = index * angleStep;
      const radius = (value / maxValue) * maxRadius;
      return polarToCartesian(angle, radius);
    });

    // Cerrar el path volviendo al primer punto
    const pathData =
      points
        .map(
          (point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
        )
        .join(' ') + ' Z';

    return { pathData, points };
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 shadow-lg max-w-sm mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-gray-800 font-semibold text-lg mb-2">
          Total amenazas avanzadas
        </h3>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <span className="text-gray-700">SQL injection</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-pink-400 rounded-sm"></div>
            <span className="text-gray-700">XSS malware</span>
          </div>
        </div>
      </div>

      {/* Radar Chart SVG */}
      <div className="flex justify-center">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Grid circles */}
          {gridLevels.map(level => (
            <circle
              key={level}
              cx={center.x}
              cy={center.y}
              r={(level / maxValue) * maxRadius}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
          ))}

          {/* Grid lines (radial) */}
          {horas.map((_, index) => {
            const angle = index * angleStep;
            const endPoint = polarToCartesian(angle, maxRadius);
            return (
              <line
                key={index}
                x1={center.x}
                y1={center.y}
                x2={endPoint.x}
                y2={endPoint.y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            );
          })}

          {/* SQL injection data */}
          {(() => {
            const sqlData = generatePath(valores['SQL injection']);
            return (
              <g>
                <path
                  d={sqlData.pathData}
                  fill="rgba(239, 68, 68, 0.2)"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                {sqlData.points.map((point, index) => (
                  <circle
                    key={`sql-${index}`}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#ef4444"
                  />
                ))}
              </g>
            );
          })()}

          {/* XSS malware data */}
          {(() => {
            const xssData = generatePath(valores['XSS malware']);
            return (
              <g>
                <path
                  d={xssData.pathData}
                  fill="rgba(244, 114, 182, 0.2)"
                  stroke="#f472b6"
                  strokeWidth="2"
                />
                {xssData.points.map((point, index) => (
                  <circle
                    key={`xss-${index}`}
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="#f472b6"
                  />
                ))}
              </g>
            );
          })()}

          {/* Hour labels */}
          {horas.map((hora, index) => {
            const angle = index * angleStep;
            const labelPoint = polarToCartesian(angle, maxRadius + 20);
            return (
              <text
                key={hora}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm fill-gray-600 font-medium"
              >
                {hora}
              </text>
            );
          })}

          {/* Value labels on grid circles */}
          {gridLevels.map(level => (
            <text
              key={level}
              x={center.x + 5}
              y={center.y - (level / maxValue) * maxRadius}
              className="text-xs fill-gray-400"
              dominantBaseline="middle"
            >
              {level}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default RadarChart;
