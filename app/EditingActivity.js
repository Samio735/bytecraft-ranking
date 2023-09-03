import { Button, Card } from "@material-tailwind/react";
import { ThreeDots } from "react-loader-spinner";

import { useState } from "react";
import AssignTable from "./AssignTable";
import ActivityInfo from "./ActivityInfo";
import DeleteActivtiy from "./DeleteActivtiy";
import FinishActivity from "./finishActivity";

function EditingActivity({ editingActivity, setEditingActivity }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="fixed  w-screen h-screen  flex left-0 top-0 items-center z-10 justify-center">
        <Card className="flex flex-collumn gap-4 p-4 z-20  h-[90%] w-[80vw] max-w-xl  ">
          <div className="flex flex-wrap w-full gap-2 items-center justify-between p-2">
            <div className=" flex gap-2 justify-end">
              <ActivityInfo activity={editingActivity.activity} />
            </div>
            <div className="flex gap-2 justify-end">
              <DeleteActivtiy
                activity={editingActivity.activity}
                setEditingActivity={setEditingActivity}
              />
              <FinishActivity
                activity={editingActivity.activity}
                setEditingActivity={setEditingActivity}
              />
            </div>
          </div>

          <AssignTable
            setEditingActivity={setEditingActivity}
            editingActivity={editingActivity}
          />
        </Card>

        <div
          className="bg-black  opacity-80 w-full h-full fixed z-10 "
          onClick={() => setEditingActivity({ isOpen: false, activity: {} })}
        ></div>
      </div>
    </>
  );
}

export default EditingActivity;
