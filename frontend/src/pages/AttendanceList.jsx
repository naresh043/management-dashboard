import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import API_BASE_URL from "../config";

export default function AttendanceList() {
  const [attendance, setAttendance] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [viewType, setViewType] = useState("month"); 
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [tableData, setTableData] = useState([]);

  const months = [
    { label: "January", value: 0 }, { label: "February", value: 1 }, { label: "March", value: 2 },
    { label: "April", value: 3 }, { label: "May", value: 4 }, { label: "June", value: 5 },
    { label: "July", value: 6 }, { label: "August", value: 7 }, { label: "September", value: 8 },
    { label: "October", value: 9 }, { label: "November", value: 10 }, { label: "December", value: 11 }
  ];

  const weeks = [
    { label: "Week 1", value: 1 },
    { label: "Week 2", value: 2 },
    { label: "Week 3", value: 3 },
    { label: "Week 4", value: 4 },
    { label: "Week 5", value: 5 }
  ];

  // ---------------------------------------------------
  // FETCH DATA
  // ---------------------------------------------------
  useEffect(() => {
    fetch(`${API_BASE_URL}/users`)
      .then((r) => r.json())
      .then(setUsers);

    fetch(`${API_BASE_URL}/attendance`)
      .then((r) => r.json())
      .then(setAttendance);
  }, []);

  // ---------------------------------------------------
  // AUTO BUILD TABLE
  // ---------------------------------------------------
  useEffect(() => {
    if (!users.length || !attendance.length) return;

    if (viewType === "month") buildMonthView();
    else if (viewType === "week" && selectedWeek) buildWeekView();

  }, [viewType, selectedMonth, selectedWeek, users, attendance]);

  // Helper to build date string
  const buildDate = (month, day) =>
    `2025-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  // ---------------------------------------------------
  // MONTH VIEW BUILDER
  // ---------------------------------------------------
  const buildMonthView = () => {
    const totalDays = new Date(2025, selectedMonth + 1, 0).getDate();
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);

    const formatted = users.map((user) => {
      const row = { name: `${user.firstName} ${user.lastName}` };

      days.forEach((day) => {
        const date = buildDate(selectedMonth, day);
        const record = attendance.find(a => a.userId === user.id && a.date === date);
        row[day] = record ? (record.status === "Present" ? "P" : "A") : "-";
      });

      return row;
    });

    setTableData(formatted);
  };

  // ---------------------------------------------------
  // WEEK VIEW BUILDER (Mon–Sun)
  // ---------------------------------------------------
  const buildWeekView = () => {
    const weekStart = (selectedWeek - 1) * 7 + 1;
    const maxDay = new Date(2025, selectedMonth + 1, 0).getDate();

    const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const weekMap = dayLabels.map((dayName, index) => {
      const actualDay = weekStart + index;

      return {
        label: actualDay <= maxDay ? `${dayName} ${actualDay}` : `${dayName}`,
        date: actualDay <= maxDay ? buildDate(selectedMonth, actualDay) : null
      };
    });

    const formatted = users.map((user) => {
      const row = { name: `${user.firstName} ${user.lastName}` };

      weekMap.forEach((day) => {
        if (!day.date) {
          row[day.label] = "-";
        } else {
          const record = attendance.find(a => a.userId === user.id && a.date === day.date);
          row[day.label] = record ? (record.status === "Present" ? "P" : "A") : "-";
        }
      });

      return row;
    });

    setTableData(formatted);
  };

  // ---------------------------------------------------
  // STATUS BADGE RENDERER (P / A / -)
  // ---------------------------------------------------
  const statusTemplate = (value) => {
    if (value === "P") {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold border border-green-300">
          Present
        </span>
      );
    }
    if (value === "A") {
      return (
        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-semibold border border-red-300">
          Absent
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-500 font-semibold border border-gray-300">
        -
      </span>
    );
  };

  // ---------------------------------------------------
  // UI
  // ---------------------------------------------------
  return (
    <div className="flex justify-center mt-10 px-6">
      <Card className="w-full max-w-6xl p-7 shadow-xl border border-gray-200 rounded-2xl">

        {/* Header */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Attendance Dashboard</h2>

        {/* Toggle buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setViewType("month")}
            className={`px-5 py-2 rounded-lg border font-medium transition ${
              viewType === "month"
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Month View
          </button>

          <button
            onClick={() => setViewType("week")}
            className={`px-5 py-2 rounded-lg border font-medium transition ${
              viewType === "week"
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Week View
          </button>
        </div>

        {/* Month Selector */}
        <label className="text-gray-700 font-medium">Select Month</label>
        <Dropdown
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.value)}
          options={months}
          className="w-full mb-6 mt-1"
        />

        {/* Week Selector */}
        {viewType === "week" && (
          <>
            <label className="text-gray-700 font-medium">Select Week</label>
            <Dropdown
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.value)}
              options={weeks}
              placeholder="Choose Week"
              className="w-full mb-6 mt-1"
            />
          </>
        )}

        {/* Data Table */}
        <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <DataTable value={tableData} scrollable scrollHeight="500px">
            
            {/* Name Column */}
            <Column
              field="name"
              header="Employee Name"
              frozen
              style={{
                width: "200px",
                fontWeight: "600",
                background: "#f9fafb"
              }}
            />

            {/* Dynamic Columns */}
            {tableData.length > 0 &&
              Object.keys(tableData[0])
                .filter((key) => key !== "name")
                .map((col) => (
                  <Column
                    key={col}
                    field={col}
                    header={col}
                    body={(row) => statusTemplate(row[col])}
                    style={{
                      width: viewType === "month" ? "70px" : "120px",
                      textAlign: "center"
                    }}
                  />
                ))}
          </DataTable>
        </div>

      </Card>
    </div>
  );
}
