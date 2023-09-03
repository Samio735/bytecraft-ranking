import React, { useContext } from "react";
import { loginContext } from "./page";
import { Button } from "@material-tailwind/react";
import { finishActivity } from "./functions";
import useActivities from "@/hooks/useActivities";
import { ThreeDots } from "react-loader-spinner";

function FinishActivity({ activity, setEditingActivity }) {
  const [loginState] = useContext(loginContext);
  const { mutateActivities } = useActivities(loginState.department);
  const [isFinishing, setIsFinishing] = React.useState(false);

  async function submitFinishActivity(id, department, password) {
    console.log("submitFinishActivity");
    setIsFinishing(true);
    await mutateActivities(finishActivity(id, department, password));
    setIsFinishing(false);
    setEditingActivity({ isOpen: false, activity: {} });
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        submitFinishActivity(
          activity.id,
          loginState.department,
          loginState.password
        );
      }}
    >
      {isFinishing && (
        <ThreeDots width={"40px"} height={"15px"} color="black"></ThreeDots>
      )}
      {!isFinishing && "Finish Activity"}
    </Button>
  );
}

export default FinishActivity;
