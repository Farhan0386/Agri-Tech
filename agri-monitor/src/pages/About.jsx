const About = () => (
  <div className="max-w-4xl mx-auto p-10 bg-white mt-10 rounded-3xl shadow-sm border border-slate-100">
    <h1 className="text-3xl font-bold text-green-900 mb-6">Project Documentation</h1>
    <section className="space-y-6 text-slate-700 leading-relaxed">
      <div>
        <h2 className="text-xl font-bold text-slate-900">1. Problem Statement</h2>
        <p>
          Small-scale farmers often lack access to affordable, real-time satellite data to monitor soil health. 
          This project, <strong>Agri-Monitor</strong>, provides a digital dashboard to track soil moisture and 
          vegetation indices (NDVI) for specific land plots (Kila/Gazz), enabling data-driven irrigation decisions.
        </p>
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900">2. Tech Stack</h2>
        <ul className="list-disc ml-5">
          <li><strong>Frontend:</strong> React (Vite) with Tailwind CSS [cite: 9, 13]</li>
          <li><strong>State:</strong> Redux Toolkit for CRUD operations [cite: 10]</li>
          <li><strong>API:</strong> Axios integration with AgroMonitoring [cite: 12]</li>
          <li><strong>Performance:</strong> Lazy loading and Component Memoization [cite: 14]</li>
        </ul>
      </div>
    </section>
  </div>
);

export default About;