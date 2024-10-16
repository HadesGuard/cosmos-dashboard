import styled from "@emotion/styled";
import { DataGrid } from "@mui/x-data-grid";

export const CustomDataGrid = styled(DataGrid)(() => ({
  background: "#171717",
  color: "#dddddd",
  ".MuiDataGrid-row": {
    borderRadius: 10,
    margin: "6px 0",
    "&:hover": {
      backgroundColor: "#1f1f1f",
    },
  },

  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },

  ".MuiDataGrid-filler": {
    border: "none !important",
    display: "none",
  },

  ".MuiDataGrid-columnHeader": {
    border: "none !important",
  },

  ".MuiDataGrid-columnHeaderTitleContainer": {
    border: "none !important",
  },

  ".MuiDataGrid-row--borderBottom": {
    background: "#1f1f1f !important",
  },
  border: "none !important",
  "& .MuiDataGrid-root": {
    border: "none !important", // Removes the outer border
  },
  "& .MuiDataGrid-cell": {
    border: "none !important", // Removes the inner cell borders
  },
  "& .MuiDataGrid-columnHeaders": {
    border: "none", // Removes the border under the column headers
    "& > div": {
      borderRadius: "10px !important",
    },
  },
  "& .MuiDataGrid-footerContainer": {
    border: "none !important", // Removes the border at the top of the footer
    background: "#1f1f1f",
    borderRadius: 10,

    ".MuiTablePagination-displayedRows": {
      color: "#dddddd",
      margin: 0,
    },
  },

  ".MuiTablePagination-actions .MuiIconButton-root": {
    color: "#e1e1e1",
  },

  ".MuiTablePagination-actions .Mui-disabled": {
    color: "#7d7d7d",
  },

  ".MuiTablePagination-actions .MuiIconButton-root:hover": {
    background: "transparent",
    color: "#e1e1e1",
  },
  "& .MuiDataGrid-row:last-of-type": {
    borderBottom: "none",
  },
  "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
    display: "none",
  },

  ".MuiDataGrid-virtualScroller": {
    marginBottom: 20,
  },

  ".MuiDataGrid-columnHeader .MuiDataGrid-iconButtonContainer svg": {
    color: "#fff !important",
  },
  ".MuiDataGrid-overlay": {
    background: "#1f1f1f",
    marginTop: "20px",
  },
}));
