"use client";
import { useReducer } from "react";
import Login from "./Login";
import Activities from "./Activities";
import MembersLeaderboard from "./Members";

function page() {
  const LoginReducer = (state, action) => {
    switch (action.type) {
      case "setDepartment": {
        return { ...state, department: action.payload };
      }
      case "setPassword": {
        return { ...state, password: action.payload };
      }
      case "setIsLogedin": {
        return { ...state, isLogedin: action.payload };
      }
      case "setError": {
        return { ...state, error: action.payload };
      }
      case "setMembers": {
        return { ...state, members: action.payload };
      }
      case "setMembersLoading":
        {
          return { ...state, membersLaoding: action.payload };
        }

        throw Error("Unknown action: " + action.type);
    }
  };
  const [loginState, loginDispatch] = useReducer(LoginReducer, {
    isLogedin: false,
    department: "development",
    password: "",
    error: "",
    members: [],
    membersLaoding: false,
  });
  const ActivitiesReducer = (state, action) => {
    switch (action.type) {
      case "setActivities": {
        return { ...state, activities: action.payload };
      }
    }
  };
  const [activitiesState, activitiesDispatch] = useReducer(ActivitiesReducer, {
    activities: [],
  });

  return (
    <div className="m-4 flex w-full flex-col items-center ">
      <div className="max-w-2xl  w-full">
        <div></div>
        {!loginState.isLogedin && (
          <Login
            loginDispatch={loginDispatch}
            loginState={loginState}
            LoginReducer={LoginReducer}
          ></Login>
        )}
        {loginState.isLogedin && (
          <>
            <Activities
              loginState={loginState}
              loginDispatch={loginDispatch}
            ></Activities>

            {!loginState.membersLaoding && (
              <MembersLeaderboard loginState={loginState}></MembersLeaderboard>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default page;
