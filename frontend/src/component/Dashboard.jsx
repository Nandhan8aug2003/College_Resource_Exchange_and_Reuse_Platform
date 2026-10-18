import './Dashboard.css' 
function Dashboard() {
  return (
    <div className="dashboard">
      {/* Top bar */}
      <header className="top-bar">
        <h2>Resource Exchange</h2>

        <input
          type="search"
          placeholder="Search resources..."
        />

        <div className="profile">N</div>
      </header>

      {/* Left menu */}
      <div className="dashboard-layout">
        <aside className="sidebar">
          <button className="active">Dashboard</button>
          <button>Resources</button>
          <button>Requests</button>
        </aside>

        {/* Main content */}
        <main className="main-content">
          <h1>Discover resources</h1>
          <p>Find useful study materials shared by students.</p>
        </main>
      </div>
    </div>
  )
}

export default Dashboard