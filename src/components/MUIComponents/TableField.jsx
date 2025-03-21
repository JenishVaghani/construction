import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TableField({ tableHeadingData, tableData }) {
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
            {tableData.length > 0 ? (
              tableData.map((item, index) => (
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
                        {item.memberName}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.memberEmail}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.memberPhone}
                      </TableCell>
                    </>
                  ) : item.type === "brand" ? (
                    <>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.brandName}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.brandCategory}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {Array.isArray(item.brandSizes)
                          ? item.brandSizes.join(", ")
                          : item.brandSizes}
                      </TableCell>
                    </>
                  ) : item.type === "vendor" ? (
                    <>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.vendorName}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.vendorEmail}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.vendorPhone}
                      </TableCell>
                    </>
                  ) : item.type === "seller" ? (
                    <>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.sellerName}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.sellerEmail}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="border border-gray-300"
                      >
                        {item.sellerPhone}
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
                  colSpan={4}
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
