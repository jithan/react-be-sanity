import { Link } from "react-router-dom";
import { Home, Grid, PenTool, Folder, Upload, BarChart2, Clock, Settings } from "lucide-react";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-header">
        <div className="logo-box"></div>
        <h2>Untitled UI</h2>
      </div>

      {/* DASHBOARD */}
      <div className="sidebar-section">
        <p className="sidebar-heading">DASHBOARD</p>

        <Link to="#" className="sidebar-item">
          <Home size={18} />
          <span>Overview</span>
        </Link>

        <Link to="#" className="sidebar-item">
          <Grid size={18} />
          <span>Current projects</span>
        </Link>
      </div>

      {/* EDITOR */}
      <div className="sidebar-section">
        <p className="sidebar-heading">EDITOR</p>

        <Link to="#" className="sidebar-item">
          <PenTool size={18} />
          <span>Designer</span>
        </Link>

        <Link to="#" className="sidebar-item">
          <Folder size={18} />
          <span>Current projects</span>
        </Link>

        <Link to="#" className="sidebar-item">
          <Upload size={18} />
          <span>Upload new</span>
        </Link>
      </div>

      {/* REPORTS */}
      <div className="sidebar-section">
        <p className="sidebar-heading">REPORTS</p>

        <Link to="#" className="sidebar-item">
          <BarChart2 size={18} />
          <span>Overview</span>
        </Link>

        <Link to="#" className="sidebar-item">
          <Clock size={18} />
          <span>Scheduled reports</span>
        </Link>
      </div>

      {/* SETTINGS */}
      <div className="sidebar-footer">
        <Link to="#" className="sidebar-item settings">
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </div>

    </aside>
  );
}

export default Sidebar;