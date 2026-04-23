import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSoilInfo, deletePlot, updatePlotName } from '../store/farmSlice';
import AddPlotForm from '../components/AddPlotForm';
import AgroChart from '../components/AgroChart'; 
import { RefreshCw, Thermometer, Droplets, Trash2, Search, Edit2, Check, X } from 'lucide-react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { plots, loading, error } = useSelector((state) => state.farm);
  
  // 1. All Local States (Search, CRUD Update, and Pagination)
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const plotsPerPage = 2; // Required for performance testing 

  // Feature: Real-time data refresh [cite: 54]
  const refreshData = () => {
    plots.forEach(plot => {
      dispatch(getSoilInfo(plot.polyId));
    });
  };

  useEffect(() => {
    refreshData();
  }, [dispatch]);

  // Advanced Feature: Search/Filter + Performance Optimization (useMemo) [cite: 52, 57]
  const filteredPlots = useMemo(() => {
    return plots.filter(plot => 
      plot.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plot.polyId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [plots, searchTerm]);

  // 2. Pagination Logic 
  const indexOfLastPlot = currentPage * plotsPerPage;
  const indexOfFirstPlot = indexOfLastPlot - plotsPerPage;
  const currentPlots = filteredPlots.slice(indexOfFirstPlot, indexOfLastPlot);
  const totalPages = Math.ceil(filteredPlots.length / plotsPerPage);

  // CRUD: Update Logic 
  const handleUpdate = (id) => {
    if (editName.trim()) {
      dispatch(updatePlotName({ id, newName: editName }));
      setEditingId(null);
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Agri-Monitor Hub</h1>
            <p className="text-slate-500 font-medium">Monitoring {plots.length} active land plots</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input Feature  */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search by name or ID..."
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on search
                }}
              />
            </div>
            <button 
              onClick={refreshData}
              className="p-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm"
              title="Refresh All Data"
            >
              <RefreshCw size={20} className={loading ? "animate-spin text-green-600" : "text-slate-600"} />
            </button>
          </div>
        </div>

        {/* CRUD: Create Form Component  */}
        <AddPlotForm />

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-2">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        {/* CRUD: Read (The Grid)  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {currentPlots.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 text-lg">No plots found. Add a new plot to begin monitoring.</p>
            </div>
          ) : (
            currentPlots.map((plot) => (
              <div key={plot.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col gap-6 hover:border-green-200 transition-colors">
                
                {/* Card Header (Update/Delete Logic)  */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {editingId === plot.id ? (
                      <div className="flex items-center gap-2">
                        <input 
                          className="border-b-2 border-green-500 outline-none font-bold text-xl px-1 w-full"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          autoFocus
                        />
                        <button onClick={() => handleUpdate(plot.id)} className="text-green-600 hover:scale-110 transition"><Check size={20}/></button>
                        <button onClick={() => setEditingId(null)} className="text-slate-400 hover:scale-110 transition"><X size={20}/></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <h3 className="text-xl font-bold text-slate-800">{plot.nickname}</h3>
                        <button 
                          onClick={() => { setEditingId(plot.id); setEditName(plot.nickname); }}
                          className="text-slate-300 opacity-0 group-hover:opacity-100 transition hover:text-green-600"
                          title="Edit Nickname"
                        >
                          <Edit2 size={16} />
                        </button>
                      </div>
                    )}
                    <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">Polygon ID: {plot.polyId}</p>
                  </div>
                  <button 
                    onClick={() => dispatch(deletePlot(plot.id))}
                    className="p-2 text-slate-300 hover:text-red-500 transition hover:bg-red-50 rounded-lg"
                    title="Delete Plot"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* API Data Grid (Data Integration) [cite: 19] */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                    <div className="flex items-center gap-2 text-orange-600 mb-2">
                      <Thermometer size={18} />
                      <span className="text-xs font-bold uppercase tracking-tight">Soil Temp</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900">
                      {plot.soilData ? `${(plot.soilData.t0 - 273.15).toFixed(1)}°C` : '--'}
                    </p>
                  </div>

                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                      <Droplets size={18} />
                      <span className="text-xs font-bold uppercase tracking-tight">Moisture</span>
                    </div>
                    <p className="text-3xl font-black text-slate-900">
                      {plot.soilData ? `${(plot.soilData.moisture * 100).toFixed(1)}%` : '--'}
                    </p>
                  </div>
                </div>

                {/* Dashboard Chart Component  */}
                <AgroChart />
              </div>
            ))
          )}
        </div>

        {/* 4. Pagination UI  */}
        {filteredPlots.length > plotsPerPage && (
          <div className="flex justify-center items-center gap-6 mt-12 pb-10">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition shadow-sm"
            >
              Prev
            </button>
            <span className="font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;