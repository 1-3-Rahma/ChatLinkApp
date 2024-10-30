import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  data: null,
  loading: false,
  groups: null,
  message: "",
};

export const getPublicGroup = createAsyncThunk(
  "groups/getPublicGroup",
  async (x, { rejectWithValue }) => {
    try {
      console.log("inside getPublicGroup");
      const response = await fetch(
        "http://localhost:5000/api/group/publicGroups",
        {
          method: "get",
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        }
      );
      const data = await response.json();
      console.log("data from get public gorup ", data);
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
export const createGroup = createAsyncThunk(
  "groups/createGroup",
  async (bodyData, { rejectWithValue }) => {
    try {
      console.log(JSON.stringify(bodyData));
      const response = await fetch("http://localhost:5000/api/group", {
        method: "post",
        headers: {
          Authorization: localStorage.getItem("authToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
      console.log(data);
      console.log("data from get public gorup ", data);
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
export const joinToGroup = createAsyncThunk(
  "groups/joinToGroup",
  async ({ ID, userID }, { rejectWithValue }) => {
    try {
      console.log("object");
      console.log(ID, userID);
      const response = await fetch(
        `http://localhost:5000/api/group/addUser/${ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("authToken"),
          },
          body: JSON.stringify({ userId: userID }),
        }
      );
      const data = await response.json();
      console.log(data);
      console.log("data from get join gorup ", data);
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

export const groupSlice = createSlice({
  name: "groups",
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
      .addCase(getPublicGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("from pending state");
      })
      .addCase(getPublicGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
        console.log("from fulfilled state", action.payload);
      })
      .addCase(getPublicGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
        console.log("from reject state");
      });
    builder
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("from pending state");
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
        console.log("from fulfilled state", action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.token = null;
        state.user = null;
        state.message = action.payload.message;
        console.log("from reject state");
      });
    builder
      .addCase(joinToGroup.pending, (state) => {
        console.log("from pending state");
      })
      .addCase(joinToGroup.fulfilled, (state, action) => {
        console.log("from fulfilled state", action.payload);
      })
      .addCase(joinToGroup.rejected, (state, action) => {
        console.log("from reject state", action.payload);
      });
  },
});

export const { logout } = groupSlice.actions;

export default groupSlice.reducer;
