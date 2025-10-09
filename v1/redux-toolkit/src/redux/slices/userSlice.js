import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const res = await axios.get("http://localhost:8080/users/all");
    return res.data;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8080/users/create", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Có lỗi xảy ra");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      // Đổi từ delete thành post và sửa đường dẫn API để khớp với backend
      const res = await axios.post(`http://localhost:8080/users/delete/${id}`);
      if (res && res.data.errCode === 0) {
        // Sau khi xóa thành công, fetch lại danh sách người dùng
        dispatch(fetchAllUsers());
        return res.data;
      } else {
        return rejectWithValue("Không thể xóa người dùng");
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "Có lỗi khi xóa người dùng");
    }
  }
);

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  isCreating: false,
  isDeleting: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Xử lý fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // Xử lý createUser
      .addCase(createUser.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createUser.rejected, (state) => {
        state.isCreating = false;
        state.isError = true;
      })
      // Xử lý deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.isDeleting = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isDeleting = false;
        state.isError = true;
      });
  },
});

export default userSlice.reducer;
