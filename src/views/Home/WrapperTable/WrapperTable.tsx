import { ReactNode, SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import NetworkTable from "./NetworkTable";
import { CustomPanel, CustomTab, CustomTabs, WrapperBox } from "./styled";
import { useAuth } from "../../../components/AuthContext";
import { toast } from "react-toastify";
import { TOAST_PROPS } from "../../../constants/toast";
import SubscribeValidator from "./SubscribeValidator";
import { IChainConfig } from "../../../constants/type";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <CustomPanel
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </CustomPanel>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    className: "tab-node-val",
  };
}

export default function WrapperTable({
  chainConfigData,
  isLoading,
}: {
  chainConfigData: IChainConfig[];
  isLoading: boolean;
}) {
  const [value, setValue] = useState(0);
  const auth = useAuth();

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    if (!auth.isAuthenticated && newValue === 1) {
      return toast.info("Need Login to view your dashboard.", TOAST_PROPS);
    }
    setValue(newValue);
  };

  return (
    <WrapperBox className="container">
      <Box
        sx={{
          marginBottom: 2,
        }}
      >
        <CustomTabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <CustomTab label="Network" {...a11yProps(0)} />
          <CustomTab label="Your Staking Info" {...a11yProps(1)} />
        </CustomTabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <NetworkTable chainConfigData={chainConfigData} isLoading={isLoading} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {auth.isAuthenticated && (
          <SubscribeValidator chainConfigData={chainConfigData} />
        )}
      </CustomTabPanel>
    </WrapperBox>
  );
}
