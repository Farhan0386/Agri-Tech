import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePlot } from '../store/farmSlice';
import { Trash2, MapPin } from 'lucide-react';

const PlotList = () => {
  const plots = useSelector((state) => state.farm.plots);
  const dispatch = useDispatch();

  return (
    <div className="grid gap-4">
      {plots.length === 0 ? (
        <p className="text-slate-400 italic">No plots added yet. Use the form above.</p>
      ) : (
        plots.map((plot) => (
          <div key={plot.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-700 rounded-full">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{plot.nickname}</h3>
                <p className="text-xs font-mono text-slate-500">{plot.polyId}</p>
              </div>
            </div>
            <button 
              onClick={() => dispatch(deletePlot(plot.id))}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
              title="Delete Plot"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default PlotList;