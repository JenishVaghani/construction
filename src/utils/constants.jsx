import Teqnodux from "./images/teqnodux.png";
import Dashboard from "./images/dashboard.png";
import Members from "./images/members.png";
import Brands from "./images/brands.png";
import Sellers from "./images/sellers.png";
import Settings from "./images/settings.png";
import Profile from "./images/jenish.png";
import Edit from "./images/edit.png"
import Show from "./images/show.png"
import Vendors from "./images/vendors.png"

export const TEQNODUX = { img: Teqnodux, name: "teqnodux" };
export const PROFILE = { img: Profile, name: "Jenish Vaghani" };
export const EDIT = { img: Edit, name: "edit" }
export const SHOW = { img: Show, name: "show" }

export const SIDEDETAILS = [
  { img: Dashboard, name: "dashboard", title: "Dashboard" },
  { img: Members, name: "members", title: "Members" },
  { img: Brands, name: "brands", title: "Brands" },
  { img: Vendors, name: "vendors", title: "Vendors" },
  { img: Sellers, name: "sellers", title: "Sellers" },
  { img: Settings, name: "settings", title: "Settings" },
];

export const BRANDCATEGORYS = [
  { label: "Cement", value: "01b31a99-2422-4ee3-ac6c-a63934aecd53" },
  { label: "Steal", value: "8b64b5f2-7f1a-4e47-b00a-18ff1126e6fb" },
];

export const CEMENTSIZESNAME = [
  {label: "OPC", value: "08ee6ed6-2039-43df-86bf-ed637f48ff8f"},
  {label: "PPC", value: "53615a1c-8847-4af7-b6fb-0d62d6d5aa11"},
  {label: "Premium", value: "52b570cc-c439-4b45-b11e-3532c96abd5e"}
]

export const STEALSIZESNAME = [
  {label: "8 mm", value: "548480d4-4960-45cc-84df-4588121efe85"},
  {label: "12 mm", value: "7c06443e-6c6a-417e-a44e-4f55289cd153"},
  {label: "16 mm", value: "8bfcb65d-f514-439c-b7d6-98ebad0e1d5b"},
  {label: "20 mm", value: "d96818a8-9ecd-4459-8738-70bf15f2cd56"},
]

export const MEMBERTABLEHEADINGDATA = [
  { name: "Name" },
  { name: "Email" },
  { name: "Phone No" },
]

export const BRANDTABLEHEADINGDATA = [
  { name: "Name" },
  { name: "Category" },
  { name: "Size" },
]

export const VENDORTABLEHEADINGDATA = [
  {name: "Name"}, 
  {name: "Email"},
  {name: "Phone No"},
]

export const SELLERTABLEHEADINGDATA = [
  {name: "Name"}, 
  {name: "Email"},
  {name: "Phone No"},
]
