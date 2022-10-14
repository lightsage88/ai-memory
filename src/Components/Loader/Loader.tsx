import { Backdrop, CircularProgress } from "@mui/material";
import { FC } from "react";
import { ILoader } from "../../Interfaces/Loader";

export const Loader: FC<ILoader> = ({ message }) => {
  return (
    <div data-testid="loader-div">
      <Backdrop sx={{ color: "rgba(0,0,0,0.6)" }} open={true}>
        <CircularProgress data-testid="loader-circular-progress" />
        <strong data-testid="loader-message">{message}</strong>
      </Backdrop>
    </div>
  );
};

export default Loader;
