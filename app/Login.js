"use client";
import { BACKEND_DOMAIN } from "@/config";
import {
  Button,
  Card,
  Checkbox,
  Option,
  Select,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useReducer, useState } from "react";

function Login({ loginDispatch, loginState, LoginReducer }) {
  const [isLoading, setIsLoading] = useState(false);

  async function login() {
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
    setIsLoading(true);
    // wait 3 seconds

    const data = await response.json();
    setIsLoading(false);
    if (data.isLogedin) {
      loginDispatch({ type: "setIsLogedin", payload: true });
    }
    if (!data.isLogedin) {
      loginDispatch({ type: "setIsLogedin", payload: false });
      loginDispatch({ type: "setError", payload: data.error });
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
            type="submit"
            className="mt-4"
            onClick={(e) => {
              login();
              e.preventDefault();
            }}
          >
            {!isLoading && "Login"} {isLoading && "loading"}
          </Button>
        </Card>
      </form>
      {loginState.isLogedin && "logedin"}
    </div>
  );
}

export default Login;
