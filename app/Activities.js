import { useEffect, useReducer, useState } from "react";
import NewActivity from "./NewActivity";
import { getMembers } from "./functions";
import { BACKEND_DOMAIN } from "@/config";
import useSWR from "swr";
import { getActivities } from "./functions";
import CurrentActivities from "./CurrentActivities";
import { useActivities } from "../hooks/useActivities";
import { loginContext } from "./page";
import { useContext } from "react";
import EditingActivity from "./EditingActivity";

function Activities() {
  const [loginState] = useContext(loginContext);
  const [editingActivity, setEditingActivity] = useState({
    activity: {},
    isOpen: false,
  });
  return (
    <div className="my-8">
      <h1 className="font-bold text-xl my-4 ">
        {"CURRENT DEPARTMENT : " +
          loginState.department.toUpperCase() +
          " department ".toUpperCase()}
      </h1>
      <div className="my-8">
        <CurrentActivities setEditingActivity={setEditingActivity} />
        {editingActivity.isOpen && (
          <EditingActivity
            editingActivity={editingActivity}
            setEditingActivity={setEditingActivity}
          />
        )}
        <NewActivity />
      </div>
    </div>
  );
}

export default Activities;
