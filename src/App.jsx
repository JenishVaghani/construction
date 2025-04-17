import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Aurthontication/Login";
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
import AuthGuard from "./components/MiddleWare/AuthGuard";
import Layout from "./components/Layout/Layout";
import { useState } from "react";
import NotFoundPage from "./components/Aurthontication/NotFoundPage";
function App() {
  const [getIsSidebarOpen, setGetIsSidebarOpen] = useState("");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <AuthGuard>
                <Layout setGetIsSidebarOpen={setGetIsSidebarOpen}>
                  <Routes>
                    <Route path="*" element={<NotFoundPage />}></Route>
                    <Route
                      path="/"
                      element={<Dashboard isSidebarOpen={getIsSidebarOpen} />}
                    />
                    {/* Main Page Section */}
                    <Route
                      path="/dashboard"
                      element={<Dashboard isSidebarOpen={getIsSidebarOpen} />}
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
                    <Route
                      path="/members/edit/:userid"
                      element={<AddMember />}
                    />
                    <Route path="/brands/edit/:id" element={<AddBrand />} />
                    <Route path="/vendors/edit/:id" element={<AddVendor />} />
                    <Route path="/sellers/edit/:id" element={<AddSeller />} />
                    <Route path="/dashboard/edit/:id" element={<AddSuada />} />
                  </Routes>
                </Layout>
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
