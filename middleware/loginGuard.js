import jwt_decode from "jwt-decode";
export default function({ store, redirect, route }) {
  let token = localStorage.getItem("token");
  if (token && (route.path == "/login" || route.path == "/login/"))
    return redirect("/");
}
