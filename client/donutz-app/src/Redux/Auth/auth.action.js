import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, PROFILE_SUCCESS } from "./auth.type";
import { BaseUrl } from "../../utills/constans";
import axios from "axios"
export const login = (creds) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST })
  try {
    const response = await fetch(`${BaseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    if (data?.messege === "Login successfull !") {
      dispatch({ type: LOGIN_SUCCESS, payload: data })
    }
    alert(data.messege);
    return data;
  }
  catch (e) {
    dispatch({ type: LOGIN_ERROR, payload: e.messege });
    alert(e.messege);
  }
}

export const GetOtp = async (creds) => {
  try {
    const response = await fetch(`${BaseUrl}/getotp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    return data;
  }
  catch (e) {
    console.log(e)
  }
}

export const forgetpassword = async (creds) => {
  try {
    const response = await fetch(`${BaseUrl}/updatepassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    alert(data.messege);
    if (data.messege === "Password updated successfully") {
      return data;
    } else {
      return data;
    }
  }
  catch (e) {
    console.log(e)
  }
}

export const singleuser = () => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    let res = await fetch(`${BaseUrl}/profile`, {
      method: 'GET',
      headers: {
        'token': token
      }
    })
    let data = await res.json();

    if (data?.userpersent) {
      dispatch({ type: PROFILE_SUCCESS, payload: data })
      return data.userpersent;
    }
    dispatch({ type: LOGOUT });
    return data
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT });
    return error
  }
}

export const getAllUser = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  let res = await fetch(`${BaseUrl}/userdata`, {
    method: 'GET',
    headers: {
      'token': token
    }
  })
  let data = await res.json();
  if (data?.users) {
    return data.users;
  }
  return data;
}

export const updateAuser = async (user) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await fetch(`${BaseUrl}/userupdate/${user?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": token,
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }
  catch (e) {
    console.log(e)
    return e
  }
}

export const deleteAuser = async (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  let res = await fetch(`${BaseUrl}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'token': token
    }
  })
  let data = await res.json();
  return data;
}