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

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppConfig, Gmail} from "../Types";


interface InitialState {
    gmailList: Gmail[],
    gmail: Gmail | null,
    appConfig: AppConfig,
    isAppLoading: boolean,
}

const initialState: InitialState = {
    gmailList: [],
    gmail: null,
    isAppLoading: true,
    appConfig: {
        darkMode: false
    },
}


export const gmailSlice = createSlice({
    name: 'gmail',
    initialState: initialState,

    reducers: {

        setGmailList: (state, action: PayloadAction<Gmail[]>) => {
            state.gmailList = action.payload;
        },

        updateGmail: (state, action: PayloadAction<Gmail>) => {
            const gmail = action.payload;
            const gmailIndex = state.gmailList.findIndex(t => t.mailId === gmail.mailId);

            if (gmailIndex > -1) {
                state.gmailList[gmailIndex] = gmail;
            } else {
                state.gmailList.push(gmail)
            }
        },

        deleteGmail: (state, action: PayloadAction<Gmail>) => {
            const gmail = action.payload;
            const gmailIndex = state.gmailList.findIndex(t => t.mailId === gmail.mailId);

            console.log("Deleting gmail", gmail, "at index", gmailIndex);
            if (gmailIndex > -1) {
                state.gmailList.slice(gmailIndex, 1);
            }
        },

        setGmailState: (state, action: PayloadAction<{ gmailList: Gmail[], darkMode: boolean}>) => {
            state.gmailList = action.payload.gmailList;
            state.appConfig.darkMode = action.payload.darkMode;
            state.isAppLoading = false;
        },


        mergeSaveGmail: (state, action: PayloadAction<{originalGmails: Gmail[], mergedGmail: Gmail}>) => {
            const { originalGmails, mergedGmail } = action.payload;

            // Get the IDs of gmails to be removed
            const gmailIdsToRemove = originalGmails.map(gm => gm.id);

            // Filter out the original gmails
            state.gmailList = state.gmailList.filter(gmail =>
                !gmailIdsToRemove.includes(gmail.id)
            );

            // Add the merged gmail
            state.gmailList.push(mergedGmail);
        },

        toggleDarkMode: (state) => {
            state.appConfig.darkMode = !state.appConfig.darkMode;
        },
    }
})
