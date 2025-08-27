/// <reference path="functions.js" />
/* eslint-disable */
// noinspection JSUnresolvedReference
// noinspection SpellCheckingInspection
// noinspection JSUnusedGlobalSymbols
// noinspection JDuplicatedCode
// noinspection JSUnresolvedReference


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


/**
 * Processes Gmail messages to extract gmail data and store it in a database.
 */
async function myGmailFunction() {

    const Config = "config";
    const LastGmailId = "lastGmailId";

    // usually returns last 100 mails
    let res = Gmail.Users.Messages.list('me');
    let mailIdList = res.messages.map((res) => res.id);

    const accessToken = ScriptApp.getOAuthToken();

    let lastMailId;

    mailIdList = mailIdList.reverse();

    let res_doc = getOneDoc(Config, LastGmailId, accessToken);
    let mailId;

    if (res_doc) {
        mailId = res_doc.value;
    } else {
        mailId = "";
    }

    console.log("Last mail id ", mailId);

    let lastMailIdIndex = mailIdList.indexOf(mailId);
    mailIdList = mailIdList.slice(lastMailIdIndex + 1);
    console.log("Pending mail id list ", mailIdList);


    for (const mailIndex in mailIdList) {
        let mailId = mailIdList[mailIndex];
        res = Gmail.Users.Messages.get('me', mailId);

        let snippet = res.snippet;

        console.log("Email snippet ", snippet);

        // TODO: Parse email content here to extract gmail data
        // 1. Check if the email matches patterns for transaction emails (e.g., payment confirmations, receipts)
        // 2. Extract and store the following key information:
        //    - Sender information (name, email address)
        //    - Subject line
        //    - Date received
        //    - Preview of content/body
        //    - Transaction details if applicable (amount, vendor, transaction type)
        // 3. Create a gmail object using the getGmail() function below
        // 4. Send the gmail data to Firestore using the setOneDoc() function
        //
        // Hint: Use res.payload.headers to access email headers that contain sender, subject, date

    }


    if (lastMailId) {
        console.log('Post execution last mail id ', lastMailId);
        setOneDoc("config", "lastGmailId", lastMailId, accessToken);
    }


}




/**
 * Handles GET requests to the web app.
 * This function is triggered when the web app accesses AppScript.
 */
function doGet() {
    Logger.log("doGet function called.");
    myGmailFunction().then(() => Logger.log("executed gmail function"));

    // Return a ContentService response with the email and a 200 OK status
    return ContentService.createTextOutput("Started function")
        .setMimeType(ContentService.MimeType.TEXT);
}
