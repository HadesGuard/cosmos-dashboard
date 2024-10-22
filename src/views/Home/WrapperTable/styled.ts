import { Tab, Tabs, Box, TableCell, TableRow } from "@mui/material";
import styled from "@emotion/styled";

export const CustomTabs = styled(Tabs)(({}) => ({
  ".MuiTabs-indicator": {
    background: "#ea580c",
  },
  ".MuiBox-root": {
    padding: "0px !important",
  },
  marginBottom: 30,
}));

export const CustomTab = styled(Tab)(({}) => ({
  textTransform: "none",
  color: "#7d7d7d",
  fontSize: 20,
  fontWeight: 600,
  "&.Mui-selected": {
    color: "#e1e1e1",
  },
  "&.MuiTabs-indicator": {
    color: "#ea580c",
  },
}));

export const WrapperBox = styled(Box)(({}) => ({
  color: "#F5F5F6",
  borderRadius: 40,
  backgroundColor: "#171717",
  padding: 40,
  marginBottom: 120,
}));

export const CustomPanel = styled(Box)(({}) => ({
  ".MuiBox-root": {
    padding: "0px !important",
  },
}));

// Styled component for TableRow
export const CustomTableRow = styled(TableRow)(
  ({ open }: { open?: boolean }) => ({
    backgroundColor: open ? "#1f1f1f" : "#171717",
    borderTop: "6px solid #171717",
    borderBottom: open ? "6px solid #1f1f1f" : "6px solid #171717",
    "&:first-of-type td:first-of-type": {
      borderTopLeftRadius: "16px",
    },
    "&:first-of-type td:last-of-type": {
      borderTopRightRadius: "16px",
    },
    "&:last-of-type td:first-of-type": {
      borderBottomLeftRadius: "16px",
    },
    "&:last-of-type td:last-of-type": {
      borderBottomRightRadius: "16px",
    },
    "&:hover": {
      backgroundColor: "#1f1f1f", // Change to header background on hover
    },
  })
);

// Styled component for TableCell
export const CustomTableCell = styled(TableCell)(() => ({
  color: "#ddd", // Optional: Text color for better contrast
}));

// Styled component for TableHeader row
export const HeaderTableRow = styled(TableRow)(() => ({
  backgroundColor: "#1f1f1f", // Background for header

  "& th": {
    fontWeight: "bold", // Make header cells bold (optional)
    color: "#ddd", // Header text color (optional)
    border: "none !important",
  },
  "&:first-of-type th:first-of-type": {
    borderTopLeftRadius: "10px",
  },
  "&:first-of-type th:last-of-type": {
    borderTopRightRadius: "10px",
  },
  "&:last-of-type th:first-of-type": {
    borderBottomLeftRadius: "10px",
  },
  "&:last-of-type th:last-of-type": {
    borderBottomRightRadius: "10px",
  },
}));

export const ChildTableRow = styled(TableRow)(() => ({
  backgroundColor: "#1f1f1f",
}));
