import data from './data/dashboardData.json';
import RadarChart from './components/RadarChart';
import Mapa from './components/Mapa';
import AlertBox from './components/AlertBox';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import './index.css';
import { useState } from 'react';

const App = () => {
  const [filtrosActivos, setFiltrosActivos] = useState([1, 2, 3]);

  console.log(data);

  const toggleFiltro = id => {
    setFiltrosActivos(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const getInfraImage = id => {
    return `/assets/infra_${id}_xs.png`;
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-red-500">Error al cargar los datos</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen 2xl:px-[150px] 2xl:py-[50px] px-[40px] py-[30px] max-h-dvh relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100"></div>
      <div className="absolute inset-0 bg-[url(./assets/map_back.svg)] bg-no-repeat 2xl:bg-size-[85%] opacity-70 2xl:bg-top-left bg-bottom-left bg-size-[85%]"></div>
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img
              src="/assets/logo.svg"
              alt="Logo"
              className="2xl:w-16 w-12 aspect-square"
            />
          </div>
        </div>

        <div className="flex flex-col items-center space-x-4 gap-2">
          <span className="2xl:text-lg text-sm text-blue-900 font-medium mx-auto">
            Filtrar infraestructuras
          </span>
          <div className="flex items-center space-x-6">
            {[1, 2, 3].map(num => {
              const activo = filtrosActivos.includes(num);
              return (
                <button
                  key={num}
                  onClick={() => toggleFiltro(num)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                      activo ? 'border-blue-900' : 'border-blue-300'
                    }`}
                  >
                    {activo && (
                      <span className="w-2 h-2 bg-blue-900 rounded-full" />
                    )}
                  </span>

                  <span className="2xl:text-sm text-xs font-medium transition-colors duration-200 text-blue-900">
                    Infra {num}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="2xl:text-2xl text-base font-light text-blue-900">
            {data.horaActual}
          </span>
          <div className="flex w-8 aspect-square bg-white/60 p-2 rounded-full cursor-pointer">
            <img src="/assets/menu.svg" alt="Menu" className="w-5 h-auto" />
          </div>
        </div>
      </div>

      <div className="flex justify-between 2xl:mt-10 items-start">
        <div className='flex flex-col gap-10 z-10 origin-top-left 2xl:scale-100 scale-[0.62]'>
          <div>
            <RadarChart data={data.amenazasAvanzadas} />
          </div>
          <div>
            <BarChart data={data.cyberark} />
          </div>
        </div>
        <div>
          <Mapa
            infraestructuras={data.infraestructuras}
            filtrosActivos={filtrosActivos}
          />
        </div>
        <div className='flex flex-col gap-10 z-10 origin-top-right 2xl:scale-100 scale-[0.7]'>
          <div>
            <AlertBox data={data.traficoBloqueado} />
          </div>

          <div>
            <LineChart data={data.ciberamenazas} />
          </div>
        </div>

        <div className="flex absolute bottom-10 right-30 z-20 gap-2">
          <div className="text-xs text-blue-900 font-bold mb-1">Leyenda</div>
          <div className="flex flex-col gap-1 border-l-1 border-l-blue-900 px-2">
            <div className="flex flex-col items-center gap-2 flex-wrap">
              {data.infraestructuras.map((infra, index) => (
                <div
                  key={infra.id || index}
                  className="flex items-center gap-1"
                >
                  <img
                    src={getInfraImage(infra.id) || '/placeholder.svg'}
                    alt={infra.nombre}
                    className="w-3 aspect-square object-contain"
                  />
                  <span className="text-xs text-blue-900">{infra.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
