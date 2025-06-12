import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';

const LinesChart = ({ data }) => {
const ciberamenazas = data?.ciberamenazas || {
    meses: ["ENE", "FEB", "MAR"],
    internas: [14, 20, 18],
    externas: [22, 18, 25]
  };
  
  // Transformar los datos para el gráfico
  const chartData = ciberamenazas.meses.map((mes, index) => ({
    mes: mes,
    internas: ciberamenazas.internas[index],
    externas: ciberamenazas.externas[index],
    // Generar barras de fondo basadas en el promedio
    barras: Math.floor((ciberamenazas.internas[index] + ciberamenazas.externas[index]) / 2)
  }));

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 shadow-lg max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-gray-800 font-semibold text-lg mb-1">
            Ciberamenazas{' '}
            <span className="text-green-600 underline decoration-2 underline-offset-2">internas</span>
            {' '}y{' '}
            <span className="text-blue-600 underline decoration-2 underline-offset-2">externas</span>
          </h3>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Últimos {ciberamenazas.meses.length} meses</p>
        </div>
      </div>

      {/* Chart Container */}
      <div className="relative h-40 mb-4">
        {/* Background bars */}
        <div className="absolute inset-0 z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <Bar 
                dataKey="barras" 
                fill="#e0e7ff" 
                radius={[2, 2, 0, 0]}
                opacity={0.4}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Line charts overlay */}
        <div className="absolute inset-0 z-20">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis 
                dataKey="mes" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                dy={10}
              />
              <YAxis hide />
              
              {/* Línea verde - internas */}
              <Line
                type="cardinal"
                dataKey="internas"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#10b981' }}
              />
              
              {/* Línea azul - externas */}
              <Line
                type="cardinal"
                dataKey="externas"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-6">
          <span>24</span>
          <span>20</span>
          <span>16</span>
          <span>12</span>
          <span>8</span>
        </div>
      </div>

      {/* Legend dots (decorative) */}
      <div className="flex justify-center space-x-1 mt-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full ${
              i < 3 ? 'bg-green-400' : i < 6 ? 'bg-blue-400' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default LinesChart;
