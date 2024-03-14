export interface ReportEntry {
  entry: number; 
  userName: string;
  date: string;
  timeIn: string;
  timeOut: string;
  totalHours: string;
  status: string;
}

export interface ReportsInterface {
  attendance: ReportEntry[];
  filterName: string;
  setFilterName: React.Dispatch<React.SetStateAction<string>>;
}