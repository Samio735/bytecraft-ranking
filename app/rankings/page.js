import { BACKEND_DOMAIN } from "@/config";
import Table from "./Table";

async function Members() {
  let members = [];

  const response = await fetch(`${BACKEND_DOMAIN}/all/`, {
    cache: "no-store",
  });
  members = await response.json();
  console.log(members.members);
  return (
    <div className="w-full">
      <h1 className="w-full text-center my-8 text-xl font-bold">
        Bytecraft Members Leaderboard
      </h1>
      <Table members={members.members} />
    </div>
  );
}

export default Members;
