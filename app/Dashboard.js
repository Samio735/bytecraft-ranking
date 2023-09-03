import React, { useContext } from "react";
import { loginContext } from "./page";
import Login from "./Login";
import Activities from "./Activities";
import MembersLeaderboard from "./Members";

function Dashboard() {
  const [loginState, loginDispatch] = useContext(loginContext);

  return (
    <div>
      {!loginState.isLogedin && <Login></Login>}
      {loginState.isLogedin && (
        <>
          <Activities></Activities>
          <MembersLeaderboard></MembersLeaderboard>
        </>
      )}
    </div>
  );
}

export default Dashboard;
