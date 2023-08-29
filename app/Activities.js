import {
  Button,
  Card,
  Chip,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  DialogFooter,
} from "@material-tailwind/react";
import Members from "./Members";
import PointsTable from "./PointsTable";
import AssignTable from "./AssignTable";
import { useEffect, useReducer, useState } from "react";
import NewActivity from "./NewActivity";
import { getMembers } from "./functions";

function Activities({ loginState, loginDispatch }) {
  function ActivitiesReducer(state, action) {
    switch (action.type) {
      case "setActivities": {
        return { ...state, activities: action.payload };
      }
      case "setCurrentActivity": {
        return { ...state, currentActivity: action.payload };
      }
      case "setError": {
        return { ...state, error: action.payload };
      }
      default:
        throw Error("Unknown action: " + action.type);
    }
  }

  const [activitiesState, activitiesDispatch] = useReducer(ActivitiesReducer, {
    activities: [],
    currentActivity: {},
    error: "",
  });

  useEffect(() => {
    if (loginState.isLogedin) {
      getActivities().then((data) => {
        console.log(data.activities);
        activitiesDispatch({ type: "setActivities", payload: data.activities });
      });
    }
  }, [loginState.isLogedin, loginState.department]);

  async function getActivities() {
    const response = await fetch(
      `http://localhost:9000/api/activities/active/?department=${loginState.department}`
    );
    const data = await response.json();
    activitiesDispatch({ type: "setError", payload: data.error });

    return data;
  }
  async function finishActivity() {
    const response = await fetch(`http://localhost:9000/api/finish-activity/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activity: activitiesState.currentActivity.id,
        department: loginState.department,
        password: loginState.password,
      }),
    });
    try {
      const data = await response.json();
      console.log(data);
      if (data.error) {
        activitiesDispatch({ type: "setError", payload: data.error });
      } else {
        activitiesDispatch({
          type: "setActivities",
          payload: data.activities,
        });
        activitiesDispatch({ type: "setCurrentActivity", payload: {} });
        seteditingActivity(false);
        activitiesDispatch({ type: "setError", payload: "" });
        const members = await getMembers(loginState.department);
        loginDispatch({ type: "setMembers", payload: members.members });
      }
    } catch (e) {
      console.log(e);
    }

    return;
  }

  async function deleteActivity() {
    const response = await fetch(`http://localhost:9000/api/activities/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activity: activitiesState.currentActivity.id,
        department: loginState.department,
        password: loginState.password,
      }),
    });
    try {
      const data = await response.json();
      console.log(data);
      if (data.error) {
        activitiesDispatch({ type: "setError", payload: data.error });
      } else {
        activitiesDispatch({ type: "setActivities", payload: data.activities });
        activitiesDispatch({ type: "setCurrentActivity", payload: {} });
        seteditingActivity(false);
        activitiesDispatch({ type: "setError", payload: "" });
      }
    } catch (e) {
      console.log(e);
    }

    return;
  }
  const [editingActivity, seteditingActivity] = useState(false);

  const [deleteOpen, setdeleteOpen] = useState(false);

  const handledeleteOpen = () => (e) => setdeleteOpen(!deleteOpen);

  return (
    <div className="my-8">
      <h1 className="font-bold text-xl my-4 ">
        {"CURRENT DEPARTMENT : " +
          loginState.department.toUpperCase() +
          " department ".toUpperCase()}
      </h1>
      <div className="my-8">
        <div className="my-4">
          <h1 className="w-full my-2 text-xl font-bold">Current Activities</h1>
          {activitiesState.activities.length === 0 && (
            <p className="my-2"> You don't have any activites yet. </p>
          )}
          <div className="mt-4">
            {activitiesState.activities.length > 0 &&
              activitiesState.activities.map((activity) => {
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
                      activitiesDispatch({
                        type: "setCurrentActivity",
                        payload: activity,
                      });
                      seteditingActivity((s) => !s);
                    }}
                  >
                    {activity.type}: {activity.name} ({activity.points}pts)
                  </Button>
                );
              })}
          </div>
        </div>
        {editingActivity && (
          <div className="fixed  w-screen h-screen  flex left-0 top-0 items-center z-10 justify-center">
            <Card className="flex flex-collumn gap-4 p-4 z-20  h-[90%] w-[80vw] max-w-xl  ">
              <div className="flex flex-wrap w-full gap-2 items-center justify-between p-2">
                <div className="flex  font-bold text-xl gap-2 w-fit  my-2 ms-2">
                  <h1 className="">{activitiesState.currentActivity.name} </h1>
                  <h1 className="font-medium">
                    {activitiesState.currentActivity.type}{" "}
                  </h1>{" "}
                  <Chip
                    className="p-1 h-fit my-1"
                    value={`${activitiesState.currentActivity.points}PTS`}
                  ></Chip>
                </div>
                <div className=" flex gap-2 justify-end">
                  <IconButton
                    variant="outlined"
                    color="red"
                    onClick={(e) => setdeleteOpen(!deleteOpen)}
                  >
                    <svg
                      class="w-4 h-4 text-red-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                    </svg>
                  </IconButton>

                  <Dialog
                    open={deleteOpen}
                    handler={(e) => setdeleteOpen(!deleteOpen)}
                  >
                    <DialogHeader>Are you sure?</DialogHeader>
                    <DialogBody divider>
                      Deleting the activtiy will delete all the points assigned
                      to members that you choose.
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        onClick={(e) => setdeleteOpen(!deleteOpen)}
                        className="mr-1"
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button
                        variant="gradient"
                        color="red"
                        onClick={(e) => {
                          deleteActivity();
                          setdeleteOpen(!deleteOpen);
                        }}
                      >
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      finishActivity();
                    }}
                  >
                    Finish Activity
                  </Button>
                </div>
              </div>
              <div className="  overflow-scroll mb-4 ">
                <AssignTable
                  members={loginState.members}
                  currentActivity={activitiesState.currentActivity}
                  loginState={loginState}
                  activitiesDispatch={activitiesDispatch}
                ></AssignTable>
              </div>

              <div className="flex gap-2 w-full justify-end  ">
                <Button onClick={() => seteditingActivity(false)}>
                  Save And Continue{" "}
                </Button>
              </div>
            </Card>

            <div
              className="bg-black  opacity-80 w-full h-full fixed z-10 "
              onClick={() => seteditingActivity(false)}
            ></div>
          </div>
        )}
        <NewActivity
          loginState={loginState}
          activitiesDispatch={activitiesDispatch}
        ></NewActivity>
      </div>
    </div>
  );
}

export default Activities;
