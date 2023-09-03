import { Chip } from "@material-tailwind/react";
function ActivityInfo({ activity }) {
  return (
    <div className="flex  font-bold text-xl gap-2 w-fit  my-2 ms-2">
      <h1 className="">{activity.name} </h1>
      <h1 className="font-medium">{activity.type} </h1>{" "}
      <Chip className="p-1 h-fit my-1" value={`${activity.points}PTS`}></Chip>
    </div>
  );
}

export default ActivityInfo;
