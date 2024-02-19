import Header from "@/components/seller/Header";
import Sidebar from "@/components/seller/Sidebar";

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex-1 pt-6">
        <Sidebar />
        <div className="ml-4 md:ml-[220px] pt-6">{children}</div>
      </div>
    </div>
  );
};

export default SellerLayout;
