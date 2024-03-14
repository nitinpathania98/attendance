export interface UserTableProps {
  formValues: {
    name: string;
    email: string;
    department: string;
  };
  allUsers?: Array<{ id: string; name: string;  email: string; department: string }>;
  deleteSelected: (user: any) => void;
  openEditPopup: (user: any) => void;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
