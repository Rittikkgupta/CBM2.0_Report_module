import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Table.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import CircularProgress from "@mui/material/CircularProgress";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0078bd",
    color: theme.palette.common.white,
    position: "sticky",
    top: 0,
    zIndex: 6,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    padding: "1px 8px",
    whiteSpace: "nowrap",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
    padding: "8px 66px",
    // fontWeight: 'bold',
    whiteSpace: "nowrap",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function AgentAuxReport({
  startDate,
  endDate,
  skillSet,
  agentName,
}) {
  const columns = [
    { id: "agentName", label: "Agent Name", textAlign: "center" },
    { id: "skillSet", label: "Skill Set", textAlign: "center" },
    { id: "date", label: "Date", textAlign: "center" },
    { id: "mealBreak", label: "Meal Break", textAlign: "center" },
    { id: "teaBreak", label: "Tea Break", textAlign: "center" },
    { id: "meeting", label: "Meeting", textAlign: "center" },
    { id: "supDiscussion", label: "Sup. Discussion", textAlign: "center" },
    { id: "technicalIssue", label: "Technical Issue", textAlign: "center" },
    { id: "reporting", label: "Reporting", textAlign: "center" },
    { id: "manualOB", label: "Manual OB", textAlign: "center" },
    { id: "shortBreak", label: "Short Break", textAlign: "center" },
    { id: "permission", label: "Permission", textAlign: "center" },
    { id: "sick", label: "Sick", textAlign: "center" }
];


  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const requestData = {
        startDateTime: startDate,
        endDateTime: endDate,
        skillSet: skillSet,
        agentName: agentName,

        page: page + 1, // API expects 1-based page index
        size: rowsPerPage,
      };

      try {
        const response = await axios.post("http://192.168.45.59:8080/cbmreports/api/reports/agentAuxCodesReport", requestData);
        console.log("Response data:", response.data);
        setRows(response.data.dataList || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skill set report:", error);
        setLoading(false);
      }
    };

    const fetchTotalCount = async () => {
      try {
        const response = await axios.post(
          "http://192.168.45.59:8080/cbmreports/api/reports/getTotalCount",
          { reportName: "Agent AUX Reason Codes Report" }
        );
        setTotalRows(response.data.size);
      } catch (error) {
        console.error("Error fetching total count Agent AUX Reason Codes Report:", error);
      }
    };

    fetchData();
    fetchTotalCount();
  }, [
    startDate,
    endDate,
    skillSet,
    agentName,
    page,
    rowsPerPage,
  ]);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page changes
  };

  const sortedRows = rows.slice().sort((a, b) => {
    if (orderBy) {
      if (order === "asc") {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      } else {
        return a[orderBy] > b[orderBy] ? -1 : 1;
      }
    }
    return rows;
  });

  const handleDownload = async () => {
    const requestData = {
      startDateTime: startDate,
      endDateTime: endDate,
      skillSet: skillSet,
      agentName: agentName,
      page: 0, // Static value for page
      size: 0, // Static value for size
    };

    try {
      const response = await axios.post(
        "http://192.168.45.59:8080/cbmreports/api/reports/downloadAgentAuxCodesReport",
        requestData,
        { responseType: "blob" } // Set response type to blob for file download
      );

      // Create a URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Agent Aux Codes Report.csv"); // Set default file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading Agent Aux Codes Report :", error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <CircularProgress />
          </div>
        </div>
      ) : (
        <TableContainer
          className="scrollbar"
          component={Paper}
          sx={{ maxHeight: 412, overflowX: "auto" }}
        >
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : "asc"}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
             <TableBody>
  {sortedRows.map((row, index) => (
    <StyledTableRow key={index}>
      {columns.map((column) => (
        <StyledTableCell key={column.id}>
          {row[column.id] !== null && row[column.id] !== "null" ? row[column.id] : "-"}
        </StyledTableCell>
      ))}
    </StyledTableRow>
  ))}
</TableBody>
          </Table>
        </TableContainer>
      )}
      <div className="footer">
        {/* <div className="download-button-container">
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download
          </Button>
        </div> */}
        <div className="pagination-container">
          <TablePagination
            component="div"
            count={totalRows}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </div>
      </div>
    </>
  );
}

export default AgentAuxReport;


