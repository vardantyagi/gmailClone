import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  open: false,
  user: null,
  emails: [],
  selectedEmail: null,
  searchText: "",
  inboxEmails: [],
  selectedEmailsPage: 'all',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // actions
    setOpen: (state, action) => {
      state.open = action.payload
    },
    setAuthUser: (state, action) => {
      state.user = action.payload
    },
    setEmails: (state, action) => {
      state.emails = action.payload
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload
    },
    setInboxEmails: (state, action) => {
      state.inboxEmails = action.payload
    },
    setSelectedMailsPage: (state,action) => {
      state.selectedEmailsPage = action.payload;
    }
  }
})

export const { setOpen, setAuthUser, setEmails, setSelectedEmail, setSearchText, setInboxEmails, setSelectedMailsPage } = appSlice.actions;
export default appSlice.reducer;