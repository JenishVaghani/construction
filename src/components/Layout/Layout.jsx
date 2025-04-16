import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children, setGetIsSidebarOpen }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (e) => {
    setIsSidebarOpen(e);
  };

  useEffect(() => {
    setGetIsSidebarOpen(isSidebarOpen)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSidebarOpen])

  return (
    <>
      <Header toggleSidebar={() => toggleSidebar(!isSidebarOpen)} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="ml-0 sm:ml-20 lg:ml-56 mt-16 duration-300">
        {children}
      </div>
    </>
  );
};

export default Layout;
