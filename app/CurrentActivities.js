"use client";
import { Button } from "@material-tailwind/react";
import useSWR from "swr";
import { loginContext } from "./page";
import { useContext } from "react";
import useActivities from "@/hooks/useActivities";

function CurrentActivities({ setEditingActivity }) {
  const [loginState, loginDispatch] = useContext(loginContext);
  const { activities, isLoading, isError } = useActivities(
    loginState.department
  );

  return (
    <div>
      {isLoading && (
        <div className="my-4">
          <div className="mt-4">
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-6"></div>
              <div className="h-6 ms-4  bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-4"></div>
              <div className="h-6 ms-4  bg-gray-200 rounded-full dark:bg-gray-700 max-w-[260px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="my-4">
          <h1 className="w-full my-2 text-xl font-bold">Current Activities</h1>
          {activities?.length === 0 && (
            <p className="my-2"> You don't have any activites yet. </p>
          )}
          <div className="mt-4">
            {activities?.length > 0 &&
              activities?.map((activity) => {
                function chooseColor(type) {
                  switch (type) {
                    case "task":
                      return "green";
                    case "meet":
                      return "blue";
                    case "event":
                      return "pink";
                    default:
                      return "blue";
                  }
                }
                const color = chooseColor(activity.type);
                const classes = `mb-4 py-2 mx-2 hover:bg-${color}-600 hover:text-black shadow-none shadow-${color}-600 hover:shadow-${color}-600 bg-white text-${color}-600 border-${color}-600 border-2`;

                return (
                  <Button
                    className={classes}
                    key={activity.id}
                    onClick={() => {
                      setEditingActivity({
                        isOpen: true,
                        activity: activity,
                      });
                    }}
                  >
                    {activity.type}: {activity.name} ({activity.points}pts)
                  </Button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentActivities;
