import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  data: null,
  loading: false,
  notifications: null,
  message: "",
};
export const updateUser = createAsyncThunk(
  "friends/update",
  async (x, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/suggestFriends",
        {
          method: "get",
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.status !== 201 && response.status !== 200 && !response.ok) {
        return rejectWithValue(data);
      } else {
        console.log("iam in return");

        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const sendFriendRequest = createAsyncThunk(
  "friends/sendFriend",
  async (friendId, { rejectWithValue }) => {
    try {
      console.log(friendId);
      const response = await fetch("http://localhost:5000/api/notifications", {
        method: "post",
        headers: {
          Authorization: localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "friendReq", receiver: friendId }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status !== 201 && response.status !== 200 && !response.ok) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getFriendsRequest = createAsyncThunk(
  "friends/getFriend",
  async (x, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/notifications", {
        method: "get",
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      });
      const data = await response.json();
      if (response.status !== 201 && response.status !== 200 && !response.ok) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const acceptFriendRequest = createAsyncThunk(
  "friends/acceptAddFriend",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await fetch("http://localhost:5000/api/user/addFriend", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
        body: JSON.stringify({ sender: id }),
      });
      const data = await response.json();
      console.log(data);

      if (response.status !== 201 && response.status !== 200 && !response.ok) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteNotification = createAsyncThunk(
  "friends/accertAddFriend",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id);
      const response = await fetch(
        `http://localhost:5000/api/notifications/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      const data = await response.json();
      console.log(data);

      if (response.status !== 201 && response.status !== 200 && !response.ok) {
        return rejectWithValue(data);
      } else {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.error = null;
      state.data = null;
      state.loading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log("from fulfilled state", action.payload);
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
        console.log("from reject state");
      });
    builder
      .addCase(sendFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(sendFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
      });
    builder
      .addCase(getFriendsRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFriendsRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        console.log("from fulfilled state", action.payload);
      })
      .addCase(getFriendsRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
        console.log("from reject state");
      });
    builder
      .addCase(acceptFriendRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptFriendRequest.fulfilled, (state, action) => {
        state.loading = false;
        console.log("from fulfilled state", action.payload);
      })
      .addCase(acceptFriendRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
        console.log("from reject state");
      });
    builder
      .addCase(deleteNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.loading = false;
        console.log("from fulfilled state", action.payload);
      })
      .addCase(deleteNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
        console.log("from reject state");
      });
  },
});

export const { logout } = friendsSlice.actions;

export default friendsSlice.reducer;
