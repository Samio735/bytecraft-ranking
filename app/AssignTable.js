import { BACKEND_DOMAIN } from "@/config";
import useMembers from "@/hooks/useMembers";
import { Card, Switch, Typography } from "@material-tailwind/react";
import { useContext } from "react";
import { loginContext } from "./page";
import useActivities from "@/hooks/useActivities";

function AssignTable({ editingActivity, setEditingActivity }) {
  const [loginState] = useContext(loginContext);
  const {
    members,
    error,
    isLoading: membersIsLoading,
  } = useMembers(loginState.department);
  const { mutateActivities } = useActivities(loginState.department);
  const TABLE_HEAD = ["Assign the acitvity to members", ""];

  async function assignMember(MemberId, ActivityId) {
    const response = await fetch(`${BACKEND_DOMAIN}/assign-member/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        member: MemberId,
        activity: ActivityId,
        department: loginState.department,
        password: loginState.password,
      }),
    });
    mutateActivities();
    const data = await response.json();
    setEditingActivity({ ...editingActivity, activity: data.activity });
  }

  async function unassignMember(MemberId, ActivityId) {
    const response = await fetch(`${BACKEND_DOMAIN}/unassign-member/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        member: MemberId,
        activity: ActivityId,
        department: loginState.department,
        password: loginState.password,
      }),
    });
    mutateActivities();
    const data = await response.json();

    setEditingActivity({ ...editingActivity, activity: data.activity });
  }

  return (
    <div className="  rounded-md  overflow-scroll mb-4 ">
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
                const isAssigned =
                  editingActivity.activity.members.filter(
                    (member) => member.id === id
                  ).length > 0;
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
                        checked={isAssigned}
                        onChange={() => {}}
                        onClick={() => {
                          !isAssigned
                            ? assignMember(id, editingActivity.activity.id)
                            : unassignMember(id, editingActivity.activity.id);
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
    </div>
  );
}

export default AssignTable;
