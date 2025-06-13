import { AlertTriangle } from 'lucide-react';

const AlertBox = ({ data }) => {
  return (
    <div className="max-w-md mx-auto bg-blue-300/20 backdrop-blur-xs rounded-2xl p-4 shadow-[0_0_4px_rgba(239,68,68,0.5)] relative overflow-hidden">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2 bg-red-400 text-white px-5 py-1 rounded-full text-sm font-medium">
          <AlertTriangle size={14} />
          Nueva amenaza
        </div>
        <div>
          <p className="text-blue-900 text-xs font-medium">
            Tráfico malicioso externo intensivo.
          </p>
          <p className="text-red-400 text-xs">Riesgo 68/100</p>
        </div>
      </div>

      <div className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>

      <div className="flex items-center justify-between">
        <div className="w-1/2 bg-sky-100/60 px-5 py-3 rounded-xl" >
          <h4 className="text-base text-blue-900 mb-1">
            {data.mensaje}
          </h4>

          <div className="flex items-center gap-1">
            <img className='w-20 -ml-2' src={`/assets/${data.fuente}.png`} alt="Paloalto" />
          </div>
        </div>

        <div className="relative size-max">
          <div className="w-24 h-12 relative">
            <div className="absolute inset-0">
              <svg
                width="96"
                height="55"
                viewBox="0 0 96 48"
                className="transform"
              >
                <path
                  d="M 8 40 A 32 32 0 0 1 88 40"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 origin-bottom">
                <div
                  className="w-0.5 h-6 bg-gray-700 transform rotate-45 origin-bottom"
                  style={{ transformOrigin: 'bottom center' }}
                ></div>
                <div className="w-2 h-2 bg-gray-700 rounded-full absolute -bottom-1 left-1/2 transform -translate-x-1/2"></div>
              </div>

              <div className="absolute inset-0">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-2 bg-gray-400"
                    style={{
                      left: '50%',
                      top: '8px',
                      transformOrigin: '50% 32px',
                      transform: `translateX(-50%) rotate(${-90 + i * 22.5}deg)`
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
