import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { updateUserStakingInfo } from "../../apis/chains";
import { toast } from "react-toastify";
import { TOAST_PROPS } from "../../constants/toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#1f1f1f",
  boxShadow: 24,
  p: 4,
};

interface IBasicModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  chain: string;
}

export default function BasicModal({ open, setOpen, chain }: IBasicModalProps) {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const handleClose = () => setOpen(false);

  const handleSubscribe = async (e: SyntheticEvent) => {
    let responseUpdateConfig;
    try {
      e.preventDefault();
      if (chain) {
        setLoading(true);
        responseUpdateConfig = await updateUserStakingInfo(address, chain);

        setLoading(false);
        toast.success("Subscribe Address successfully!", TOAST_PROPS);
        handleClose();
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(
        responseUpdateConfig?.response?.data?.message ??
          error?.message ??
          "Something went wrong!",
        TOAST_PROPS
      );
    }
  };

  useEffect(() => {
    setAddress("");
    setLoading(false);
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon sx={{ fill: "white" }} />
        </IconButton>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ paddingBottom: "40px", textAlign: "center", color: "#ed7130" }}
        >
          Subscribe Address
        </Typography>
        <FormControl
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "#ed7130 !important", // Set underline color before focus
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "#ed7130 !important", // Set underline color on hover
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#ed7130 !important", // Set underline color after focus
            },
            width: "100%",
          }}
        >
          <InputLabel
            htmlFor="address-val"
            sx={{
              color: "white",
              "&.Mui-focused": {
                color: "#ed7130 !important",
              },
              left: "-15px",
            }}
          >
            Your address
          </InputLabel>
          <Input
            id="address-val"
            aria-describedby="my-helper-text"
            autoComplete="off"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{
              color: "white", // Set the input text color to white
              "& .MuiInputBase-input": {
                color: "white", // Ensure the text inside the input is white
              },
              "&::placeholder": {
                color: "white", // Set the placeholder text color to white
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: "#ed7130 !important", // Set underline color before focus
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "#ed7130 !important", // Set underline color on hover
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#ed7130 !important", // Set underline color after focus
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              margin: "40px 0px 20px 0px",
              color: "#fff",
              background: "#ed7130",

              "&.Mui-disabled": {
                background: "#ed7130",
                opacity: 0.8,
              },
            }}
            onClick={handleSubscribe}
            disabled={loading}
          >
            <Box sx={{ marginRight: "12px", color: "#fff" }}>Subscribe</Box>
            {loading && (
              <Box sx={{ width: "24px", height: "24px" }}>
                <CircularProgress
                  sx={{
                    width: "24px !important",
                    height: "24px !important",
                    color: "#fff",
                  }}
                />
              </Box>
            )}
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
}
