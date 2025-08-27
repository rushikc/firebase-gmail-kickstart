/*
Copyright (C) 2025 <rushikc> <rushikc.dev@gmail.com>

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; version 3 of the License.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details, or get a copy at
<https://www.gnu.org/licenses/gpl-3.0.txt>.
*/

import {gmailSlice} from "./gmailSlice";
import {RootState, store} from "./store";
import {Gmail} from "../Types";


export const selectGmail = (state: RootState) => state.gmail;

export const setGmailList = (gmails: Gmail[]) => store.dispatch(gmailSlice.actions.setGmailList(gmails));
export const updateGmail = (gmail: Gmail) => store.dispatch(gmailSlice.actions.updateGmail(gmail));
export const setGmailState = (gmailList: Gmail[], darkMode: boolean) => store.dispatch(gmailSlice.actions.setGmailState({
    gmailList,
    darkMode
}));
export const mergeSaveGmail = (originalGmails: Gmail[], mergedGmail: Gmail) =>
  store.dispatch(gmailSlice.actions.mergeSaveGmail({ originalGmails, mergedGmail }));
export const deleteGmail = (gmail: Gmail) => store.dispatch(gmailSlice.actions.deleteGmail(gmail));
export const toggleDarkMode = () => store.dispatch(gmailSlice.actions.toggleDarkMode());
