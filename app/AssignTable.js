import { Card, Checkbox, Switch, Typography } from "@material-tailwind/react";
import { useEffect } from "react";

function AssignTable({
  members,
  currentActivity,
  loginState,
  activitiesDispatch,
}) {
  const TABLE_HEAD = ["Assign the acitvity to members", ""];

  async function assignMember(MemberId, ActivityId) {
    const response = await fetch(`http://localhost:9000/api/assign-member/`, {
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

    if (data.error) {
      activitiesDispatch({ type: "setError", payload: data.error });
    }

    activitiesDispatch({ type: "setActivities", payload: data.activities });
    activitiesDispatch({ type: "setCurrentActivity", payload: data.activity });
  }

  async function unassignMember(MemberId, ActivityId) {
    const response = await fetch(`http://localhost:9000/api/unassign-member/`, {
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
    activitiesDispatch({ type: "setError", payload: "processing.." });
    const data = await response.json();
    console.log(data);
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
          {members.map(({ name, points, id }, index) => {
            const isLast = index === members.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
            const isAssigned = currentActivity.members.includes(id);
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