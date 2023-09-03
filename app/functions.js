import { BACKEND_DOMAIN } from "@/config";

export function capitalizeFirstLetters(str) {
  return str
    .split(" ")
    .map((word) => {
      if (word.length > 0) {
        return word[0].toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}

export async function getMembers(key) {
  const response = await fetch(`${BACKEND_DOMAIN}${key}`);
  const data = await response.json();
  return data.members;
}

export async function getActivities(key) {
  const response = await fetch(`${BACKEND_DOMAIN}${key}`);
  const data = await response.json();
  return data.activities;
}

export async function login(department, password) {
  const response = await fetch(`${BACKEND_DOMAIN}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      department,
      password,
    }),
  });
  const data = await response.json();
  return data;
}

export async function deleteActivity(id, department, password) {
  const response = await fetch(`${BACKEND_DOMAIN}/activities/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activity: id,
      department: department,
      password: password,
    }),
  });
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }

  return;
}

export async function finishActivity(id, department, password) {
  const response = await fetch(`${BACKEND_DOMAIN}/finish-activity/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activity: id,
      department: department,
      password: password,
    }),
  });
  try {
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }

  return;
}
