export default function Header() {
  return (
    <div
      style={{
        height: "70px",
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 30px",
      }}
    >
      <h3 style={{ margin: 0 }}>Enterprise HR Dashboard</h3>

      <div
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          background: "#2563eb",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        HR
      </div>
    </div>
  );
}
