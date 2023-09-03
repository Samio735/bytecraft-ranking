import { BACKEND_DOMAIN } from "@/config";
import useActivities from "@/hooks/useActivities";
import {
  Button,
  Card,
  Radio,
  Select,
  Input,
  Option,
} from "@material-tailwind/react";
import { useEffect, useReducer, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useContext } from "react";
import { loginContext } from "./page";
import { newActivity } from "./functions";

function calculatePoints(activtity) {
  let points = 0;
  if (activtity.type === "meet") {
    points = 10;
  }
  if (activtity.type === "task") {
    points = 5;
    if (activtity.importance === "important") {
      points = points + 5;
    }
    if (activtity.time === "takes-time") {
      points = points + 5;
    }
    if (activtity.time === "ongoing") {
      points = points + 10;
    }
  }
  if (activtity.type === "part") {
    points = 30;
  }
  return points;
}

function NewActivity() {
  const [loginState] = useContext(loginContext);
  const { activities, isLoading, mutateActivities, error } = useActivities(
    loginState.department
  );
  const [creatingNewActivity, setcreatingNewActivity] = useState(false);
  function NewActivityReducer(state, action) {
    switch (action.type) {
      case "setname": {
        return { ...state, name: action.payload };
      }
      case "setType": {
        return { ...state, type: action.payload };
      }
      case "setError": {
        return { ...state, error: action.payload };
      }
      case "setImportance": {
        return { ...state, importance: action.payload };
      }
      case "setTime": {
        return { ...state, time: action.payload };
      }
      case "setPoints": {
        return { ...state, points: action.payload };
      }
      case "setSending": {
        return { ...state, sending: action.payload };
      }
      case "reset": {
        return {
          name: "",
          type: "",
          importance: "training",
          time: "quick",
          points: 0,
          error: "",
          sending: false,
        };
      }
      default:
        throw Error("Unknown action: " + action.type);
    }
  }
  const [newActivityState, newActivityDispatch] = useReducer(
    NewActivityReducer,
    {
      name: "",
      type: "",
      importance: "training",
      time: "quick",
      points: 0,
      error: "",
      sending: false,
    }
  );

  useEffect(() => {
    newActivityDispatch({
      type: "setPoints",
      payload: calculatePoints(newActivityState),
    });
  }, [
    newActivityState.type,
    newActivityState.importance,
    newActivityState.time,
  ]);

  async function submitNewActivity() {
    if (newActivityState.name === "") {
      newActivityDispatch({
        type: "setError",
        payload: "name is required",
      });
      return;
    }
    if (newActivityState.type === "") {
      newActivityDispatch({
        type: "setError",
        payload: "Type is required",
      });
      return;
    }

    newActivityDispatch({
      type: "setSending",
      payload: true,
    });

    await mutateActivities(
      newActivity(newActivityState, loginState.department, loginState.password),
      { optimisticData: [...activities, newActivityState] }
    );
    setcreatingNewActivity(false);
    newActivityDispatch({ type: "setError", payload: error });
    newActivityDispatch({ type: "reset" });
  }

  return (
    <div>
      {!isLoading && (
        <Button
          className=" w-full "
          onClick={() => setcreatingNewActivity((state) => !state)}
        >
          Create New Activity
        </Button>
      )}
      {isLoading && (
        <div className="w-full h-10 rounded-md bg-gray-400 animate-pulse"></div>
      )}
      {creatingNewActivity && (
        <div className="fixed  w-screen h-screen  flex left-0 top-0 items-center z-10 justify-center">
          <Card className="flex flex-collumn gap-4 p-4  w-[90vw] max-w-lg z-20">
            <h1 className="w-full  my-2 text-xl font-bold">New Activity</h1>
            <Input
              className="mb-4"
              type="text"
              label="name"
              onChange={(e) =>
                newActivityDispatch({
                  type: "setname",
                  payload: e.target.value,
                })
              }
            />

            <div className="">
              <Select
                label="Select Type"
                onChange={(e) =>
                  newActivityDispatch({ type: "setType", payload: e })
                }
              >
                <Option value="meet">Meeting</Option>
                <Option value="task">Task</Option>
                <Option value="part">Event Participation</Option>
              </Select>
            </div>
            {newActivityState.type === "task" && (
              <>
                <div
                  className="flex gap-10"
                  onChange={(e) =>
                    newActivityDispatch({
                      type: "setImportance",
                      payload: e.target.value,
                    })
                  }
                >
                  <Radio
                    name="importance"
                    value={"training"}
                    label="Training"
                    defaultChecked
                  />
                  <Radio
                    name="importance"
                    value={"important"}
                    label="Important +5"
                  />
                </div>

                <div
                  className="flex gap-10"
                  onChange={(e) =>
                    newActivityDispatch({
                      type: "setTime",
                      payload: e.target.value,
                    })
                  }
                >
                  <Radio
                    name="time"
                    value={"quick"}
                    label="Quick"
                    defaultChecked
                  />
                  <Radio
                    name="time"
                    value={"takes-time"}
                    label="Takes Time +5"
                  />
                  <Radio name="time" value={"ongoing"} label="Ongoing +10" />
                </div>
              </>
            )}
            {newActivityState.type === "meet" && (
              <>
                <div
                  className="flex gap-10"
                  onChange={(e) =>
                    newActivityDispatch({
                      type: "setImportance",
                      payload: e.target.value,
                    })
                  }
                >
                  <Radio
                    name="importance"
                    value={"obligatory"}
                    label="Obligatory (-10 to absents)"
                    defaultChecked
                  />
                  <Radio name="importance" value={""} label="Not Obligatory" />
                </div>
              </>
            )}

            <div className="">Activity Points : {newActivityState.points}</div>
            <p className="text-red-400">{newActivityState.error}</p>
            <Button
              className="mb-4"
              disabled={newActivityState.sending}
              onClick={() => submitNewActivity()}
            >
              {!newActivityState.sending && "Create"}
              {newActivityState.sending && (
                <div className="w-full flex justify-center h-full ">
                  <ThreeDots
                    width={"40px"}
                    height={"15px"}
                    color="white"
                  ></ThreeDots>
                </div>
              )}
            </Button>
          </Card>
          <div
            className="bg-black  opacity-80 w-full h-full fixed z-10 "
            onClick={() => {
              newActivityDispatch({ type: "reset" });
              setcreatingNewActivity(false);
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default NewActivity;
