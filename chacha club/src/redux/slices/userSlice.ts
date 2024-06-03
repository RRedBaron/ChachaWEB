import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { toast } from "react-toastify";

interface UserState {
  user: User;
  loading: boolean;
  error: string | undefined | null;
}

const initialState: UserState = {
  user: {
    id: 0,
    username: "",
    email: "",
    isVerified: null,
  },
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: any) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Error registering user");
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      throw new Error("Error registering user");
    }
  }
);

export const loginUser = createAsyncThunk("auth/login", async (data: any) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Error logging in user");
    }
    const userData = await response.json();
    setCookie("token", userData.access_token, 30);
    toast.success("Logged in successfully");

    return userData;
  } catch (error) {
    throw new Error("Error logging in user");
  }
});

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  try {
    console.log("fetching user");

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    );
    if (!response.ok) {
      deleteCookie("token");
      throw new Error("Error fetching user");
    }
    const userData = await response.json();
    if (userData.isVerified === false) {
      toast.error("Please verify your email");
    }
    return userData;
  } catch (error) {
    deleteCookie("token");
    throw new Error("Error fetching user");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = {
        id: 0,
        username: "",
        email: "",
        isVerified: null,
      };
      state.error = null;
      deleteCookie("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { resetError, logout } = userSlice.actions;

export default userSlice.reducer;
