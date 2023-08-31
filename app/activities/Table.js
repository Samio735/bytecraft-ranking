"use client";
import { Card, Typography } from "@material-tailwind/react";
import AcitivtyCard from "./ActivityCard";

function Table({ activities }) {
  console.log(activities);
  return (
    <div className="flex justify-center items-center mb-6">
      <div className=" overflow-scroll max-w-2xl w-full mx-2 ">
        {activities.map((activity, index) => {
          return <AcitivtyCard activity={activity}></AcitivtyCard>;
        })}
      </div>
    </div>
  );
}

export default Table;
