import { BACKEND_DOMAIN } from "@/config";
import Table from "./Table";

async function Members() {
  let activities = [];
  try {
    const response = await fetch(`${BACKEND_DOMAIN}/activities`, {
      cache: "no-store",
    });
    activities = await response.json();
  } catch (e) {}

  return (
    <div className="w-full">
      <h1 className="w-full text-center my-8 text-xl font-bold">
        All activities
      </h1>
      <Table activities={activities.activities} />
    </div>
  );
}

export default Members;
