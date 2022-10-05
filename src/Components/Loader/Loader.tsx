import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";
import { ILoader } from "../../Interfaces/Loader";

export const Loader: FC<ILoader> = ({message}) => {
  return (
    <Backdrop sx={{ color: "rgba(0,0,0,0.6)" }} open={true}>
      <CircularProgress />
      <strong>{message}</strong>
    </Backdrop>
  );
};

export default Loader;
