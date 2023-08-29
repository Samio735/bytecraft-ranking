"use client";
import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Link from "next/link";

function Sidebar() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div>
      <div className="lg:w-[10vw]"></div>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl   hidden lg:block fixed shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Bytecraft
          </Typography>
        </div>
        <List>
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
