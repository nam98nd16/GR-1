import jwt_decode from "jwt-decode";
export default function({ store, redirect }) {
  let token = localStorage.getItem("token");
  let storedUser = token ? jwt_decode(token) : null;
  if (!storedUser) {
    return redirect("/login");
  } else {
    let isExpiredToken = storedUser.exp <= new Date().getTime() / 1000;
    if (isExpiredToken) return redirect("/login");
  }
}
