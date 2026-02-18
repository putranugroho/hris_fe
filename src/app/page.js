export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>Dashboard Overview</h1>
      <p style={{ color: "#64748b", marginBottom: "30px" }}>
        Real-time company workforce insights
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        <StatCard title="Total Employees" value="128" color="#2563eb" />
        <StatCard title="WFA Today" value="14" color="#16a34a" />
        <StatCard title="On Leave" value="6" color="#dc2626" />
        <StatCard title="Business Trip" value="4" color="#9333ea" />
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.04)",
        }}
      >
        <h3>HR Summary</h3>
        <p style={{ color: "#475569" }}>
          Workforce distribution and scheduling overview for March 2026.
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
        borderLeft: `5px solid ${color}`,
      }}
    >
      <p style={{ margin: 0, color: "#64748b" }}>{title}</p>
      <h2 style={{ marginTop: "10px" }}>{value}</h2>
    </div>
  );
}
