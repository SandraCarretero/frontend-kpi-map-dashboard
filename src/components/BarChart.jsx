const BarChart = ({ data }) => {
  const maxValue = Math.max(...data.conexiones);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg h-full">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Cyberark-PSM</h3>

      {/* Gráfico de barras */}
      <div className="flex items-end justify-between h-32 mb-6">
        {data.dias.map((dia, index) => (
          <div key={dia} className="flex flex-col items-center space-y-2">
            <div className="relative">
              <div
                className="w-8 bg-blue-500 rounded-t-sm transition-all duration-1000 ease-out"
                style={{
                  height: `${(data.conexiones[index] / maxValue) * 100}px`,
                  minHeight: '4px'
                }}
              ></div>
            </div>
            <span className="text-xs text-slate-600 font-medium">{dia}</span>
          </div>
        ))}
      </div>

      {/* Estadísticas */}
      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Conexiones</span>
          <span className="text-sm font-bold text-slate-800">
            {data.sesiones}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Exitosas/Completadas</span>
          <span className="text-sm font-bold text-green-600">032</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">No autorizadas</span>
          <span className="text-sm font-bold text-red-500">
            {data.noAutorizadas}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Legítimas + Temporales</span>
          <span className="text-sm font-bold text-slate-800">
            {data.temporalidades}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
