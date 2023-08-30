"use client";

import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemSuffix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  IconButton,
} from "@material-tailwind/react";
import Link from "next/link";

function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [openNav, setOpenNav] = React.useState(false);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div>
      <IconButton
        className={`2xl:hidden fixed  left-6 top-6 ${
          openNav && "rotate-90"
        }  z-50 p-4`}
        onClick={() => setOpenNav(!openNav)}
      >
        <svg
          class="w-6 h-text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </IconButton>

      <Card
        className={`h-[calc(100vh-2rem)]   ${
          !openNav && "-translate-x-[70vw]"
        } 2xl:translate-x-0 w-full  fixed max-w-[20rem] p-4 shadow-xl    z-40   shadow-blue-gray-900/5`}
      >
        <div className="mb-2 p-4  hidden 2xl:block">
          <Typography variant="h5" color="blue-gray">
            Bytecraft
          </Typography>
        </div>
        <List className=" 2xl:block">
          <Link href={"/"}>
            <ListItem>Dashboard</ListItem>
          </Link>
          <Link href={"/rankings"}>
            <ListItem>General Leaderboard</ListItem>
          </Link>

          <Accordion open={open === 1}>
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Departments
                </Typography>
                <ListItemSuffix>
                  <svg
                    className={`w-4 h-4 text-gray-800 dark:text-white transition-transform ${
                      open === 1 ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 8"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                    />
                  </svg>
                </ListItemSuffix>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                <Link href={"/departments/development"}>
                  <ListItem>Development</ListItem>
                </Link>
                <Link href={"/departments/design"}>
                  <ListItem>Design</ListItem>
                </Link>
                <Link href={"/departments/communication"}>
                  <ListItem>Communcation</ListItem>
                </Link>
                <Link href={"/departments/relex-logistics"}>
                  <ListItem>Relex and Logistics</ListItem>
                </Link>
                <Link href={"/departments/multimedia"}>
                  <ListItem>Multimedia</ListItem>
                </Link>
              </List>
            </AccordionBody>
          </Accordion>
          <Link href={"/activities"}>
            <ListItem>Activity history</ListItem>
          </Link>
        </List>
      </Card>
    </div>
  );
}

export default Sidebar;
