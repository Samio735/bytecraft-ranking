"use client";
import { useState } from "react";
import { useContext } from "react";
import { loginContext } from "./page";
import { deleteActivity } from "./functions";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  DialogFooter,
} from "@material-tailwind/react";
import useActivities from "@/hooks/useActivities";
import { ThreeDots } from "react-loader-spinner";
function DeleteActivtiy({ activity, setEditingActivity }) {
  const [loginState] = useContext(loginContext);
  const [deleteOpen, setdeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateActivities } = useActivities(loginState.department);
  async function submitDelete(id, department, password) {
    setIsLoading(true);
    await mutateActivities(deleteActivity(id, department, password));
    setIsLoading(false);
    setdeleteOpen(!deleteOpen);
    setEditingActivity({ isOpen: false, activity: {} });
  }

  return (
    <>
      <IconButton
        variant="outlined"
        color="red"
        onClick={(e) => setdeleteOpen(!deleteOpen)}
      >
        <svg
          className="w-4 h-4 text-red-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
        </svg>
      </IconButton>

      <Dialog open={deleteOpen} handler={(e) => setdeleteOpen(!deleteOpen)}>
        <DialogHeader>Are you sure?</DialogHeader>
        <DialogBody divider>
          Deleting the activtiy will delete all the points assigned to members
          that you choose.
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
              submitDelete(
                activity.id,
                loginState.department,
                loginState.password
              );
            }}
          >
            {!isLoading && <span>Confirm</span>}
            {isLoading && (
              <div className="w-32 flex justify-center h-full ">
                <ThreeDots
                  width={"40px"}
                  height={"15px"}
                  color="white"
                ></ThreeDots>
              </div>
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default DeleteActivtiy;
