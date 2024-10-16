import React, { useMemo, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  ChildTableRow,
  CustomTableCell,
  CustomTableRow,
  HeaderTableRow,
} from "../styled";
import { useQuery } from "@tanstack/react-query";
import { STAKING_INFO_QUERY_KEY } from "../../../../constants/keys";
import {
  getUserStakingInfo,
  unSubscribeUserStakingInfo,
} from "../../../../apis/chains";
import { generateUUID } from "../../../../utils/uuid";
import { IAddressStaking, IChainConfig } from "../../../../constants/type";
import { displayCoin } from "../../../../utils/format";
import {
  Button,
  CircularProgress,
  TablePagination,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import { TOAST_PROPS } from "../../../../constants/toast";

function RowTable({
  row,
  refetch,
}: {
  row: IAddressStaking;
  refetch: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleUnsubscribe = async () => {
    try {
      if (!row?.address) throw new Error("Address is not Valid");
      await unSubscribeUserStakingInfo(row?.address);
      toast.success("Unsubscribe successfully", TOAST_PROPS);
      refetch();
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong!", TOAST_PROPS);
    }
  };

  return (
    <React.Fragment>
      <CustomTableRow open={open}>
        <CustomTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon sx={{ color: "#fff" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ color: "#fff" }} />
            )}
          </IconButton>
        </CustomTableCell>
        <CustomTableCell>{row?.chainId}</CustomTableCell>
        <CustomTableCell>{row?.chainName}</CustomTableCell>
        <CustomTableCell>{row?.address}</CustomTableCell>
        <CustomTableCell>
          <Tooltip title="Unsubscribe">
            <Button onClick={handleUnsubscribe}>
              <DeleteIcon sx={{ color: "#fff" }} />
            </Button>
          </Tooltip>
        </CustomTableCell>
      </CustomTableRow>
      <ChildTableRow>
        <CustomTableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: "none" }}
          colSpan={6}
        >
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={{ paddingBottom: "10px" }}
          >
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Validator Name</CustomTableCell>
                    <CustomTableCell>Staked</CustomTableCell>
                    <CustomTableCell>Rewards</CustomTableCell>
                    <CustomTableCell>Validator Address</CustomTableCell>
                    <CustomTableCell>Uptime</CustomTableCell>
                    <CustomTableCell>Commission</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.stakingInfo?.length > 0 &&
                    row?.stakingInfo.map((stakingInfoItem) => (
                      <TableRow key={generateUUID()}>
                        <CustomTableCell component="th" scope="row">
                          <img
                            src={stakingInfoItem.avatar}
                            alt="validator-logo"
                            style={{ width: "32px", marginRight: "10px" }}
                          />
                          {stakingInfoItem.validator}
                        </CustomTableCell>
                        <CustomTableCell>
                          {displayCoin(stakingInfoItem.staked, row.decimal)}
                        </CustomTableCell>
                        <CustomTableCell>
                          {displayCoin(stakingInfoItem.rewards, row.decimal)}
                        </CustomTableCell>
                        <CustomTableCell>
                          {stakingInfoItem.validatorAddress}
                        </CustomTableCell>
                        <CustomTableCell>
                          {stakingInfoItem.uptime} %
                        </CustomTableCell>
                        <CustomTableCell>
                          {stakingInfoItem.commission} %
                        </CustomTableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </CustomTableCell>
      </ChildTableRow>
    </React.Fragment>
  );
}

const pageSize = 10;

// Main component
export default function SubscribeValidator({
  chainConfigData,
}: {
  chainConfigData: IChainConfig[];
}) {
  const [trigger, setTrigger] = useState(true);

  const {
    data: rowsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [STAKING_INFO_QUERY_KEY],
    queryFn: () => getUserStakingInfo(chainConfigData),
    enabled: trigger,
    initialData: [],
  });
  const [page, setPage] = useState(0);

  const filteredRowData = useMemo(() => {
    if (!(rowsData?.length > 0)) return [];
    setTrigger(false);
    const newData = JSON.parse(JSON.stringify(rowsData));
    return newData.splice(page * pageSize, pageSize);
  }, [page, rowsData]);

  return (
    <TableContainer
      sx={{
        minHeight: "917px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <HeaderTableRow>
            <CustomTableCell />
            <CustomTableCell>Chain ID</CustomTableCell>
            <CustomTableCell>Chain Name</CustomTableCell>
            <CustomTableCell>Address</CustomTableCell>
            <CustomTableCell>Action</CustomTableCell>
          </HeaderTableRow>
        </TableHead>
        <TableBody>
          {filteredRowData.map((row: any) => (
            <RowTable key={generateUUID()} row={row} refetch={refetch} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={rowsData?.length ?? 0}
        page={rowsData?.length > 0 ? page : 0}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[]}
        labelRowsPerPage=""
        sx={{
          borderRadius: "10px",
          background: "#1f1f1f",
          ".MuiTablePagination-displayedRows": {
            margin: "0px !important",
            color: "#e1e1e1",
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
        }}
      />
      {(isLoading || filteredRowData?.length == 0) && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            "There are no subscribe address yet!"
          )}
        </Box>
      )}
    </TableContainer>
  );
}
