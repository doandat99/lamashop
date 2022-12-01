import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SIGNUP_REQUEST, SIGNIN_REQUEST } from "../action/actiontype";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import toastr from "toastr";

export const signup = createAsyncThunk(SIGNUP_REQUEST, async (data) => {
  return await createUserWithEmailAndPassword(auth, data.email, data.password);
});

export const signin = createAsyncThunk(SIGNIN_REQUEST, async (data) => {
  return await signInWithEmailAndPassword(auth, data.email, data.password);
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    logout: (state) => console.log((state.user = null)),
  },
  extraReducers: (builder) => {
    builder

      .addCase(signin.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.meta.arg;
        toastr.success(`${action.payload.user.email} login success`);
      })
      .addCase(signin.rejected, (state, action) => {
        toastr.error("Email not found");
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.meta.arg;
        toastr.success(`${action.payload.user.email} signup success`);
      })
      .addCase(signup.rejected, (state, action) => {
        toastr.error("Email is valid");
      });
  },
});

export const { logout } = userSlice.actions;

export { userSlice };
