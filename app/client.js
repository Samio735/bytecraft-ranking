"use client";

import { Slider } from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";

export function RangePanel() {
  const [value, setValue] = useState(50);
  return (
    <>
      <div className="w-[300px] lg:w-[430px] bg-gradient-to-r from-lightBlue to-lightPurple text-2xl font-semibold p-2 pb-3 rounded-lg mb-2 lg:mb-6">
        <div className="px-4 py-6 lg:px-7 lg:py-10 z-20">
          <Slider
            defaultValue={25}
            value={value}
            max={95}
            onChange={(e) => setValue(e.target.value)}
            className="text-blue-gray-900 block lg:hidden  z-20 "
            barClassName="bg-blue-gray-900  "
            trackClassName="[&::-webkit-slider-runnable-track]:bg-white"
            thumbClassName="[&::-moz-slider-thumb]:text-blue-gray-900 [&::-moz-slider-thumb]:lg:scale-50"
          />
          <Slider
            defaultValue={25}
            value={value}
            max={95}
            size="lg"
            onChange={(e) => setValue(e.target.value)}
            className="text-blue-gray-900 hidden lg:block "
            barClassName="bg-blue-gray-900  "
            trackClassName="[&::-webkit-slider-runnable-track]:bg-white"
            thumbClassName="[&::-moz-slider-thumb]:text-blue-gray-900 [&::-moz-slider-thumb]:lg:scale-50"
          />
        </div>
        <div className="grid grid-cols-2 text-center lg:text-4xl items-center justify-between">
          {" "}
          <span className="bg-white py-2 px-4 lg:mx-2 lg:my-1 rounded-md">
            {Math.floor(50 + value * 10)}
          </span>
          <span className="z-20">
            <Link href={"order"}>Next</Link>
          </span>
        </div>
      </div>
      <p className="font-normal lg:text-xl">
        Margin of error {Math.round(10 - value / 10)}%
      </p>
    </>
  );
}
