const LineChart = ({ data }) => {
  const chartData = data.meses.map((mes, index) => ({
    mes: mes,
    internas: data.internas[index],
    externas: data.externas[index]
  }));

  const generateLinePoints = (values, maxValue = 30) => {
    const width = 280;
    const height = 120;
    const padding = 40;
    const stepX = (width - padding * 2) / (values.length - 1);

    return values.map((value, index) => ({
      x: padding + index * stepX,
      y: height - (value / maxValue) * (height - 40) - 20
    }));
  };

  const internasPoints = generateLinePoints(data.internas);
  const externasPoints = generateLinePoints(data.externas);

  const generatePath = points => {
    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prevPoint = points[i - 1];
      const currentPoint = points[i];

      const controlPoint1X = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.3;
      const controlPoint1Y = prevPoint.y;
      const controlPoint2X =
        currentPoint.x - (currentPoint.x - prevPoint.x) * 0.3;
      const controlPoint2Y = currentPoint.y;

      path += ` C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${currentPoint.x} ${currentPoint.y}`;
    }

    return path;
  };

  return (
    <div className="max-w-md mx-auto bg-blue-300/20 backdrop-blur-xs rounded-2xl p-4 border border-blue-300 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-9">
        <div>
          <h3 className="text-blue-900 text-lg font-medium">
            Ciberamenazas{' '}
            <span className="border-b-3 border-b-emerald-300">
              internas
            </span>{' '}
            y{' '}
            <span className="border-b-3 border-b-sky-500">
              externas
            </span>
          </h3>
        </div>
        <div>
          <p className="text-blue-900 text-xs bg-blue-50 p-1 rounded">
            Últimos {data.meses.length} meses
          </p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-40 mb-4">
        <svg width="100%" height="100%" viewBox="0 0 320 160">
          {/* Grid lines */}
          {[8, 12, 16, 20, 24].map(value => (
            <g key={value}>
              <line
                x1="40"
                y1={140 - ((value - 8) / 16) * 100}
                x2="280"
                y2={140 - ((value - 8) / 16) * 100}
                stroke="#e2e8f0"
                strokeWidth="1"
                opacity="0.3"
              />
              <text
                x="30"
                y={145 - ((value - 8) / 16) * 100}
                textAnchor="end"
                className="text-xs fill-blue-900"
                dominantBaseline="middle"
              >
                {value}
              </text>
            </g>
          ))}

          {/* Background bars */}
          {chartData.map((item, index) => {
            const barWidth = 35;
            const barSpacing = 80;
            const x = 40 + index * barSpacing;
            const barHeight = 100;
            const y = 40;

            return (
              <g key={`bar-${item.mes}`}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="#3478d0"
                  opacity="0.3"
                  rx="2"
                />
                <text
                  x={x + barWidth / 2}
                  y="155"
                  textAnchor="middle"
                  className="text-xs fill-blue-900 font-medium"
                >
                  {item.mes}
                </text>
              </g>
            );
          })}

          {/* Línea externa (azul) */}
          <path
            d={generatePath(externasPoints)}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Puntos línea externa */}
          {externasPoints.map((point, index) => (
            <circle
              key={`externa-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#3b82f6"
            />
          ))}

          {/* Línea interna (teal) */}
          <path
            d={generatePath(internasPoints)}
            fill="none"
            stroke="#14b8a6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Puntos línea interna */}
          {internasPoints.map((point, index) => (
            <circle
              key={`interna-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#14b8a6"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default LineChart;
