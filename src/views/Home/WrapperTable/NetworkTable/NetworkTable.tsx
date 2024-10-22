import Add from "../../../../assets/Add/Add";
import CustomTable from "../../../../components/CustomTable";
import { useMemo, useState } from "react";
import BasicModal from "../../../../components/ModalSubscribe";
import { useAuth } from "../../../../components/AuthContext";
import { toast } from "react-toastify";
import { TOAST_PROPS } from "../../../../constants/toast";
import { Box } from "@mui/material";

export function NetworkTable({ chainConfigData, isLoading }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [chain, setChain] = useState<string>("");

  const auth = useAuth();

  // const queryData: any = useQuery({
  //   queryKey: [CHAIN_CONFIG_QUERY_KEY],
  // });

  const rowsData = useMemo(() => {
    return chainConfigData;
  }, [chainConfigData]);

  const columns = [
    {
      field: "chainName",
      headerName: "Chain Name",
      width: 150,
      sortable: false,
      filterable: false,
      flex: 2,
      renderCell: (field: any) => {
        return (
          <Box>
            <img
              src={field.row.logoUrl}
              alt="chain-logo"
              style={{ width: "32px", marginRight: "10px" }}
            />
            {field.value}
          </Box>
        );
      },
    },
    {
      field: "chainId",
      headerName: "Chain ID",
      width: 150,
      sortable: false,
      filterable: false,
      flex: 2,
    },
    {
      field: "rpcUrl",
      headerName: "Status",
      type: "string",
      width: 110,
      sortable: false,
      filterable: false,
      flex: 2,
      renderCell: () => {
        return (
          <span className="badge border text-body-emphasis d-inline-flex align-items-center justify-content-between gap-2 rounded-pill fw-medium bg-body-tertiary ">
            <svg
              className="text-success"
              viewBox="0 0 6 6"
              aria-hidden="true"
              fill="currentColor"
              width="0.375rem"
              height="0.375rem"
            >
              <circle cx="3" cy="3" r="3"></circle>
            </svg>
            Active
          </span>
        );
      },
    },
    {
      field: "__v",
      headerName: "Action",
      description: "Subscribe Validator Address",
      sortable: false,
      width: 160,
      filterable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (row: any) => {
        return (
          <Add
            color="#ed7130"
            width="16"
            height="16"
            onclick={() => {
              if (!auth.isAuthenticated) {
                return toast.info(
                  "Need Login to subscribe your address",
                  TOAST_PROPS
                );
              }
              setOpenModal(true);
              setChain(row?.row?.chainId);
            }}
          />
        );
      },
    },
  ];

  const localeText = {
    noRowsLabel: "There are any chain available",
  };

  return (
    <>
      <CustomTable
        columns={columns}
        rowsData={rowsData}
        loading={isLoading}
        localeText={localeText}
      />
      <BasicModal open={openModal} setOpen={setOpenModal} chain={chain} />
    </>
  );
}
