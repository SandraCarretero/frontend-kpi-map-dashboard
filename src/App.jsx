import { useEffect, useState } from 'react';
import dashboardData from './data/dashboardData.json';
import RadarChart from './components/RadarChart';
import Mapa from './components/Mapa';
import AlertBox from './components/AlertBox';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import logoSvg from './assets/logo.svg';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {/* Logo y filtros */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img
              src={logoSvg || '/placeholder.svg'}
              alt="Logo"
              className="w-10 h-10"
            />
          </div>

          {/* Filtros de infraestructura */}
          <div className="flex items-center space-x-4">
            <div className="w-5 h-5 text-slate-600" />
            <span className="text-sm text-slate-700 font-medium">
              Filtrar infraestructuras
            </span>
            <div className="flex space-x-2">
              {[1, 2, 3].map(num => (
                <button
                  key={num}
                  className={`w-8 h-8 rounded-full text-sm font-bold border-2 transition-all duration-200 ${
                    filtrosActivos.includes(num)
                      ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                  }`}
                  onClick={() => toggleFiltro(num)}
                >
                  {num}
                </button>
              ))}
            </div>
            <span className="text-sm text-slate-500">Infra 3</span>
          </div>
        </div>

        {/* Hora y menú */}
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-slate-800">
            {data.horaActual}
          </span>
          <div className="w-6 h-6 text-slate-600 cursor-pointer hover:text-slate-800" />
        </div>
      </div>

      {/* Grid principal del dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
        {/* Radar de amenazas - Columna 1 */}
        <div className="lg:col-span-1">
          <RadarChart data={data.amenazasAvanzadas} />
        </div>

        {/* Mapa central - Columna 2-3 */}
        <div className="lg:col-span-2">
          <Mapa
            infraestructuras={data.infraestructuras}
            filtrosActivos={filtrosActivos}
          />
        </div>

        {/* Panel de alerta - Columna 4 */}
        <div className="lg:col-span-1">
          <AlertBox data={data.traficoBloqueado} />
        </div>

        {/* Gráfico de barras - Columnas 1-2 */}
        <div className="lg:col-span-2">
          <BarChart data={data.cyberark} />
        </div>

        {/* Gráfico de líneas - Columnas 3-4 */}
        <div className="lg:col-span-2">
          <LineChart data={data.ciberamenazas} />
        </div>
      </div>

      {/* Leyenda inferior */}
      <div className="mt-6 flex justify-center">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 shadow-lg">
          <div className="flex items-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
              <span className="text-slate-700 font-medium">Infra 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-slate-700 font-medium">Infra 2</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-indigo-600"></div>
              <span className="text-slate-700 font-medium">Infra 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
