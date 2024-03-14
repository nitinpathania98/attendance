import React from "react";
import EmployeePage from "../../components/employee/attendanceDashboard/page";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
interface ProtectedPageProps {
  children: JSX.Element; // Or a more specific type based on your content
}

async function ProtectedPage({ children }: ProtectedPageProps) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  return children;
}
const Employee = () => {
  return (
    <ProtectedPage>
      <EmployeePage />
    </ProtectedPage>
  );
};

export default Employee;
