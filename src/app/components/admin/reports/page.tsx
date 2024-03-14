"use client";
import React, { useEffect, useState } from "react";
import ReportsTemplate from "./reportsTemplate";
import { AttendanceHistory } from "@/services/api";
import { ReportEntry } from "./reportsInterface";

const Reports: React.FC = () => {
  const [attendance, setAttendance] = useState<ReportEntry[] | null>(null);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    const fetchAttendanceHistory = async () => {
      try {
        const url = "employee/attendance";
        const response: any = await AttendanceHistory(url);
        // Parse totalHours to number
        const dataWithParsedTotalHours = response.data.map((entry: any) => ({
          ...entry,
          totalHours: parseFloat(entry.totalHours),
        }));
        setAttendance(dataWithParsedTotalHours);
      } catch (error: any) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchAttendanceHistory();
  }, []);

  // Filter data by name
  const filteredAttendance = attendance?.filter(user =>
    user.userName.toLowerCase().includes(filterName.toLowerCase())
  ) || [];

  return (
    <>
      <ReportsTemplate
        attendance={filteredAttendance}
        filterName={filterName}
        setFilterName={setFilterName}
      />
    </>
  );
};

export default Reports;
