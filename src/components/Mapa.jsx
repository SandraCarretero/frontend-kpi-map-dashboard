const Mapa = ({ infraestructuras, filtrosActivos }) => {
  const mapBounds = {
    minLat: 23.0,
    maxLat: 26.5,
    minLng: -110.0,
    maxLng: -20.0
  };

  const getPositionFromCoords = (lat, lng) => {
    const x =
      ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y =
      100 -
      ((lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;

    return {
      x: `${x}%`,
      y: `${y}%`
    };
  };

  const getEstadoColor = id => {
    switch (id) {
      case 2:
        return '#ff6f6f';
      case 1:
        return '#e9f500';
      case 3:
        return '#95ffa6';
      default:
        return '#6b7280';
    }
  };

  const getInfraImage = id => {
    return `/assets/infra_${id}.png`;
  };

  return (
    <div className="h-[80%] absolute overflow-hidden bg-[url(/assets/map_vectors.svg)] bg-no-repeat 2xl:bg-size-[65.6%] lg:bg-size-[60%] w-[55dvw] 2xl:left-[25.5%] 2xl:top-[19%] lg:left-[29%] lg:top-[24%]">
      <div className="relative h-full w-full">
        {infraestructuras
          .filter(infra => filtrosActivos.includes(infra.id))
          .map(infra => {
            const position = getPositionFromCoords(infra.lat, infra.lng);
            const infraColor = getEstadoColor(infra.id);
            return (
              <div
                key={infra.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{
                  left: position.x,
                  top: position.y
                }}
              >
                <div className="relative">
                  <div className="absolute w-0.5 h-8 top-10 left-5 transform -translate-x-1/2 bg-white"></div>

                  <div className="absolute w-2 h-2 rounded-full top-18 left-5 transform -translate-x-1/2 bg-white"></div>
                </div>

                <div
                  className="bg-blue-100/40 backdrop-blur-sm rounded-lg px-2 py-2 shadow-sm min-w-[130px]"
                  style={{
                    border: `1.5px solid ${infraColor}`,
                    boxShadow: `0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06), 0 0 0 1px ${infraColor}40`,
                    backgroundImage: `linear-gradient(to top right, rgba(210, 216, 255, 0.5), ${infraColor}15)`
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">
                      <img
                        src={getInfraImage(infra.id) || '/placeholder.svg'}
                        alt={infra.nombre}
                        className="w-6 aspect-square object-contain"
                      />
                    </div>
                    <div>
                      <img src="./assets/logo.svg" alt="" className="w-4" />
                      <span className="text-blue-900 font-medium text-xs">
                        {infra.nombre}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Mapa;
