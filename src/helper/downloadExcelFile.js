// npm install xlsx file-saver

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const downloadExcel = (dataArray) => {
  // 1) Convert Array → Excel Sheet
  const worksheet = XLSX.utils.json_to_sheet(dataArray);

  // 2) Create Workbook & Add Sheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // 3) Convert to Excel Buffer
  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array"
  });

  // 4) Trigger Excel File Download
  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  saveAs(file, "my-data.xlsx");
};

// Example: Call On Button Click
const data = [
  { name: "John", email: "john@gmail.com" },
  { name: "Sara", email: "sara@gmail.com" }
];

{/* <button onClick={() => downloadExcel(data)}>Download Excel</button> */}
