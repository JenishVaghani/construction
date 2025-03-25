mport Header from "./components/Header/Header";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/addSuada" element={<AddSuada />} />
          <Route path="/dashboard/edit/:id" element={<AddSuada />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/addMember" element={<AddMember />} />
          <Route path="/members/edit/:id" element={<AddMember />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/addBrand" element={<AddBrand />} />
          <Route path="/brands/edit/:id" element={<AddBrand />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/addVendor" element={<AddVendor />} />
          <Route path="/vendors/edit/:id" element={<AddVendor />} />
          <Route path="/sellers" element={<Sellers />} />
          <Route path="/sellers/addSeller" element={<AddSeller />} />
          <Route path="/sellers/edit/:id" element={<AddSeller />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;