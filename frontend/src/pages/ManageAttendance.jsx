import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import API_BASE_URL from "../config";

export default function ManageAttendance() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch users from JSON server
  useEffect(() => {
    fetch(`${API_BASE_URL}/users`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch(() => alert("Could not connect to JSON server. Please start it."));
  }, []);

  const attendanceStatus = [
    { label: "Present", value: "Present" },
    { label: "Absent", value: "Absent" },
  ];

  const handleSubmit = async () => {
    if (!selectedUser || !date || !status) {
      alert("Please fill all fields");
      return;
    }

    const newRecord = {
      userId: selectedUser.id,
      name: `${selectedUser.firstName} ${selectedUser.lastName}`,
      date: date.toISOString().split("T")[0],
      status,
    };

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecord),
      });

      if (!res.ok) throw new Error("Error saving attendance");

      alert("Attendance saved successfully!");

      // Reset fields
      setSelectedUser(null);
      setDate(null);
      setStatus(null);
    } catch (err) {
      console.log(err);
      alert("Failed to save attendance. Check JSON Server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <Card className="w-full max-w-xl shadow-lg p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-5">Manage Attendance</h2>

        <div className="space-y-5">
          {/* Select User */}
          <div>
            <label className="font-medium">Select User</label>
            <Dropdown
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.value)}
              options={users}
              optionLabel="firstName"
              placeholder="Choose a user"
              className="w-full mt-1"
              filter
            />
          </div>

          {/* Choose Date */}
          <div>
            <FloatLabel>
              <Calendar
                id="attendance_date"
                value={date}
                onChange={(e) => setDate(e.value)}
                dateFormat="yy-mm-dd"
                showIcon
                className="w-full"
                maxDate={new Date()}  
              />
              <label htmlFor="attendance_date">Select Date</label>
            </FloatLabel>
          </div>

          {/* Select Status */}
          <div>
            <label className="font-medium">Status</label>
            <Dropdown
              value={status}
              onChange={(e) => setStatus(e.value)}
              options={attendanceStatus}
              placeholder="Select status"
              className="w-full mt-1"
            />
          </div>

          {/* Save Button */}
          <Button
            label={loading ? "Saving..." : "Submit"}
            className="w-full"
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>
      </Card>
    </div>
  );
}
