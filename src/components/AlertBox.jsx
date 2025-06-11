const AlertBox = ({ data }) => {
  return (
    <div className="bg-blue-50 rounded-xl p-6 shadow-lg h-full relative overflow-hidden">
      {/* Red dot indicator */}
      <div className="absolute top-4 right-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      </div>

      <div className="flex items-center mb-4">
        <div className="bg-red-100 p-1 rounded-md mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <span className="text-red-500 font-medium text-sm">Nueva amenaza</span>
      </div>

      <div className="text-sm text-slate-500 mb-1">Tráfico malicioso detectado</div>
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Ataque bloqueado por Firewall</h3>

      {/* Gauge */}
      <div className="relative w-full h-32 mb-4">
        <svg viewBox="0 0 200 100" className="w-full">
          {/* Gauge background */}
          <path d="M20,90 A 80,80 0 0,1 180,90" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />

          {/* Gauge value - adjust the sweep to match the risk percentage */}
          <path
            d="M20,90 A 80,80 0 0,1 180,90"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${data.riesgo * 2.52} 252`}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* Needle */}
          <line
            x1="100"
            y1="90"
            x2={100 + 70 * Math.cos((data.riesgo / 100) * Math.PI - Math.PI / 2)}
            y2={90 + 70 * Math.sin((data.riesgo / 100) * Math.PI - Math.PI / 2)}
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Needle center */}
          <circle cx="100" cy="90" r="5" fill="#334155" />
        </svg>
      </div>

      {/* Source */}
      <div className="flex items-center text-xs text-slate-600">
        <span className="mr-1">by</span>
        <span className="font-medium">{data.fuente}</span>
      </div>
    </div>
  )
}

export default AlertBox
