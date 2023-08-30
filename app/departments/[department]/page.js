import { capitalizeFirstLetters } from "@/app/functions";
import Table from "./Table";
import { BACKEND_DOMAIN } from "@/config";

async function Members({ params }) {
  let members = [];

  const response = await fetch(
    `${BACKEND_DOMAIN}/members/?department=${params.department}`,
    {
      cache: "no-store",
    }
  );
  members = await response.json();

  return (
    <div className="w-full">
      <h1 className="w-full text-center my-8 text-xl font-bold">
        {capitalizeFirstLetters(params.department + " Members Leaderboard")}
      </h1>
      <Table members={members.members} />
    </div>
  );
}

export default Members;
