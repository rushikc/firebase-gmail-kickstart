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

import {initializeApp} from 'firebase/app';
import {deleteDoc, doc, getDoc, getFirestore, setDoc} from 'firebase/firestore/lite';
import {firebaseConfig} from '../firebase/firebase-public';
import {getDateJsIdFormat, getUnixTimestamp} from "../utility/utility";
import {GmailIndexDB} from './GmailIndexDB';
import {ErrorHandlers} from '../components/ErrorHandlers';
import {Gmail} from "../Types";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export class GmailAPI {

    /**
     * Adds a new gmail to Firestore and IndexedDB.
     * It generates a unique key for the gmail based on its date and vendor,
     * updates the modified date, and then saves the gmail.
     * Returns the gmail object with the generated ID.
     */
    static addGmail = async (gmail: Gmail): Promise<Gmail> => {

        try {

            let key = getDateJsIdFormat(new Date(gmail.date)) + ' ' + gmail.mailId.slice(0, 10);
            // console.debug("Document written with gmail: ", JSONCopy(gmail));

            gmail.modifiedDate = Date.now(); // date to epoch

            const docRef = doc(db, "gmail", key);
            const {id, ...gmailWithoutId} = gmail;
            await setDoc(docRef, gmailWithoutId);

            await GmailIndexDB.addGmailList([gmail]);

            gmail["id"] = key;
            return gmail;

        } catch (e) {
            ErrorHandlers.handleApiError(e);
            console.error("Error adding document: ", e);
            return gmail;
        }
    }


    /**
     * Sets a single document in a specified Firestore collection.
     * If no collection is specified, it defaults to the 'config' collection.
     */
    static setOneDoc = async (key: string, val: any, collectionName: string = 'config') => {
        try {
            const docRef = doc(db, collectionName, key);
            await setDoc(docRef, val);
            console.debug("Document written with key: ", key);
            console.debug("Document written with val: ", val);
        } catch (e) {
            ErrorHandlers.handleApiError(e);
            console.error("Error adding document: ", e);
        }
    }

    /**
     * Retrieves a single document from a specified Firestore collection.
     * If no collection is specified, it defaults to the 'config' collection.
     */
    static getOneDoc = async (key: string, collectionName: string = 'config') => {
        try {
            const docRef = doc(db, collectionName, key);
            const docSnap = await getDoc(docRef);
            // @ts-ignore
            return docSnap.data();
        } catch (e) {
            ErrorHandlers.handleApiError(e);
            console.error("Error getting document: ", e);
            return null;
        }
    }

    /**
     * Deletes a single document from a specified Firestore collection.
     * If no collection is specified, it defaults to the 'config' collection.
     * Returns true on successful deletion, false otherwise.
     */
    static deleteOneDoc = async (key: string, collectionName: string = 'config') => {
        try {
            const docRef = doc(db, collectionName, key);
            await deleteDoc(docRef);
            console.debug("Document deleted with key: ", key);
            return true;
        } catch (e) {
            ErrorHandlers.handleApiError(e);
            console.error("Error deleting document: ", e);
            return false;
        }
    }

    /**
     * A utility function for processing and migrating data in Firestore.
     * This function is typically used for one-off data manipulation tasks.
     */
    static processData = async () => {
        try {
            console.debug("Process Data Init");
            

            // console.debug("gmail list ", tags);
        } catch (e) {
            ErrorHandlers.handleApiError(e);
            console.error("Error processing data: ", e);
        }
    }


    /**
     * Retrieves a list of gmail messages from Firestore and caches them in IndexedDB.
     * 
     * This is a critical function that implements delta synchronization - only fetching
     * new or modified records since the last update to minimize Firestore reads.
     * 
     * TODO: As a learning exercise, fill in the implementation to:
     * 1. Get the last sync timestamp from IndexedDB
     * 2. Query Firestore for records modified since that timestamp
     * 3. Store the new records in IndexedDB
     * 4. Update the last sync timestamp
     * 5. Return the complete list of gmail messages
     * 
     * @param overrideLastDate Optional timestamp to override the stored last update time
     * @returns Promise resolving to an array of Gmail objects
     */
    static getGmailList = async (overrideLastDate: number | undefined = undefined): Promise<Gmail[]> => {
        try {
            // Table name in Firestore
            let table = 'gmail';
            
            // Arrays to hold data from IndexedDB and Firestore
            let indexDocList: any[] = [];
            let fireDocList: any[] = [];

            // STEP 1: Retrieve last sync timestamp
            // By default, use a date far in the past to fetch all records on first run
            let lastUpdatedDate = getUnixTimestamp("2020-01-01");
            
            // TODO: Implement code to get the last update timestamp from IndexedDB


            // STEP 2: Query Firestore for new/updated records
            // TODO: Implement the Firestore query
            // Example:
            // const q = query(collection(db, table), where("modifiedDate", ">", lastUpdatedDate));


            // STEP 4: Update the last sync timestamp (with a small buffer to avoid race conditions)
            // TODO: Implement the timestamp update

            // STEP 5: Get all records from IndexedDB
            // TODO: Implement retrieval of all cached records


            // Log for debugging
            console.log('Gmail data retrieval complete');
            
            // Return the complete list from IndexedDB (includes both old and new records)
            return indexDocList;
        } catch (e) {
            ErrorHandlers.handleApiError(e);
            console.error("Error fetching gmail list: ", e);
            return [];
        }
    }


    /**
     * Retrieves the dark mode setting from the 'darkMode' document in the 'config' collection.
     * Returns true if dark mode is enabled, false otherwise.
     *
     * TODO: As a learning exercise, implement this method to:
     * 1. Get the dark mode setting from Firestore
     * 2. Handle cases where the setting doesn't exist yet
     * 3. Return a boolean indicating the current theme preference
     */
    static getDarkModeConfig = async (): Promise<boolean> => {
        try {
            // TODO: Implement code to get dark mode setting from Firestore


            console.debug('Dark mode config retrieval not implemented');
            return false; // Default to light mode
        } catch (e) {
            ErrorHandlers.handleApiError(e);
            console.error("Error getting dark mode config:", e);
            return false; // Default to light mode on error
        }
    }

    /**
     * Updates the dark mode setting in the 'darkMode' document in the 'config' collection.
     * Returns true on success, false on failure.
     *
     * TODO: As a learning exercise, implement this method to:
     * 1. Create a config object with the dark mode value
     * 2. Save it to Firestore using setOneDoc
     * 3. Return a success/failure indicator
     *
     * @param val Boolean indicating whether dark mode should be enabled
     */
    static updateDarkMode = async (val: boolean): Promise<boolean> => {
        try {
            // TODO: Implement code to update dark mode setting in Firestore

            console.debug('Dark mode update not implemented');
            return true;
        } catch (e) {
            ErrorHandlers.handleApiError(e);
            console.error("Error updating dark mode setting:", e);
            return false;
        }
    }


    /**
     * Deletes a gmail from both Firestore and IndexedDB.
     * The IndexedDB deletion is based on the gmail's mailId.
     * Returns true on successful deletion, false otherwise.
     */
    static deleteGmail = async (gmail: any): Promise<boolean> => {
        try {
            // First, delete from Firebase
            const docRef = doc(db, "gmail", gmail.id);
            await deleteDoc(docRef);
            console.debug("Gmail deleted from Firebase with key: ", gmail.id);

            // Then, delete from IndexedDB
            if (gmail.mailId) {
                await GmailIndexDB.deleteGmail(gmail.mailId);
                console.debug("Gmail deleted from IndexedDB with mailId: ", gmail.mailId);
            } else {
                console.warn("No mailId found for gmail, skipping IndexedDB deletion");
            }

            return true;
        } catch (e) {
            ErrorHandlers.handleApiError(e);
            console.error("Error deleting gmail: ", e);
            return false;
        }
    }
}
