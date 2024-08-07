import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";
import { CSVLink } from "react-csv";
import axios from "axios";

const Participant = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [header, setHeader] = useState([]);
  const [data, setData] = useState([]);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
        // Fetch questions
        const resQuestions = await axios.get(`${import.meta.env.VITE_BASE_URL}/question`);
       
          const questions = resQuestions.data.data.map(e => e.title);
          setHeader(questions);
        

    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {

        const resAnswers = await axios.get(`${import.meta.env.VITE_BASE_URL}/answer`);
      
          const answers = resAnswers.data.data;
          const formattedData = answers.map(item => {
            const dataObj = {};
            item.dataArray.forEach((answer, index) => {
              dataObj[header[index]] = answer.answer;
            });
            return { id: item._id, ...dataObj };
          });
          setData(formattedData);
        
    };

    fetchData();
  }, [header]); // Empty dependency array to fetch data only once on mount

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Participants");

    worksheet.columns = header.map(e => ({
      header: e,
      key: e,
      width: 25
    }));

    data.forEach(row => {
      worksheet.addRow(Object.values(row));
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Participants.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    handleClose();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    // doc.text("Participants", 20, 10);
    doc.autoTable({
      head: [header],
      body: data.map(row => header.map(field => row[field])),
    });
    doc.save("Participants.pdf");
    handleClose();
  };

  const columns = header.map(headerName => ({
    field: headerName,
    headerName,
    flex: 1,
    align: "center",
    headerAlign: "center",
  }));

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleClick}>
          Export
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleExportExcel}>Export to Excel</MenuItem>
          <MenuItem onClick={handleExportPDF}>Export to PDF</MenuItem>
          <CSVLink data={data} filename="Participants.csv" style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleClose}>Export to CSV</MenuItem>
          </CSVLink>
        </Menu>
      </Box>

      <Box sx={{ height: 600, mx: "auto" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
        />
      </Box>
    </Box>
  );
};

export default Participant;
