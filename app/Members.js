import PointsTable from "./PointsTable";
import { Card } from "@material-tailwind/react";
import { loginContext } from "./page";
import { useContext } from "react";
import useMembers from "@/hooks/useMembers";

function MembersLeaderboard() {
  const [loginState] = useContext(loginContext);
  const { isLoading, members } = useMembers(loginState.department);
  return (
    <>
      {isLoading && (
        <div className="mt-1 animate-pulse">
          <div className="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-6"></div>

          <div className="flex justify-center items-center mb-6">
            <Card className=" overflow-scroll max-w-2xl w-full  ">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-4 "></div>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-44 "></div>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-700 w-8 ms-16 "></div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {["", "", "", "", "", "", "", "", ""].map((_, index) => {
                    const isLast = index === 9 - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-4 "></div>
                        </td>

                        <td className={classes}>
                          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-44 "></div>
                        </td>

                        <td className={classes}>
                          <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-8 ms-16 "></div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="mt-16">
          <h1 className="w-full  mt-4 mb-4 text-xl font-bold">
            Your Department Rankings
          </h1>

          <div className="flex justify-center items-center mb-6">
            {!isLoading && <PointsTable members={members}></PointsTable>}
          </div>
        </div>
      )}
    </>
  );
}

export default MembersLeaderboard;
