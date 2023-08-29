import Table from "./Table";

async function Members() {
  let activities = [];
  try {
    const response = await fetch(`http://127.0.0.1:9000/api/activities`, {
      cache: "no-store",
    });
    activities = await response.json();
  } catch (e) {
    console.log(e);
  }

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
