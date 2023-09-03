import React, { useContext } from "react";
import { loginContext } from "./page";
import { Button } from "@material-tailwind/react";
import { finishActivity } from "./functions";

function FinishActivity({ activity }) {
  const [loginState] = useContext(loginContext);
  return (
    <Button
      variant="outlined"
      onClick={() => {
        finishActivity(activity.id, loginState.department, loginState.password);
      }}
    >
      Finish Activity
    </Button>
  );
}

export default FinishActivity;
