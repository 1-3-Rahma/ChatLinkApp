import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadMessages = createAsyncThunk(
  "uploadMessages",
  async ({ roomID, content }) => {
    const token = localStorage.getItem("authToken");
    const response = await axios.patch(
      `http://localhost:5000/api/chats/message/${roomID}`,
      { content },
      {
        headers: {
          Authorization: token, // Include the token in the Authorization header
        },
      }
    );
    return response.data; // Assuming the response returns the updated message
  }
);

const roomSlice = createSlice({
  name: "room",
  initialState: {
    currentRoom: "",
    messages: [],
    error: null,
    status: "loading",
  },
  reducers: {
    setRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      // uploadMessages(state.currentRoom,{content:action.payload})
    },
    resetMessage: (state) => {
      while (state.messages.length) {
        state.messages.pop();
      }
    },
  },
  extraReducers: (builder) => {
    // Handle uploadMessages actions
    builder
      .addCase(uploadMessages.pending, (state) => {
        state.status = "loading"; // Set loading status while uploading
      })
      .addCase(uploadMessages.fulfilled, (state) => {
        state.status = "succeeded"; // Update status to succeeded
        console.log("succeeded");
        // Optionally, update the state with the returned data
      })
      .addCase(uploadMessages.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed
        state.error = action.error.message; // Store error message
      });
  },
});

export const { setRoom, addMessage, resetMessage } = roomSlice.actions;
export default roomSlice.reducer;
