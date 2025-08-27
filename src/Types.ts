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

export interface Gmail {
    id: string,
    mailId: string, // unique identifier for the gmail from mail id
    date: number, // timestamp when the email was received
    modifiedDate: number, // timestamp when the record was last modified

    // Email content and metadata
    senderName:string, // name of the sender
    senderEmail: string, // email address of the sender
    subject: string, // email subject line
    preview: string, // preview/snippet of email content

    // Additional metadata
    user: string, // user who created the record
}

// used to store the configuration for the app in IndexedDB
export interface Config {
    key: string,
    value: string | number
}

export interface AppConfig {
    darkMode: boolean;
}
