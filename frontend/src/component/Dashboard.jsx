import './Dashboard.css'

function Dashboard() {
  return (
    <div className="dashboard">
      {/* Header */}
      <header className="top-bar">
        <h2>Resource Exchange</h2>

        <input
          type="search"
          placeholder="Search resources..."
        />

        <div className="profile">N</div>
      </header>

      {/* Dashboard body */}
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <button className="active">Dashboard</button>
          <button>Resources</button>
          <button>Requests</button>
        </aside>

        {/* Scrollable main content */}
        <main className="main-content">
          {/* Add your dashboard content here */}
        </main>
      </div>
    </div>
  )
}

export default Dashboard