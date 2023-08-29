export async function getMembers(department) {
  const response = await fetch(
    `http://localhost:9000/api/members/?department=${department}`
  );
  const data = await response.json();

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
