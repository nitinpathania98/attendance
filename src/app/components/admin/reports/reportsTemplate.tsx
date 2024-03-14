"use client";
// ReportsTemplate.tsx

// reportsTemplate.tsx
import React from "react";
import { ReportsInterface } from "./reportsInterface";
import { CSVLink } from "react-csv";

const ReportsTemplate: React.FC<ReportsInterface> = ({
  attendance,
  filterName,
  setFilterName,
}) => {
  const headers = [
    "Entry",
    "Name",
    "Date",
    "Time-In",
    "Time-Out",
    "Total Hrs",
    "Status",
  ];

  
  // Convert attendance data into an array of arrays
  const attendanceData = attendance.map((user, index) => [
    index + 1,
    user.userName,
    user.date,
    user.timeIn,
    user.timeOut,
    user.totalHours,
    user.status,
  ]);

  return (
    <div className="container mt-4 w-3/4 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="grid md:grid-cols-1 gap-4">
          <div className="bg-white shadow-md rounded px-4 py-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div className="flex gap-2 sm:block">
                <span className="text-gray-500">Filter by Name:</span>
                <input
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
                />
              </div>
              <CSVLink
                data={attendanceData}
                headers={headers}
                filename={"attendance_report.csv"}
              >
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Download Report
                </button>
              </CSVLink>
            </div>
          </div>
          <div className="bg-white shadow-md rounded px-4 py-4">
            <h3 className="text-base font-bold text-gray-800 mb-2">
              Attendance Report
            </h3>

            {attendance.length > 0 ? (
              <table className="w-full table-auto border-collapse border border-gray-200">
                <thead>
                  <tr className="border-b border-gray-200 text-center">
                    <th className="px-2 py-1">Entry</th>
                    <th className="px-2 py-1">Name</th>
                    <th className="px-2 py-1">Date</th>
                    <th className="px-2 py-1">Time-In</th>
                    <th className="px-2 py-1">Time-Out</th>
                    <th className="px-2 py-1">Total Hrs</th>
                    <th className="px-2 py-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((user, index) => (
                    <tr
                      key={index}
                      className="border border-gray-200 hover:bg-gray-100 text-center"
                    >
                      <td className="px-2 py-1">{index + 1}</td>
                      <td className="px-2 py-1">{user.userName}</td>
                      <td className="px-2 py-1">{user.date}</td>
                      <td className="px-2 py-1">{user.timeIn}</td>
                      <td className="px-2 py-1">{user.timeOut}</td>
                      <td className="px-2 py-1">{user.totalHours}</td>
                      <td className="px-2 py-1">{user.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No attendance data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsTemplate;
