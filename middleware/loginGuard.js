import jwt_decode from "jwt-decode";
export default function({ store, redirect, route }) {
  console.log("path", route.path);
  let token = localStorage.getItem("token");
  if (token && route.path == "/login") return redirect("/");
}
