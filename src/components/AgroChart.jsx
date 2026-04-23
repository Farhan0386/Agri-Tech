import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample historical data - in a real app, this comes from the /ndvi/history endpoint
const data = [
  { month: 'Jan', ndvi: 0.4 },
  { month: 'Feb', ndvi: 0.45 },
  { month: 'Mar', ndvi: 0.6 },
  { month: 'Apr', ndvi: 0.75 }, // Higher means healthier crops
];

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="rounded-xl border-none bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-emerald-800">NDVI: {payload[0].value}</p>
    </div>
  );
};

const AgroChart = () => {
  return (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 text-base font-semibold text-slate-800">Vegetation Index (NDVI) Trend</h3>
      <div className="h-56 w-full sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#047857" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#047857" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone" 
              dataKey="ndvi" 
              stroke="#047857"
              fill="url(#ndviGradient)"
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: '#047857', stroke: '#ffffff', strokeWidth: 2 }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-xs italic text-slate-500">
        *NDVI values above 0.6 indicate high density of green leaves (Healthy Crops).
      </p>
    </div>
  );
};

export default AgroChart;