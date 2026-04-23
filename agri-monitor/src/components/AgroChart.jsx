import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample historical data - in a real app, this comes from the /ndvi/history endpoint
const data = [
  { month: 'Jan', ndvi: 0.4 },
  { month: 'Feb', ndvi: 0.45 },
  { month: 'Mar', ndvi: 0.6 },
  { month: 'Apr', ndvi: 0.75 }, // Higher means healthier crops
];

const AgroChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 mt-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Vegetation Index (NDVI) Trend</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="ndvi" 
              stroke="#15803d" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#15803d' }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-slate-500 mt-4 italic">
        *NDVI values above 0.6 indicate high density of green leaves (Healthy Crops).
      </p>
    </div>
  );
};

export default AgroChart;