import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Members from "./components/Members/Members";
import Brands from "./components/Brands/Brands";
import Vendors from "./components/Vendors/Vendors";
import Sellers from "./components/Sellers/Sellers";
import Settings from "./components/Settings/Settings";
import AddSuada from "./components/Dashboard/AddSuada";
import AddMember from "./components/Members/AddMember";
import AddBrand from "./components/Brands/AddBrand";
import AddVendor from "./components/Vendors/AddVendor";
import AddSeller from "./components/Sellers/AddSeller";
import { useState } from "react";
import Signup from "./components/Aurthontication/Signup";
import Login from "./components/Aurthontication/Login";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (e) => {
    setIsSidebarOpen(e);
  };
  return (
    <>
      <BrowserRouter>
        <Signup />
        <Login />
        <Header toggleSidebar={() => toggleSidebar(!isSidebarOpen)} />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="ml-0 sm:ml-20 lg:ml-56 mt-16 duration-300">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            {/* Main Page Section */}
            <Route
              path="/dashboard"
              element={<Dashboard isSidebarOpen={isSidebarOpen} />}
            />
            <Route path="/members" element={<Members />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/sellers" element={<Sellers />} />
            <Route path="/settings" element={<Settings />} />

            {/* Add Page Section */}
            <Route path="/members/addMember" element={<AddMember />} />
            <Route path="/brands/addBrand" element={<AddBrand />} />
            <Route path="/sellers/addSeller" element={<AddSeller />} />
            <Route path="/vendors/addVendor" element={<AddVendor />} />
            <Route path="/dashboard/addSuada" element={<AddSuada />} />

            {/* Edit Page Section */}
            <Route path="/members/edit/:id" element={<AddMember />} />
            <Route path="/brands/edit/:id" element={<AddBrand />} />
            <Route path="/vendors/edit/:id" element={<AddVendor />} />
            <Route path="/sellers/edit/:id" element={<AddSeller />} />
            <Route path="/dashboard/edit/:id" element={<AddSuada />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
