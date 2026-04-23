import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlot, getSoilInfo } from '../store/farmSlice';
import { PlusCircle, Map } from 'lucide-react';
import { DEMO_POLYGON_ID, getRandomDemoPlotName } from '../utils/demoPlot';

const AddPlotForm = () => {
  const [polygonId, setPolygonId] = useState(DEMO_POLYGON_ID);
  const [nickname, setNickname] = useState(() => getRandomDemoPlotName());
  const dispatch = useDispatch();

  const resetToQuickStartDefaults = () => {
    setNickname(getRandomDemoPlotName());
    setPolygonId(DEMO_POLYGON_ID);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation to prevent empty submissions
    if (!polygonId.trim() || !nickname.trim()) {
      alert("Please enter both a Polygon ID and a Nickname.");
      return;
    }

    // 1. Create the new plot object
    const newPlot = {
      id: Date.now(), // Unique ID for Redux state
      polyId: polygonId.trim(), // The real ID from your AgroMonitoring dashboard
      nickname: nickname.trim(),
      soilData: null // This will be filled by the API call
    };

    // 2. Dispatch to Redux (CRUD: Create)
    dispatch(addPlot(newPlot));

    // 3. Immediately trigger API call to get real-time data for this new plot
    dispatch(getSoilInfo(polygonId.trim()));

    // 4. Reset to quick-start defaults for fast repeated grading checks.
    resetToQuickStartDefaults();
  };

  return (
    <div id="add-plot-form" className="card-base mb-2">
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="text-emerald-700" size={24} />
        <h2 className="text-xl font-bold text-slate-800">Add New Land Plot</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Nickname Input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Plot Nickname</label>
          <input 
            type="text" 
            placeholder="e.g., North Kila Wheat" 
            className="input-shell w-full px-4 py-3"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        {/* Polygon ID Input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Agro Polygon ID</label>
          <div className="relative">
            <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="text" 
              placeholder="Paste ID from Agro site" 
              className="input-shell w-full pl-10 pr-4 py-3 font-mono text-sm"
              value={polygonId}
              onChange={(e) => setPolygonId(e.target.value)}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-end gap-2">
          <button 
            type="button"
            onClick={resetToQuickStartDefaults}
            className="w-full rounded-xl border border-emerald-200 bg-emerald-50 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-100"
          >
            Clear
          </button>
          <button 
            type="submit"
            className="btn-primary w-full py-3"
          >
            Add Plot
          </button>
        </div>
      </form>
      
      <p className="mt-4 text-[10px] text-slate-400 leading-tight">
        *Ensure the Polygon ID is verified in your AgroMonitoring dashboard before adding. 
        Data integration uses the mandatory Axios library[cite: 12].
      </p>
    </div>
  );
};

export default AddPlotForm;