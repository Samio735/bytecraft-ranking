import Table from "./Table";

async function Members() {
  let members = [];

  const response = await fetch(`http://127.0.0.1:9000/api/all/`, {
    cache: "no-store",
  });
  members = await response.json();

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
