import { ReactNode } from "react";

export interface employeeAttendanceInterface {
  date: string; // Updated to string type
  timeIn: ReactNode;
  timeOut: ReactNode;
  totalHours: any;
  id: any;
  handleSignIn: (e: any) => void;
  handleSignOut: (e: any) => void;
  isClockedIn: boolean;
  currentTime: string;
  message: string;
}
