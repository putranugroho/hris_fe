"use client";

import { useEffect, useState } from "react";
import CalendarView from "../../components/calendar/CalendarView";
import { fetchCalendarEvents, fetchDepartments } from "../../lib/api";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const start = "2026-02-01";
      const end = "2026-03-31";

      const eventData = await fetchCalendarEvents(start, end);
      const deptData = await fetchDepartments();

      setEvents(eventData.data || []);
      setDepartments(deptData.data || []);
    };

    loadData();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Company HRIS Calendar</h1>
      <CalendarView events={events} departments={departments} />
    </div>
  );
}
