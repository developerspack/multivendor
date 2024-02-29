import DriverSidebar from "@/components/DriverSidebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 pt-6">
      <DriverSidebar />
      <div className="ml-4 md:ml-[250px] pt-6">{children}</div>
    </div>
  );
};

export default AdminLayout;
