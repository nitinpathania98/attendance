"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeTemplate from "./employeeTemplate";

const EmployeePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [timeIn, setTimeIn] = useState("-");
  const [timeOut, setTimeOut] = useState("-");
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [attendanceId, setAttendanceId] = useState<any>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      const currentDateFormatted = now.toLocaleDateString();
      if (currentDateFormatted !== currentDate) {
        setTimeIn("-");
        setTimeOut("-");
        setIsClockedIn(false);
        setCurrentDate(currentDateFormatted);
      }
    };
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, [currentDate]);
  // const UserId =
  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/employee/attendance/signin",
        {
          UserId: localStorage.getItem("UserId"),
          timeIn: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          date: new Date(currentDate).toISOString().split("T")[0],
        }
      );
      setIsClockedIn(true);
      setTimeIn(response.data.timeIn);
      setAttendanceId(response.data.id);
      setMessage("User signed in");
      console.log("Day-in successful:", response.data);
    } catch (error: any) {
      console.error("Error Day in:", error);
      setMessage(
        `Error Day in: ${error.response?.data?.error || "Unknown error"}`
      );
    }
  };

  const handleSignOut = async () => {
    try {
      const formattedTimeOut = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const response = await axios.put(
        `http://localhost:8080/api/employee/attendance/signout/${attendanceId}`,
        {
          timeOut: formattedTimeOut,
        }
      );
      setIsClockedIn(false);
      setTimeOut(response.data.timeOut);
      setMessage("User Day out");
      console.log("Day-out successful:", response.data);
    } catch (error: any) {
      console.error("Error Day out:", error);
      setMessage(`Error Day out: ${error.message}`);
    }
  };

  return (
    <EmployeeTemplate
      date={currentDate}
      timeIn={timeIn}
      timeOut={timeOut}
      totalHours={undefined}
      id={attendanceId}
      handleSignIn={handleSignIn}
      handleSignOut={handleSignOut}
      isClockedIn={isClockedIn}
      currentTime={currentTime}
      message={message}
    />
  );
};

export default EmployeePage;
