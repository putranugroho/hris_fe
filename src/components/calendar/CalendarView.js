"use client";

import { useEffect, useState, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const eventColors = {
  WFA: "#2563eb",
  LEAVE: "#16a34a",
  SICK: "#dc2626",
  PERMISSION: "#eab308",
  BUSINESS_TRIP: "#9333ea",
  HOLIDAY: "#6b7280",
  INTERNAL_EVENT: "#06b6d4",
};

export default function CalendarView({
  events,
  departments,
  initialType = "ALL",
  lockType = false,
  hideTypeFilter = false,
}) {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (selectedType !== "ALL" && event.event_type !== selectedType)
        return false;
      if (selectedDept !== "ALL" && event.department_id !== selectedDept)
        return false;
      return true;
    });
  }, [events, selectedType, selectedDept]);

  useEffect(() => {
    const mapped = filteredEvents.map((event) => ({
      id: event.id,
      title: event.user_name
        ? `${event.user_name} (${event.event_type})`
        : event.title,
      start: event.start_date,
      end: event.end_date,
      backgroundColor: eventColors[event.event_type] || "#000",
      borderColor: eventColors[event.event_type] || "#000",
      extendedProps: event,
    }));

    setCalendarEvents(mapped);
  }, [filteredEvents]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Sidebar */}
      <div style={{ width: "250px" }}>
        <h3>Filters</h3>

        {!hideTypeFilter && (
  <>
    <label>Event Type</label>
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      disabled={lockType}
    >
      <option value="ALL">All</option>
      {Object.keys(eventColors).map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>

    <br />
    <br />
  </>
)}

        <br />
        <br />

        <label>Department</label>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="ALL">All</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>

        <hr />

        <h4>Legend</h4>
        {Object.entries(eventColors).map(([type, color]) => (
          <div key={type} style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: color,
                marginRight: "8px",
              }}
            />
            {type}
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div style={{ flex: 1 }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height="auto"
          events={calendarEvents}
          eventClick={(info) => setSelectedEvent(info.event.extendedProps)}
        />
      </div>

      {/* Modal Detail */}
      {selectedEvent && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            zIndex: 1000,
            width: "400px",
          }}
        >
          <h3>{selectedEvent.title}</h3>
          <p><strong>Type:</strong> {selectedEvent.event_type}</p>
          <p><strong>User:</strong> {selectedEvent.user_name || "Company"}</p>
          <p><strong>Department:</strong> {selectedEvent.department_name || "-"}</p>
          <p><strong>Description:</strong> {selectedEvent.description}</p>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
