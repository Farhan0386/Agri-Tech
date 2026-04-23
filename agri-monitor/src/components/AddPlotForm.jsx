import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlot, getSoilInfo } from '../store/farmSlice';
import { PlusCircle, Map } from 'lucide-react';

const AddPlotForm = () => {
  const [polyId, setPolyId] = useState('');
  const [nickname, setNickname] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation to prevent empty submissions
    if (!polyId.trim() || !nickname.trim()) {
      alert("Please enter both a Polygon ID and a Nickname.");
      return;
    }

    // 1. Create the new plot object
    const newPlot = {
      id: Date.now(), // Unique ID for Redux state
      polyId: polyId.trim(), // The real ID from your AgroMonitoring dashboard
      nickname: nickname.trim(),
      soilData: null // This will be filled by the API call
    };

    // 2. Dispatch to Redux (CRUD: Create)
    dispatch(addPlot(newPlot));

    // 3. Immediately trigger API call to get real-time data for this new plot
    dispatch(getSoilInfo(polyId.trim()));

    // 4. Reset form fields
    setPolyId('');
    setNickname('');
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-10">
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="text-green-600" size={24} />
        <h2 className="text-xl font-bold text-slate-800">Add New Land Plot</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Nickname Input */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-400 uppercase ml-1">Plot Nickname</label>
          <input 
            type="text" 
            placeholder="e.g., North Kila Wheat" 
            className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-slate-700"
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
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all text-slate-700 font-mono text-sm"
              value={polyId}
              onChange={(e) => setPolyId(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-end">
          <button 
            type="submit"
            className="w-full bg-green-900 text-white font-bold py-3 px-6 rounded-2xl hover:bg-green-800 active:scale-95 transition-all shadow-lg shadow-green-900/20"
          >
            Register Plot
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