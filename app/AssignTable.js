import { BACKEND_DOMAIN } from "@/config";
import { Card, Switch, Typography } from "@material-tailwind/react";
import { useEffect } from "react";

function AssignTable({
  members,
  currentActivity,
  loginState,
  activitiesDispatch,
}) {
  const TABLE_HEAD = ["Assign the acitvity to members", ""];

  async function assignMember(MemberId, ActivityId) {
    activitiesDispatch({ type: "setisLoading", payload: true });
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
    const data = await response.json();
    activitiesDispatch({ type: "setisLoading", payload: false });

    if (data.error) {
      activitiesDispatch({ type: "setError", payload: data.error });
    }

    activitiesDispatch({ type: "setActivities", payload: data.activities });
    activitiesDispatch({ type: "setCurrentActivity", payload: data.activity });
  }

  async function unassignMember(MemberId, ActivityId) {
    activitiesDispatch({ type: "setisLoading", payload: true });

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
    activitiesDispatch({ type: "setisLoading", payload: false });
    const data = await response.json();

    activitiesDispatch({ type: "setActivities", payload: data.activities });
    activitiesDispatch({ type: "setError", payload: "" });
    activitiesDispatch({ type: "setCurrentActivity", payload: data.activity });
    if (data.error) {
      activitiesDispatch({ type: "setError", payload: data.error });
    }
  }

  return (
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
        <tbody className="">
          {members.map(({ name, id }, index) => {
            const isLast = index === members.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const isAssigned =
              currentActivity.members.filter((member) => member.id === id)
                .length > 0;
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
                        ? assignMember(id, currentActivity.id)
                        : unassignMember(id, currentActivity.id);
                    }}
                  ></Switch>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

export default AssignTable;
