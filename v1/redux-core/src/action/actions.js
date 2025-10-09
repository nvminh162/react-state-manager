import {
  INCREMENT,
  DECREMENT,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  DELETE_USER_SUCCESS,
} from "./types";
import axios from "axios";

export const increaseCounter = (payload) => {
  return {
    type: INCREMENT,
    payload,
  };
};

export const decreaseCounter = (payload) => {
  return {
    type: DECREMENT,
    payload,
  };
};

//start
//doing
//finish
export const fetchAllUsers = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUsersRequest());
    try {
      const res = await axios.get("http://localhost:8080/users/all");
      const data = res && res.data ? res.data : [];
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      console.error("ERROR ", error);
      dispatch(fetchUsersError());
    }
  };
};

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUsersSuccess = (payload) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload,
  };
};

export const fetchUsersError = () => {
  return {
    type: FETCH_USER_SUCCESS,
  };
};

export const createNewUserRedux = (email, password, username) => {
  return async (dispatch, getState) => {
    dispatch(createUsersRequest());
    try {
      let res = await axios.post("http://localhost:8080/users/create", {
        email,
        password,
        username,
      });
      if (res && res.data.errCode === 0) {
        dispatch(createUsersSuccess());
        dispatch(fetchAllUsers());
      }
    } catch (error) {
      console.error(error);
      dispatch(createUsersError());
    }
  };
};

export const createUsersRequest = () => {
  return {
    type: CREATE_USER_REQUEST,
  };
};

export const createUsersSuccess = () => {
  return {
    type: CREATE_USER_SUCCESS,
  };
};

export const createUsersError = () => {
  return {
    type: CREATE_USER_SUCCESS,
  };
};

export const deleteUserRedux = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await axios.post(`http://localhost:8080/users/delete/${id}`);
      if (res && res.data.errCode === 0) {
        dispatch(deleteUsersSuccess());
        dispatch(fetchAllUsers());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUsersSuccess = () => {
  return {
    type: DELETE_USER_SUCCESS,
  };
};
