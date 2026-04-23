const About = () => (
  <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
      {/* SOP [cite: 17, 24]: Present the documentation page as a formal project report. */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Project Report</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Agri-Monitor Documentation</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Agri-Monitor is an agricultural decision-support dashboard that transforms plot-level soil and vegetation data into actionable farm insights.
        </p>
      </div>

      <section className="space-y-8 text-slate-700">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Problem Definition</h2>
          <p className="mt-3 leading-7">
            Small and medium-scale farmers often rely on delayed field observations instead of near real-time soil intelligence. This project addresses that gap by centralizing plot monitoring, soil moisture visibility, and NDVI trend tracking into a responsive web dashboard so irrigation and crop-health decisions are faster and more evidence-based.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">Tech Stack</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="font-semibold text-emerald-900">Frontend</p>
              <p className="mt-1 text-sm text-slate-600">React with Vite, Tailwind CSS, and React Router for page-level navigation.</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <p className="font-semibold text-amber-800">State Management</p>
              <p className="mt-1 text-sm text-slate-600">Redux Toolkit manages all CRUD operations and plot state transitions.</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="font-semibold text-emerald-900">API Layer</p>
              <p className="mt-1 text-sm text-slate-600">Axios powers AgroMonitoring requests through a shared service with error handling.</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
              <p className="font-semibold text-amber-800">UI Delivery</p>
              <p className="mt-1 text-sm text-slate-600">Recharts renders the NDVI trend, and lazy loading improves initial page performance.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default About;