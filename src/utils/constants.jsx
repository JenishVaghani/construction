import Teqnodux from "./images/teqnodux.png";
import Dashboard from "./images/dashboard.png";
import Members from "./images/members.png";
import Brands from "./images/brands.png";
import Sellers from "./images/sellers.png";
import Edit from "./images/edit.png";
import Show from "./images/show.png";
import Vendors from "./images/vendors.png";
import Delete from "./images/delete.png";
import ListOpen from "./images/listOpen.png";
import Filter from "./images/filter.png";
import Download from "./images/download.png";
import Image404 from "./images/404.png";
import Construction from "./images/construction.png";
import Logout from "./images/Logout.png"

export const TEQNODUX = { img: Teqnodux, name: "teqnodux" };
export const EDIT = { img: Edit, name: "edit" };
export const SHOW = { img: Show, name: "show" };
export const DELETE = { img: Delete, name: "Delete" };
export const LISTOPEN = { img: ListOpen, name: "List Open" };
export const FILTER = { img: Filter, name: "Filter" };
export const DOWNLOAD = { img: Download, name: "Download" };
export const IMAGE404 = { img: Image404, name: "Image404" };
export const CONSTRUCTION = { img: Construction, name: "Construction" };
export const LOGOUT = {img: Logout, name: "Logout"}

export const SIDEDETAILS = [
  { img: Dashboard, name: "dashboard", title: "Dashboard" },
  { img: Members, name: "members", title: "Members" },
  { img: Brands, name: "brands", title: "Brands" },
  { img: Vendors, name: "vendors", title: "Vendors" },
  { img: Sellers, name: "sellers", title: "Sellers" },
];

export const BRANDCATEGORYS = [
  { label: "Cement", value: "01b31a99-2422-4ee3-ac6c-a63934aecd53" },
  { label: "Steal", value: "8b64b5f2-7f1a-4e47-b00a-18ff1126e6fb" },
];

export const CEMENTSIZESNAME = [
  { label: "OPC", value: "08ee6ed6-2039-43df-86bf-ed637f48ff8f" },
  { label: "PPC", value: "53615a1c-8847-4af7-b6fb-0d62d6d5aa11" },
  { label: "Premium", value: "52b570cc-c439-4b45-b11e-3532c96abd5e" },
];

export const STEALSIZESNAME = [
  { label: "8 mm", value: "548480d4-4960-45cc-84df-4588121efe85" },
  { label: "12 mm", value: "7c06443e-6c6a-417e-a44e-4f55289cd153" },
  { label: "16 mm", value: "8bfcb65d-f514-439c-b7d6-98ebad0e1d5b" },
  { label: "20 mm", value: "d96818a8-9ecd-4459-8738-70bf15f2cd56" },
];

export const MEMBERTABLEHEADINGDATA = [
  { name: "Name" },
  { name: "Email" },
  { name: "Phone No" },
  { name: "Action" },
];

export const BRANDTABLEHEADINGDATA = [
  { name: "Name" },
  { name: "Category" },
  { name: "Size" },
  { name: "Action" },
];

export const VENDORTABLEHEADINGDATA = [
  { name: "Name" },
  { name: "Email" },
  { name: "Phone No" },
  { name: "Action" },
];

export const SELLERTABLEHEADINGDATA = [
  { name: "Name" },
  { name: "Email" },
  { name: "Phone No" },
  { name: "Action" },
];
