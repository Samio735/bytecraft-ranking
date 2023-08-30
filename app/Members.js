import PointsTable from "./PointsTable";

function MembersLeaderboard({ loginState }) {
  return (
    <div className="mt-16">
      <h1 className="w-full  mt-4 mb-4 text-xl font-bold">
        Your Department Rankings
      </h1>
      <div className="flex justify-center items-center mb-6">
        {!loginState.membersLoading && (
          <PointsTable members={loginState.members}></PointsTable>
        )}
      </div>
    </div>
  );
}

export default MembersLeaderboard;
