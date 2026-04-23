import React from 'react';
import { Thermometer, Droplets, Trash2, Edit2, Check, X } from 'lucide-react';
import AgroChart from './AgroChart';
import StatCard from './StatCard';

const PlotCard = ({
  plot,
  isEditing,
  editName,
  setEditName,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}) => {
  const tempValue = plot.soilData ? `${(plot.soilData.t0 - 273.15).toFixed(1)}°C` : '--';
  const moistureValue = plot.soilData ? `${(plot.soilData.moisture * 100).toFixed(1)}%` : '--';

  return (
    <article className="card-base min-h-[480px]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                className="w-full rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-lg font-semibold text-slate-800 outline-none ring-emerald-500 focus:ring-2"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                autoFocus
              />
              <button type="button" onClick={onSaveEdit} className="icon-btn text-emerald-700">
                <Check size={18} />
              </button>
              <button type="button" onClick={onCancelEdit} className="icon-btn text-slate-500">
                <X size={18} />
              </button>
            </div>
          ) : (
            <div className="group flex items-center gap-2">
              <h3 className="text-xl font-semibold text-slate-800">{plot.nickname}</h3>
              <button type="button" onClick={onStartEdit} className="icon-btn text-slate-400 group-hover:text-emerald-700" title="Edit Nickname">
                <Edit2 size={16} />
              </button>
            </div>
          )}
          <p className="mt-1 text-xs font-mono uppercase tracking-wider text-slate-400">Polygon ID: {plot.polyId}</p>
        </div>
        <button type="button" onClick={onDelete} className="icon-btn text-slate-400 hover:text-amber-700" title="Delete Plot">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard icon={Thermometer} label="Soil Temperature" value={tempValue} tone="soil" />
        <StatCard icon={Droplets} label="Moisture" value={moistureValue} tone="success" />
      </div>

      <div className="mt-5 flex-1">
        <AgroChart />
      </div>
    </article>
  );
};

export default PlotCard;
