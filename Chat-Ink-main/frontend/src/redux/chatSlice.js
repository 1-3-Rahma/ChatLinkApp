import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch chats
export const fetchChats = createAsyncThunk("chat/fetchChats", async () => {
  const token = localStorage.getItem("authToken"); // Fetch token inside the thunk
  if (!token) {
    throw new Error("No authentication token found"); // Handle case where token is missing
  }
  
  // await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await axios.get("http://localhost:5000/api/chats/user", {
    headers: {
      Authorization: token, // Bearer token format
    },
  });

  return response.data; // Assuming the response returns an array of chats
});

// Async thunk to fetch logged-in user details
export const fetchLoggedInUser = createAsyncThunk(
  "chat/fetchLoggedInUser",
  async () => {
    const token = localStorage.getItem("authToken"); // Fetch token inside the thunk
    if (!token) {
      throw new Error("No authentication token found"); // Handle case where token is missing
    }

    const response = await axios.get("http://localhost:5000/api/user", {
      headers: {
        Authorization: token, // Bearer token format
      },
    });

    return response.data; // Assuming the response returns user details
  }
);

export const fetchGroupByChatId = createAsyncThunk(
  'group/fetchGroupByChatId',
  async (chatIds, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken"); // Fetch token inside the thunk
    if (!token) {
      throw new Error("No authentication token found"); // Handle case where token is missing
    }

    try {
      // Create an array of promises for each chat ID
      const groupPromises = chatIds.map(chatId =>
        axios.get(`http://localhost:5000/api/group/${chatId}`, {
          headers: {
            Authorization: token,
          },
        })
      );

      // Wait for all promises to resolve
      const responses = await Promise.all(groupPromises);

      // Extract data from responses
      const groups = responses.map(response => response.data);
      return groups; // Return the array of groups
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const chatSlice = createSlice({
  name: "chat",
  initialState: {
    loggedInUser: null,
    chats: [],
    groups: [], // Array to store groups
    chatStatus: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    userStatus: "idle", // Separate status for fetching user data
    groupStatus: "idle", // Status for fetching groups
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchChats thunk lifecycle
      .addCase(fetchChats.pending, (state) => {
        state.chatStatus = "loading";
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chatStatus = "succeeded";
        state.chats = action.payload; // Store chats in state
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.chatStatus = "failed";
        state.error = action.error.message;
      })

      // Handle fetchLoggedInUser thunk lifecycle
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        state.loggedInUser = action.payload; // Store user details in state
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.userStatus = "failed";
        state.error = action.error.message;
      })
      
      // Handle fetchGroupByChatId thunk lifecycle
      .addCase(fetchGroupByChatId.pending, (state) => {
        state.groupStatus = "loading"; // Update status for groups
        state.error = null;
      })
      .addCase(fetchGroupByChatId.fulfilled, (state, action) => {
        state.groupStatus = "succeeded"; // Update status
        state.groups = action.payload; // Store groups in state
      })
      .addCase(fetchGroupByChatId.rejected, (state, action) => {
        state.groupStatus = "failed"; // Update status
        state.error = action.payload;
      });
  },
});

// Export selectors to access state
export const selectChats = (state) => state.chat.chats;
export const selectChatStatus = (state) => state.chat.chatStatus;
export const selectLoggedInUser = (state) => state.chat.loggedInUser;
export const selectUserStatus = (state) => state.chat.userStatus;
export const selectGroup = (state) => state.chat.group; // Selector for group
export const selectGroupStatus = (state) => state.chat.groupStatus; // Selector for group status
export const selectChatError = (state) => state.chat.error;

export default chatSlice.reducer;
