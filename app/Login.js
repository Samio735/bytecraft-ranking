"use client";
import { BACKEND_DOMAIN } from "@/config";
import {
  Button,
  Card,
  Option,
  Select,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { getMembers } from "./functions";

function Login({ loginDispatch, loginState }) {
  const [isLoading, setIsLoading] = useState(false);

  async function login() {
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_DOMAIN}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          department: loginState.department,
          password: loginState.password,
        }),
      });

      const data = await response.json();
      console.log(data);
      setIsLoading(false);

      if (data.isLogedin) {
        loginDispatch({ type: "setIsLogedin", payload: true });
        loginDispatch({ type: "setMembersLoading", payload: true });
        const members = await getMembers(loginState.department);
        loginDispatch({ type: "setMembers", payload: members.members });
        loginDispatch({ type: "setMembersLoading", payload: false });
      }
      if (!data.isLogedin) {
        loginDispatch({ type: "setIsLogedin", payload: false });
        loginDispatch({ type: "setError", payload: data.error });
      }
    } catch (error) {
      loginDispatch({
        type: "setError",
        payload: "Oups, Can't connect to sever",
      });
      setIsLoading(false);
    }
  }
  return (
    <div>
      <form className="h-[80vh] flex items-center justify-center">
        <Card className="max-w-xl w-full   my-8 p-4 gap-8 px-8 py-8">
          <Typography className="py-4 font-bold text-lg">
            Login to your department
          </Typography>

          <Select
            label="Select Department"
            onChange={(e) =>
              loginDispatch({ type: "setDepartment", payload: e })
            }
          >
            <Option value="development">Development</Option>
            <Option value="design">Design</Option>
            <Option value="communication">Communcation</Option>
            <Option value="relex-logistics">Relex and logistics</Option>
            <Option value="multimedia">Multimedia</Option>
          </Select>
          <Input
            label="password"
            type="password"
            onChange={(e) =>
              loginDispatch({ type: "setPassword", payload: e.target.value })
            }
          ></Input>
          {loginState.error && (
            <p className="text-red-400">{loginState.error}</p>
          )}
          <Button
            disabled={isLoading}
            type="submit"
            className="mt-4"
            onClick={(e) => {
              login();
              e.preventDefault();
            }}
          >
            {!isLoading && "Login"}{" "}
            {isLoading && (
              <div className="w-full flex justify-center h-full ">
                <ThreeDots
                  width={"40px"}
                  height={"15px"}
                  color="white"
                ></ThreeDots>
              </div>
            )}
          </Button>
        </Card>
      </form>
      {loginState.isLogedin && "logedin"}
    </div>
  );
}

export default Login;
