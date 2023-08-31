import { BACKEND_DOMAIN } from "@/config";

export async function getMembers(department, setLoading) {
  const response = await fetch(
    `${BACKEND_DOMAIN}/members/?department=${department}`
  );
  const data = await response.json();
  if (setLoading) setLoading(false);
  console.log(data);

  return data;
}

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
