import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Lazy loading for performance [cite: 14, 21]
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <nav className="p-4 bg-green-800 text-white flex gap-4">
          <Link to="/" className="font-bold">Agri-Monitor</Link>
        </nav>
        
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;