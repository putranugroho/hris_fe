const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function fetchCalendarEvents(start, end) {
  const res = await fetch(`${API_BASE}/calendar?start=${start}&end=${end}`);
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function fetchDepartments() {
  const res = await fetch(`${API_BASE}/departments`);
  if (!res.ok) throw new Error("Failed to fetch departments");
  return res.json();
}

// ✅ NEW: generate WFA weekly
export async function generateWfaSchedule({ weekNumber, year, generatedBy }) {
  const res = await fetch(`${API_BASE}/wfa/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ weekNumber, year, generatedBy }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to generate WFA: ${text || res.statusText}`);
  }
  return res.json();
}