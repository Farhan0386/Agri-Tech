import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, LandPlot, ChartArea, UserCircle2, FileText } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/plots', label: 'Plots', icon: LandPlot },
  { to: '/analytics', label: 'Analytics', icon: ChartArea },
  { to: '/about', label: 'About', icon: FileText },
];

const Layout = ({ children }) => {
  return (
    <div className="app-shell">
      <aside className="sidebar-panel">
        <div>
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/80">Agri Monitor</p>
            <h1 className="text-2xl font-semibold text-white">Field Command</h1>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-idle'}`
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="rounded-2xl border border-emerald-800 bg-emerald-950/60 p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-emerald-300/80">User Profile</p>
          <div className="flex items-center gap-3">
            <UserCircle2 className="text-emerald-300" size={34} />
            <div>
              <p className="text-sm font-semibold text-white">Farm Ops Admin</p>
              <p className="text-xs text-emerald-300">Agri Team</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
