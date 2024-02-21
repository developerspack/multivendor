import Header from "@/components/navigation/Header";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Header />
      {children}
    </div>
  );
};

export default BrowseLayout;
