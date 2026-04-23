import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="card-base min-h-[480px] animate-pulse">
      <div className="h-7 w-2/3 rounded-lg bg-slate-200" />
      <div className="mt-2 h-3 w-1/2 rounded-md bg-slate-200" />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="h-24 rounded-2xl bg-slate-200" />
        <div className="h-24 rounded-2xl bg-slate-200" />
      </div>

      <div className="mt-6 h-64 rounded-2xl bg-slate-200" />
    </div>
  );
};

export default SkeletonCard;
