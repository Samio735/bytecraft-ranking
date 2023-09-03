"use client";
import { useReducer, createContext, useContext } from "react";
import Login from "./Login";
import Activities from "./Activities";
import MembersLeaderboard from "./Members";
import { BACKEND_DOMAIN } from "@/config";
import Dashboard from "./Dashboard";
export const loginContext = createContext({
  isLogedin: false,
  department: "development",
  password: "",
  error: "",
});

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
      case "setError":
        {
          return { ...state, error: action.payload };
        }

        throw Error("Unknown action: " + action.type);
    }
  };

  const useLoginReducer = useReducer(LoginReducer, {
    isLogedin: false,
    department: "development",
    password: "",
    error: "",
  });

  return (
    <div className="m-4 flex w-full flex-col items-center ">
      <div className="max-w-2xl  w-full">
        <div></div>
        <loginContext.Provider value={useLoginReducer}>
          <Dashboard />
        </loginContext.Provider>
      </div>
    </div>
  );
}

export default page;
