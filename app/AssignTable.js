import { BACKEND_DOMAIN } from "@/config";
import useMembers from "@/hooks/useMembers";
import { Card, Switch, Typography, Button } from "@material-tailwind/react";
import { useContext } from "react";
import { loginContext } from "./page";
import useActivities from "@/hooks/useActivities";
import { assignMember, checkIsAssigned, unassignMember } from "./functions";
import { useEffect, useState } from "react";
import useActivity from "@/hooks/useActivity";
import { ThreeDots } from "react-loader-spinner";

function AssignTable({ editingActivity, setEditingActivity }) {
  const [loginState] = useContext(loginContext);
  const {
    members,
    error,
    isLoading: membersIsLoading,
  } = useMembers(loginState.department);
  const { mutateActivities, activities } = useActivities(loginState.department);
  const { activity, mutateActivity, isLoading } = useActivity(
    editingActivity.activity.id
  );
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    console.log("render");
    console.log(activity);
  });

  async function submitAssignMember(memberId, isAssigned) {
    console.log("submitAssignMember");
    console.log(isAssigned);
    console.log(activity);
    setIsSaving(true);
    if (isAssigned === true) {
      await mutateActivity(
        unassignMember(
          memberId,
          editingActivity.activity.id,
          loginState.department,
          loginState.password
        ),
        {
          optimisticData: {
            ...activity,
            members: activity.members.filter(
              (member) => member.id !== memberId
            ),
          },
        }
      );
    } else {
      await mutateActivity(
        assignMember(
          memberId,
          editingActivity.activity.id,
          loginState.department,
          loginState.password
        ),
        {
          optimisticData: {
            ...activity,
            members: [...activity.members, { id: memberId }],
          },
        }
      );
    }

    setIsSaving(false);
    mutateActivities();

    setEditingActivity({
      isOpen: true,
      activity: activities.find(
        (activity) => activity.id === editingActivity.activity.id
      ),
    });
  }

  const TABLE_HEAD = ["Assign the acitvity to members", ""];

  return (
    <>
      <div className="  rounded-md  overflow-scroll mb-4 ">
        {isLoading && (
          <Card className="  max-w-xl  ">
            <table className="w-full  table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["", ""].map((_, index) => {
                  const isLast = index === 2 - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <div className="h-6 bg-gray-200 rounded-full animate pulse dark:bg-gray-700 w-40 "></div>
                      </td>

                      <td className={classes}>
                        <div className="h-6 bg-gray-200 rounded-full animate pulse dark:bg-gray-700 w-8 ms-16 "></div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        )}
        {!isLoading && (
          <Card className="  max-w-xl  ">
            <table className="w-full  table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              {membersIsLoading && (
                <tbody>
                  {["", ""].map((_, index) => {
                    const isLast = index === 2 - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-4 "></div>
                        </td>

                        <td className={classes}>
                          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-8 ms-16 "></div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
              {error && (
                <tbody>
                  <tr>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {error}
                      </Typography>
                    </td>
                  </tr>
                </tbody>
              )}
              {!membersIsLoading && !error && (
                <tbody className="">
                  {members.map(({ name, id }, index) => {
                    const isLast = index === members.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";
                    let isAssigned = checkIsAssigned(id, activity);
                    if (id === 57) {
                      console.log(isAssigned);
                    }
                    return (
                      <tr key={id}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <Switch
                            checked={checkIsAssigned(id, activity)}
                            onChange={() => {
                              isAssigned = !isAssigned;
                              submitAssignMember(id, !isAssigned);
                            }}
                          ></Switch>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </Card>
        )}
      </div>
      <div className="flex gap-2 w-full justify-end  ">
        <Button
          onClick={() => setEditingActivity({ isOpen: false, activity: {} })}
        >
          {!isSaving && "SAVE AND CONTINUE"}{" "}
          {isSaving && (
            <div className="w-32 flex justify-center h-full ">
              <ThreeDots
                width={"40px"}
                height={"15px"}
                color="white"
              ></ThreeDots>
            </div>
          )}
        </Button>
      </div>
    </>
  );
}

export default AssignTable;
