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

export async function getActivity(key) {
  const response = await fetch(`${BACKEND_DOMAIN}${key}`);
  const data = await response.json();
  return data.activity;
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
    return data.activities;
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
    return data.activities;
  } catch (e) {
    console.log(e);
  }

  return;
}

export async function newActivity(activity, department, password) {
  const response = await fetch(`${BACKEND_DOMAIN}/activities/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: activity.name,
      type: activity.type,
      importance: activity.importance,
      time: activity.time,
      department: department,
      password: password,
      members: [],
    }),
  });
  const data = await response.json();
  return data.activities;
}

export async function assignMember(MemberId, ActivityId, department, password) {
  const response = await fetch(`${BACKEND_DOMAIN}/assign-member/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member: MemberId,
      activity: ActivityId,
      department: department,
      password: password,
    }),
  });
  const data = await response.json();
  return data.activity;
}

export async function unassignMember(
  MemberId,
  ActivityId,
  department,
  password
) {
  const response = await fetch(`${BACKEND_DOMAIN}/unassign-member/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member: MemberId,
      activity: ActivityId,
      department: department,
      password: password,
    }),
  });
  console.log("unassigned ");

  const data = await response.json();

  return data.activity;
}

export function checkIsAssigned(id, activity) {
  return activity.members.filter((member) => member.id === id).length > 0;
}
