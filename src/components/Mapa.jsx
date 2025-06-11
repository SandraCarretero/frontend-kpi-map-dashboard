const Mapa = ({ infraestructuras, filtrosActivos }) => {
  const getEstadoColor = estado => {
    switch (estado) {
      case 'normal':
        return 'bg-green-500';
      case 'alerta':
        return 'bg-yellow-500';
      case 'riesgo':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-blue-50 rounded-xl p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">
        Mapa de Infraestructuras
      </h3>
      <div className="relative bg-slate-100 rounded-lg h-full min-h-[300px] overflow-hidden">
        {/* Mapa simplificado */}
        <div className="absolute inset-0 bg-blue-100/50">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-blue-200/30"></div>
            ))}
          </div>

          {/* Continentes simplificados */}
          <div className="absolute top-[20%] left-[10%] w-[25%] h-[40%] bg-blue-200/30 rounded-full"></div>
          <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] bg-blue-200/30 rounded-full"></div>
          <div className="absolute top-[15%] right-[15%] w-[20%] h-[25%] bg-blue-200/30 rounded-full"></div>
        </div>

        {/* Infraestructuras */}
        {infraestructuras
          .filter(infra => filtrosActivos.includes(infra.id))
          .map(infra => (
            <div
              key={infra.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${((infra.lng + 104.5) / 2) * 100}%`,
                top: `${((26 - infra.lat) / 2) * 100}%`
              }}
            >
              <div
                className={`w-4 h-4 rounded-full ${getEstadoColor(
                  infra.estado
                )} shadow-lg animate-pulse`}
              ></div>
              <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-black/75 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {infra.nombre}
              </div>
            </div>
          ))}

        {/* Conexiones entre infraestructuras */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {infraestructuras
            .filter(infra => filtrosActivos.includes(infra.id))
            .map((infra, i, arr) => {
              if (i === arr.length - 1) return null;
              const nextInfra = arr[i + 1];
              const x1 = ((infra.lng + 104.5) / 2) * 100;
              const y1 = ((26 - infra.lat) / 2) * 100;
              const x2 = ((nextInfra.lng + 104.5) / 2) * 100;
              const y2 = ((26 - nextInfra.lat) / 2) * 100;

              return (
                <line
                  key={`line-${i}`}
                  x1={`${x1}%`}
                  y1={`${y1}%`}
                  x2={`${x2}%`}
                  y2={`${y2}%`}
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />
              );
            })}
        </svg>
      </div>
    </div>
  );
};

export default Mapa;
