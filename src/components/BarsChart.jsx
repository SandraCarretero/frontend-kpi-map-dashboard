import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Maximize2 } from 'lucide-react';

const BarsChart = ({ data }) => {
  const cyberark = data?.cyberark || {
    dias: ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'],
    conexiones: [3, 5, 8, 12, 10, 6, 2],
    sesiones: 133,
    noAutorizadas: 26,
    temporalidades: '127/143'
  };

  // Transformar los datos para el gráfico
  const chartData = cyberark.dias.map((dia, index) => ({
    dia: dia,
    conexiones: cyberark.conexiones[index]
  }));

  return (
    <div className="max-w-md mx-auto bg-blue-300/20 backdrop-blur-xs rounded-2xl p-4 border border-blue-300 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 font-semibold text-lg">Cyberark-PSM</h3>
        <Maximize2
          size={16}
          className="text-gray-500 cursor-pointer hover:text-gray-700"
        />
      </div>

      {/* Chart Container */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
            barCategoryGap="20%"
          >
            <XAxis
              dataKey="dia"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              domain={[0, 'dataMax + 2']}
              ticks={[0, 2, 4, 6, 8, 10, 12, 14]}
            />
            <Bar
              dataKey="conexiones"
              fill="#60a5fa"
              radius={[4, 4, 0, 0]}
              stroke="#3b82f6"
              strokeWidth={1}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Statistics */}
      <div className="space-y-3">
        {/* Conexiones */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span className="text-gray-700 text-sm font-medium">
              Conexiones
            </span>
          </div>
          <span className="text-gray-700 text-sm font-medium">
            Realizadas (sesiones PSM) {cyberark.sesiones}
          </span>
        </div>

        {/* No Autorizadas */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-400 rounded-sm"></div>
            <span className="text-gray-700 text-sm">No Autorizadas</span>
          </div>
          <span className="text-gray-700 text-sm font-medium">
            {cyberark.noAutorizadas}
          </span>
        </div>

        {/* Temporalidades */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-gray-700 text-sm">
              Legítimas / Temporales
            </span>
          </div>
          <span className="text-gray-700 text-sm font-medium">
            {cyberark.temporalidades}
          </span>
        </div>
      </div>
    </div>
  );
};
export default BarsChart;
