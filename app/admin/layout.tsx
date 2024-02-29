import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/navigation/Header";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex-1 pt-6">
        <Sidebar />
        <div className="ml-4 md:ml-[250px] pt-6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
