import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy loading for performance [cite: 14, 21]
const Dashboard = lazy(() => import('./pages/Dashboard'));
const About = lazy(() => import('./pages/About'));

const RouteShell = () => {
  const location = useLocation();

  return (
    <Layout>
      <ErrorBoundary key={location.pathname}>
        <Suspense
          fallback={
            <div className="flex min-h-full items-center justify-center py-24">
              <div className="rounded-2xl border border-emerald-100 bg-white px-6 py-4 text-sm font-medium text-emerald-900 shadow-sm">
                Loading dashboard...
              </div>
            </div>
          }
        >
          <Routes>
            {/* SOP [cite: 12]: React Router manages navigation, including the About documentation page. */}
            <Route path="/" element={<Dashboard initialSection="overview" />} />
            <Route path="/plots" element={<Dashboard initialSection="plots" />} />
            <Route path="/analytics" element={<Dashboard initialSection="analytics" />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Layout>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <RouteShell />
      </Router>
    </Provider>
  );
}

export default App;