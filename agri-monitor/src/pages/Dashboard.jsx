import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSoilInfo, deletePlot, updatePlotName } from '../store/farmSlice';
import AddPlotForm from '../components/AddPlotForm';
import PlotCard from '../components/PlotCard';
import EmptyState from '../components/EmptyState';
import SkeletonCard from '../components/SkeletonCard';
import { RefreshCw, Search } from 'lucide-react';

const Dashboard = ({ initialSection = 'overview' }) => {
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

  useEffect(() => {
    const sectionEl = document.getElementById(initialSection);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [initialSection]);

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

  const showEmptyState = filteredPlots.length === 0 && !loading;

  return (
    <div className="dashboard-wrap">
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <section id="overview" className="dashboard-section">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Agricultural SaaS Dashboard</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Agri-Monitor Command Center</h1>
            <p className="text-slate-500">Monitoring {plots.length} active land plots</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search by name or ID..."
                className="input-shell w-full pl-10 pr-4 py-2.5"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on search
                }}
              />
            </div>
            <button 
              onClick={refreshData}
              className="icon-btn border border-slate-200 bg-white p-2.5"
              title="Refresh All Data"
            >
              <RefreshCw size={20} className={loading ? "animate-spin text-emerald-700" : "text-slate-600"} />
            </button>
          </div>
        </div>
        </section>

        <section id="plots" className="dashboard-section">
          <AddPlotForm />
        </section>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 flex items-center gap-2">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}

        <section id="analytics" className="dashboard-section">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {loading && currentPlots.length === 0 && (
              <>
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}

            {showEmptyState && (
              <EmptyState
                onAction={() => {
                  const formEl = document.getElementById('add-plot-form');
                  if (formEl) {
                    formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
              />
            )}

            {!loading &&
              currentPlots.map((plot) => (
                <PlotCard
                  key={plot.id}
                  plot={plot}
                  isEditing={editingId === plot.id}
                  editName={editName}
                  setEditName={setEditName}
                  onStartEdit={() => {
                    setEditingId(plot.id);
                    setEditName(plot.nickname);
                  }}
                  onCancelEdit={() => setEditingId(null)}
                  onSaveEdit={() => handleUpdate(plot.id)}
                  onDelete={() => dispatch(deletePlot(plot.id))}
                />
              ))}
          </div>
        </section>

        {filteredPlots.length > plotsPerPage && (
          <div className="flex justify-center items-center gap-6 mt-12 pb-10">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition shadow-sm"
            >
              Prev
            </button>
            <span className="font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-semibold text-slate-600 disabled:opacity-30 hover:bg-slate-50 transition shadow-sm"
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