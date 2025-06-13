const RadarChart = ({ data }) => {
  const horas = data.horas;
  const valores = data.valores;

  const center = { x: 150, y: 150 };
  const maxRadius = 100;
  const maxValue = 10;

  const polarToCartesian = (angle, radius) => {
    const x = center.x + radius * Math.cos(((angle - 90) * Math.PI) / 180);
    const y = center.y + radius * Math.sin(((angle - 90) * Math.PI) / 180);
    return { x, y };
  };

  const generateHexagonPoints = radius => {
    const points = [];
    for (let i = 0; i < 6; i++) {
      const angle = i * 60;
      points.push(polarToCartesian(angle, radius));
    }
    return points;
  };

  const gridLevels = [2, 4, 6, 8, 10];
  const angleStep = 60;

  const generatePath = dataValues => {
    const points = dataValues.map((value, index) => {
      const angle = index * angleStep;
      const radius = (value / maxValue) * maxRadius;
      return polarToCartesian(angle, radius);
    });

    const pathData =
      points
        .map(
          (point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
        )
        .join(' ') + ' Z';

    return { pathData, points };
  };

  const generateHexagonPath = points => {
    return (
      points
        .map(
          (point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
        )
        .join(' ') + ' Z'
    );
  };

  return (
    <div className="max-w-md mx-auto bg-blue-300/20 backdrop-blur-xs rounded-2xl p-4 pb-0 border border-blue-300 relative overflow-hidden">
      <div className="mb-1">
        <h3 className="text-blue-900 text-lg font-medium mb-1">
          Total amenazas avanzadas
        </h3>
        <div className="flex space-x-4 text-sm">
          {Object.keys(valores).map(key => (
            <div
              key={key}
              className={`flex items-center rounded-md ${
                key === 'SQL injection' ? 'bg-none py-0' : 'bg-white/70 px-1'
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  key === 'SQL injection' ? 'text-red-400' : 'text-blue-900'
                }`}
              >
                {key}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <svg width="300" height="260" viewBox="0 0 300 300">
          {gridLevels.map(level => {
            const hexRadius = (level / maxValue) * maxRadius;
            const hexPoints = generateHexagonPoints(hexRadius);
            const hexPath = generateHexagonPath(hexPoints);

            return (
              <path
                key={level}
                d={hexPath}
                fill="none"
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.6"
              />
            );
          })}

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
                stroke="#ffffff"
                strokeWidth="1"
                opacity="0.6"
              />
            );
          })}

          {(() => {
            const xssData = generatePath(valores['XSS malware']);
            return (
              <g>
                <path
                  d={xssData.pathData}
                  fill="rgba(255, 255, 255, 0.45)"
                  strokeWidth="2"
                />
              </g>
            );
          })()}

          {(() => {
            const sqlData = generatePath(valores['SQL injection']);
            return (
              <g>
                <path
                  d={sqlData.pathData}
                  fill="transparent"
                  stroke="#ff6467"
                  strokeWidth="2"
                />
              </g>
            );
          })()}

          {horas.map((hora, index) => {
            const angle = index * angleStep;
            const labelPoint = polarToCartesian(angle, maxRadius + 15);
            return (
              <text
                key={hora}
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-blue-900 font-medium"
              >
                {hora}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default RadarChart;
