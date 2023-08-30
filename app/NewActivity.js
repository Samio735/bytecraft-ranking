import { BACKEND_DOMAIN } from "@/config";
import {
  Button,
  Card,
  Radio,
  Select,
  Input,
  Option,
} from "@material-tailwind/react";
import { useEffect, useReducer, useState } from "react";

function NewActivity({ loginState, activitiesDispatch }) {
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
      case "reset": {
        return {
          name: "",
          type: "",
          importance: "training",
          time: "quick",
          points: 0,
          error: "",
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
    }
  );
  const calculatePoints = () => {
    let points = 0;
    if (newActivityState.type === "meet") {
      points = 10;
    }
    if (newActivityState.type === "task") {
      points = 5;
      if (newActivityState.importance === "important") {
        points = points + 5;
      }
      if (newActivityState.time === "takes-time") {
        points = points + 5;
      }
      if (newActivityState.time === "ongoing") {
        points = points + 10;
      }
    }
    if (newActivityState.type === "part") {
      points = 30;
    }
    return points;
  };
  useEffect(() => {
    newActivityDispatch({ type: "setPoints", payload: calculatePoints() });
  }, [
    newActivityState.type,
    newActivityState.importance,
    newActivityState.time,
  ]);

  async function submit() {
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
      type: "setError",
      payload: "sending",
    });
    const response = await fetch(`${BACKEND_DOMAIN}/activities/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newActivityState.name,
        type: newActivityState.type,
        importance: newActivityState.importance,
        time: newActivityState.time,
        department: loginState.department,
        password: loginState.password,
        members: [],
      }),
    });
    const data = await response.json();
    if (data.error) {
      newActivityDispatch({
        type: "setError",
        payload: data.status,
      });
      return;
    }
    newActivityDispatch({
      type: "setError",
      payload: "Activity Created",
    });
    console.log(data);
    setcreatingNewActivity(false);
    newActivityDispatch({ type: "reset" });
    activitiesDispatch({ type: "setActivities", payload: data.activities });
  }

  return (
    <div>
      <Button
        className=" w-full "
        onClick={() => setcreatingNewActivity((state) => !state)}
      >
        Create New Activity
      </Button>
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

            <div className="">Activity Points : {newActivityState.points}</div>
            <p className="text-red-400">{newActivityState.error}</p>
            <Button className="mb-4" onClick={() => submit()}>
              Create
            </Button>
          </Card>
          <div
            className="bg-black  opacity-80 w-full h-full fixed z-10 "
            onClick={() => setcreatingNewActivity(false)}
          ></div>
        </div>
      )}
    </div>
  );
}

export default NewActivity;
