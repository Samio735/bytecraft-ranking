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
import { getMembers, login } from "./functions";
import { loginContext } from "./page";
import { useContext } from "react";
function Login() {
  const [loginState, loginDispatch] = useContext(loginContext);
  const [isLoading, setIsLoading] = useState(false);
  async function loginSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await login(loginState.department, loginState.password);
    if (response.isLogedin) {
      loginDispatch({ type: "setIsLogedin", payload: true });
    }
    if (response.error) {
      loginDispatch({ type: "setError", payload: response.error });
    }
    setIsLoading(false);
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
            <Option value="game-dev">Game Dev</Option>
            <Option value="uiux">UI/UX</Option>
            <Option value="activities">Activties</Option>
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
              loginSubmit(e);
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
    </div>
  );
}

export default Login;
