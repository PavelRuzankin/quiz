import axios from "axios";
import { AUTH_SUCCESS, LOGOUT } from "./actionTypes";

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}

export function logout() {
  localStorage.clear();
  return {
    type: LOGOUT,
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time);
  };
}
export function sendHandler(email, password, isLogin) {
  return async (dispatch) => {
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBEtuespH4YAKuW6PshG8qoa0ZGQlBRGlc";
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBEtuespH4YAKuW6PshG8qoa0ZGQlBRGlc";
    }

    const loginData = {
      email,
      password,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(url, loginData);
      const data = response.data;

      const expirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );

      console.log(data.expiresIn);

      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userId", data.localId);
      localStorage.setItem("expirationDate", expirationDate);

      dispatch(authSuccess(data.idToken));
      dispatch(autoLogout(data.expiresIn * 1000));
    } catch (err) {
      console.error(err);
    }
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime) / 1000)
        );
      }
    }
  };
}
