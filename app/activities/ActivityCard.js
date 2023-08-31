import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Chip,
  Card,
} from "@material-tailwind/react";

export default function ActivityCard({ activity }) {
  console.log(activity);
  return (
    <>
      <Card className="my-2 border shadow-sm font-bold p-4">
        <Accordion open>
          <div className="w-full  justify-start text-black flex-wrap gap-2">
            <div className="flex gap-2 mb-2">
              <Chip
                className={`  p-1 h-fit w-fit my-1 ${
                  activity.status === "active"
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
                value={`${activity.status}`}
              ></Chip>{" "}
              <Chip
                className={`  p-1 h-fit w-fit my-1 ${(function () {
                  switch (activity.department) {
                    case "development":
                      return "bg-blue-500";
                    case "design":
                      return "bg-pink-500";
                    case "communication":
                      return "bg-green-500";
                    case "relex-logistics":
                      return "bg-yellow-500";
                    case "multimedia":
                      return "bg-purple-500";
                    default:
                      return "bg-blue-500";
                  }
                })()}`}
                value={`${activity.department}`}
              ></Chip>
            </div>
            <div className="flex gap-2">
              <h4 className="text-xl">
                <span>{activity.type.toUpperCase()} : </span>
                {activity.name.toUpperCase()}
              </h4>
              <span>
                <Chip
                  className="p-1 h-fit w-fit my-1"
                  value={`${activity.points}PTS`}
                ></Chip>
              </span>
            </div>
          </div>

          {activity.members.length > 0 && (
            <AccordionBody className="flex w-full flex-wrap gap-2">
              {activity.members.map((member) => (
                <Chip className="bg-blue-gray-500" value={member.name}></Chip>
              ))}
            </AccordionBody>
          )}
          {activity.members.length == 0 && (
            <AccordionBody className="flex w-full flex-wrap gap-2">
              <Chip className="bg-blue-gray-100" value="No members"></Chip>
            </AccordionBody>
          )}
          <div className="text-sm mt-2 font-medium text-gray-500 flex gap-2">
            <svg
              className="w-4 h-4 mt-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linejoin="round"
                strokeWidth="1.6"
                d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>{" "}
            <span> Created at {activity.date_created}</span>
          </div>
        </Accordion>
      </Card>
    </>
  );
}
