import { useEffect, useState } from 'react';
import dashboardData from './data/dashboardData.json';
import RadarChart from './components/RadarChart';
import Mapa from './components/Mapa';
import AlertBox from './components/AlertBox';
import BarsChart from './components/BarsChart';
import LinesChart from './components/LinesChart';
import './index.css';

const App = () => {
  const [data, setData] = useState(null);
  const [filtrosActivos, setFiltrosActivos] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(true);

  // Simular carga de datos desde JSON
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simular delay de carga
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(dashboardData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleFiltro = id => {
    setFiltrosActivos(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-red-500">Error al cargar los datos</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-[100px] py-[50px] bg-[url(./assets/map_back.svg)] bg-no-repeat bg-size-[90%] max-h-dvh">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Logo y filtros */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img
              src='/assets/logo.svg'
              alt="Logo"
              className="w-16 aspect-square"
            />
          </div>
        </div>

        {/* Filtros de infraestructura */}
        <div className="flex flex-col items-center space-x-4 gap-2">
          <span className="text-sm text-slate-700 font-medium mx-auto">
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
                  {/* Círculo exterior */}
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors duration-200
            ${activo ? 'border-blue-900' : 'border-blue-300'}
          `}
                  >
                    {/* Círculo interior si está activo */}
                    {activo && (
                      <span className="w-2 h-2 bg-blue-900 rounded-full" />
                    )}
                  </span>

                  {/* Texto al lado */}
                  <span className="text-sm font-medium transition-colors duration-200 text-blue-900">
                    Infra {num}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Hora y menú */}
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-light text-slate-800">
            {data.horaActual}
          </span>
          <div className="flex w-6 h-6 text-slate-600 cursor-pointer hover:text-slate-800">
            <img
              src='/assets/menu.svg'
              alt="Menu"
              className="w-5 h-auto"
            />
          </div>
        </div>
      </div>

      {/* Grid principal del dashboard */}
      <div className="flex justify-between">
        {/* Radar de amenazas - Columna 1 */}
        <div className="flex-col">
          <div className="lg:col-span-1">
            <RadarChart data={data.amenazasAvanzadas} />
          </div>
          <div>
            <BarsChart data={data.cyberark} />
          </div>
        </div>
        {/* <div>
          <Mapa
            infraestructuras={data.infraestructuras}
            filtrosActivos={filtrosActivos}
          />
        </div> */}
        <div className="flex-col">
          {/* Panel de alerta - Columna 4 */}
          <div>
            <AlertBox data={data.traficoBloqueado} />
          </div>

          {/* Gráfico de líneas - Columnas 3-4 */}
          <div>
            <LinesChart data={data.ciberamenazas} />
          </div>
        </div>
      </div>

      {/* Leyenda inferior */}
    </div>
  );
};

export default App;
