const LinesChart = ({ data }) => {
  return (
    <div className="max-w-md mx-auto bg-blue-300/20 backdrop-blur-xs rounded-2xl p-4 border border-blue-300 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-6">
        <div>
          <h3 className="text-blue-900 text-lg mb-1">
            Ciberamenazas{' '}
            <span className="text-green-600 underline decoration-2 underline-offset-2">internas</span>
            {' '}y{' '}
            <span className="text-blue-600 underline decoration-2 underline-offset-2">externas</span>
          </h3>
        </div>
        <div>
          <p className="text-blue-800 text-xs">Últimos {data.meses.length} meses</p>
        </div>
      </div>

      {/* Chart Container */}
      
    </div>
  );
}

export default LinesChart;
