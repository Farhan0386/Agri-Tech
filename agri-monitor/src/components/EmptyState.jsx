import React from 'react';
import { Sprout } from 'lucide-react';

const EmptyState = ({ onAction }) => {
  return (
    <div className="card-base col-span-full flex min-h-[360px] flex-col items-center justify-center border-2 border-dashed border-emerald-200 text-center">
      <div className="mb-4 rounded-2xl bg-emerald-100 p-4 text-emerald-700">
        <Sprout size={28} />
      </div>
      <h3 className="text-xl font-semibold text-slate-800">No plots added yet</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        Register your first land plot to start receiving live soil and vegetation analytics.
      </p>
      <button type="button" onClick={onAction} className="btn-primary mt-6">
        Add Your First Plot
      </button>
    </div>
  );
};

export default EmptyState;
