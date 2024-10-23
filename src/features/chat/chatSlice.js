import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {firestore} from '../../services/firebase';

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async () => {
    const snapshot = await firestore.collection('messages').get();

    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async message => {
    const docRef = await firestore.collection('messages').add(message);

    return {id: docRef.id, ...message};
  },
);

const chatSlice = createSlice({
  name: 'chat',

  initialState: {
    messages: [],

    loading: false,
  },

  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },

  extraReducers: builder => {
    builder

      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })

      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const {setMessages} = chatSlice.actions;

export default chatSlice.reducer;
