import jwt_decode from "jwt-decode";
export default function({ store, redirect }) {
  let storedUser = jwt_decode(localStorage.getItem("token"));
  let isExpiredToken = storedUser.exp <= new Date().getTime() / 1000;
  if (!storedUser || isExpiredToken) {
    return redirect("/login");
  }
}
