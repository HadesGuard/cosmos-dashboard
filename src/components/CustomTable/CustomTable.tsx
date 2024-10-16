import Box from "@mui/material/Box";
import { CustomDataGrid } from "./styled";
import { GridLocaleText } from "@mui/x-data-grid";

export interface CustomTableProps {
  columns: any;
  rowsData: any;
  loading?: boolean;
  localeText?: Partial<GridLocaleText>;
}

export function CustomTable({
  columns,
  rowsData,
  loading,
  localeText,
}: CustomTableProps) {
  return (
    <Box
      sx={{
        height: "917px",
        width: "100%",
        padding: "20px 40px",
        borderRadius: 10,
      }}
    >
      <CustomDataGrid
        rows={rowsData}
        columns={columns}
        style={{ background: "#171717", color: "#dddddd" }}
        loading={!!loading}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        showCellVerticalBorder={false}
        showColumnVerticalBorder={false}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        disableColumnFilter
        disableColumnMenu
        localeText={localeText}
        getRowId={() => Math.random().toString()}
      />
    </Box>
  );
}
