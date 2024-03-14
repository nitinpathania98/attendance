"use client";
import React from "react";
import { employeeAttendanceInterface } from "./employeeAttendanceInterface";
const EmployeeTemplate: React.FC<employeeAttendanceInterface> = ({
  handleSignIn,
  handleSignOut,
  isClockedIn,
  currentTime,
  message,
}) => {
  return (
    <div className="w-3/4">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-xl font-bold text-gray-800">Attendance</h1>
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">Employee:</span>
            <p></p>
          </div>
        </div>
        <div className="grid  md:grid-cols-1 gap-4">
          <div className="bg-white shadow-md rounded px-4 py-4">
            <h3 className="text-base font-bold text-gray-800 mb-2">
              Attendance
            </h3>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500">Current Time: {currentTime}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                  isClockedIn ? "btn-disabled" : ""
                }`}
                onClick={handleSignIn}
                disabled={isClockedIn}
              >
                Day In
              </button>
              {isClockedIn && (
                <button
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                  onClick={handleSignOut}
                >
                  Day Out
                </button>
              )}
            </div>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTemplate;
