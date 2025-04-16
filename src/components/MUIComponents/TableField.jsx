import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { EDIT } from "../../utils/constants";
import { DELETE } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { deleteBrand, deleteVendor, deleteSeller } from "../Redux/UserSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function TableField({ tableHeadingData, tableData }) {
  let colSpan = tableHeadingData.length + 1;
  const [showTableData, setShowTabledata] = useState(tableData);

  useEffect(() => {
    setShowTabledata(tableData);
  }, [tableData]);

  const edit = EDIT;
  const deleted = DELETE;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (item) => {
    if (item.type === "member") {
      navigate(`/members/edit/${item.userid}`);
    } else if (item.type === "brand") {
      navigate(`/brands/edit/${item.id}`);
    } else if (item.type === "vendor") {
      navigate(`/vendors/edit/${item.id}`);
    } else if (item.type === "seller") {
      navigate(`/sellers/edit/${item.id}`);
    }
  };

  const handleDelete = async (item) => {
    try {
      if (item.type === "member") {
        await axios.delete(
          `http://192.168.1.3:5000/deleteMember/${item.userid}`
        );
        setShowTabledata((prevData) =>
          prevData.filter((member) => member.userid !== item.userid)
        );
      } else if (item.type === "brand") {
        dispatch(deleteBrand(item.id));
      } else if (item.type === "vendor") {
        dispatch(deleteVendor(item.id));
      } else if (item.type === "seller") {
        dispatch(deleteSeller(item.id));
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        className="border border-gray-300 shadow-md"
      >
        <Table aria-label="styled table">
          <TableHead>
            <TableRow className="bg-gray-600">
              <TableCell
                align="center"
                className="border border-gray-400"
                sx={{ color: "white" }}
              >
                ID
              </TableCell>
              {tableHeadingData.map((item) => (
                <TableCell
                  key={item.name}
                  align="center"
                  className="border border-gray-400"
                  sx={{ color: "white" }}
                >
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="bg-gray-100">
            {showTableData.length > 0 ? (
              showTableData.map((item, index) => (
                <TableRow
                  key={index}
                  className="border border-gray-300 hover:bg-white"
                >
                  <TableCell align="center" className="border border-gray-300">
                    {index + 1}
                  </TableCell>
                  {item.type === "member" ? (
                    <>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.email}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.phone}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-6 mr-8 ml-8">
                          <img
                            src={edit.img}
                            alt={edit.name}
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleEdit(item)}
                          />
                          <img
                            src={deleted.img}
                            alt={deleted.name}
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleDelete(item)}
                          />
                        </div>
                      </TableCell>
                    </>
                  ) : item.type === "brand" ? (
                    <>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.category.label}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {Array.isArray(item.sizes)
                          ? item.sizes.map((size) => size.label).join(", ")
                          : item.sizes?.label}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-6 mr-8 ml-8">
                          <img
                            src={edit.img}
                            alt={edit.name}
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleEdit(item)}
                          />
                          <img
                            src={deleted.img}
                            alt={deleted.name}
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleDelete(item)}
                          />
                        </div>
                      </TableCell>
                    </>
                  ) : item.type === "vendor" ? (
                    <>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.email}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.phone}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-6 mr-8 ml-8">
                          <img
                            src={edit.img}
                            alt={edit.name}
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleEdit(item)}
                          />
                          <img
                            src={deleted.img}
                            alt={deleted.name}
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleDelete(item)}
                          />
                        </div>
                      </TableCell>
                    </>
                  ) : item.type === "seller" ? (
                    <>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.email}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.phone}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center space-x-6 mr-8 ml-8">
                          <img
                            src={edit.img}
                            alt={edit.name}
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleEdit(item)}
                          />
                          <img
                            src={deleted.img}
                            alt={deleted.name}
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => handleDelete(item)}
                          />
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <></>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={colSpan}
                  align="center"
                  className="border border-gray-300 text-red-500 font-bold italic"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableField;
