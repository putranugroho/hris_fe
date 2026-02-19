"use client";

import { useEffect, useMemo, useState } from "react";
import CalendarView from "../../components/calendar/CalendarView";
import { fetchCalendarEvents, fetchDepartments, generateWfaSchedule } from "../../lib/api";

// helper format YYYY-MM-DD
function toYMD(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// ISO week number
function getISOWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Monday of ISO week
function getMondayOfISOWeek(week, year) {
  const simple = new Date(Date.UTC(year, 0, 1 + (week - 1) * 7));
  const dow = simple.getUTCDay(); // 0..6
  const ISOweekStart = new Date(simple);
  const diff = (dow <= 4 ? 1 - dow : 8 - dow); // shift to Monday
  ISOweekStart.setUTCDate(simple.getUTCDate() + diff);
  return ISOweekStart;
}

export default function WFAPage() {
  const today = useMemo(() => new Date(), []);
  const [year, setYear] = useState(today.getFullYear());
  const [weekNumber, setWeekNumber] = useState(getISOWeek(today));

  const [events, setEvents] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const range = useMemo(() => {
    const monday = getMondayOfISOWeek(weekNumber, year);
    const friday = new Date(monday);
    friday.setUTCDate(friday.getUTCDate() + 4);

    // API kamu pakai date string tanpa timezone
    const start = toYMD(new Date(monday));
    const end = toYMD(new Date(friday));

    return { start, end };
  }, [weekNumber, year]);

  async function load() {
    try {
      setError("");
      setLoading(true);

      const [evRes, deptRes] = await Promise.all([
        fetchCalendarEvents(range.start, range.end),
        fetchDepartments(),
      ]);

      setEvents(evRes?.data || []);
      setDepartments(deptRes?.data || deptRes || []); // jaga-jaga bentuk response
    } catch (e) {
      setError(e.message || "Failed to load WFA");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range.start, range.end]);

  async function handleGenerate() {
    try {
      setError("");
      setGenerating(true);

      // Prototype: belum ada login/role.
      // Sementara generatedBy dummy. Nanti ganti dari user session.
      const generatedBy = "bec9e7cf-7781-42d8-88e8-8c9acb8d242e";

      await generateWfaSchedule({
        weekNumber: Number(weekNumber),
        year: Number(year),
        generatedBy,
      });

      // reload events supaya WFA terbaru muncul
      await load();
    } catch (e) {
      setError(e.message || "Failed to generate WFA");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16 }}>
        <div>
          <h1 style={{ margin: 0 }}>WFA Schedule</h1>
          <p style={{ marginTop: 6, color: "#64748b" }}>
            Menampilkan WFA (company calendar) untuk minggu terpilih.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div>
            <label style={{ fontSize: 12, color: "#64748b" }}>Year</label>
            <div>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e2e8f0", width: 110 }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 12, color: "#64748b" }}>Week</label>
            <div>
              <input
                type="number"
                value={weekNumber}
                onChange={(e) => setWeekNumber(Number(e.target.value))}
                min={1}
                max={53}
                style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #e2e8f0", width: 90 }}
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            style={{
              height: 40,
              padding: "0 14px",
              borderRadius: 10,
              border: "1px solid #1e293b",
              background: generating ? "#94a3b8" : "#0f172a",
              color: "#fff",
              cursor: generating ? "not-allowed" : "pointer",
            }}
          >
            {generating ? "Generating..." : "Generate WFA"}
          </button>
        </div>
      </div>

      <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: "#fff", border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", color: "#334155" }}>
          <strong>Range:</strong>
          <span>{range.start} → {range.end}</span>
          {loading && <span style={{ color: "#64748b" }}>Loading...</span>}
        </div>
        {error && (
          <div style={{ marginTop: 10, color: "#dc2626" }}>
            {error}
          </div>
        )}
      </div>

      <div style={{ marginTop: 18 }}>
        <CalendarView
          events={events}
          departments={departments}
          initialType="WFA"
          lockType={true}
          hideTypeFilter={true}
        />
      </div>
    </div>
  );
}