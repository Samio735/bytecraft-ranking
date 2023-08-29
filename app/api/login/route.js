export async function POST(request) {
  const data = await request.json();
  if (data.department === "development" && data.password === "123") {
    return Response.json({
      isLogedin: true,
      department: data.department,
      password: data.password,
    });
  } else {
    return Response.json({
      isLogedin: false,
      department: data.department,
      password: data.password,
      error: "Wrong password",
    });
  }
}
