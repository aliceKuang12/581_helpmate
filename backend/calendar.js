// // integrate Google Calendar
// import path from 'path'
// import express from 'express';
// import fs from 'fs';
// import process from 'process';
// import { authenticate } from '@google-cloud/local-auth';
// import { google } from 'googleapis';

// const pfs = fs.promises;
// const app = express();

// // https://developers.google.com/calendar/api/quickstart/nodejs#install_the_client_library
 
// // If modifying these scopes, delete token.json.
//  const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
//  const TOKEN_PATH = path.join(process.cwd(), 'token.json');
//  const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

//  /**
//   * Reads previously authorized credentials from the save file.
//   *
//   * @return {Promise<OAuth2Client|null>}
//   */
//  async function loadSavedCredentialsIfExist() {
//      try {
//          const content = await pfs.readFile(TOKEN_PATH);
//          const credentials = JSON.parse(content);
//          return google.auth.fromJSON(credentials);
//      } catch (err) {
//          return null;
//      }
//  }

//  /**
//   * Serializes credentials to a file compatible with GoogleAUth.fromJSON.
//   *
//   * @param {OAuth2Client} client
//   * @return {Promise<void>}
//   */
//  async function saveCredentials(client) {
//      const content = await pfs.readFile(CREDENTIALS_PATH);
//      const keys = JSON.parse(content);
//      const key = keys.installed || keys.web;
//      const payload = JSON.stringify({
//          type: 'authorized_user',
//          client_id: key.client_id,
//          client_secret: key.client_secret,
//          refresh_token: client.credentials.refresh_token,
//      });
//      await pfs.writeFile(TOKEN_PATH, payload);
//  }

//  /**
//   * Load or request or authorization to call APIs.
//   *
//   */
//  async function authorize() {
//      let client = await loadSavedCredentialsIfExist();
//      if (client) {
//          return client;
//      }
//      client = await authenticate({
//          scopes: SCOPES,
//          keyfilePath: CREDENTIALS_PATH,
//      });
//      if (client.credentials) {
//          await saveCredentials(client);
//      }
//      return client;
//  }

//  /**
//   * Lists the next 10 events on the user's primary calendar.
//   * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
//   */
 
//  async function listEvents(auth, _calendarId='primary') {
//      const calendar = google.calendar({ version: 'v3', auth });
//      const res = await calendar.events.list({
//          calendarId: _calendarId,
//          timeMin: new Date().toISOString(),
//          maxResults: 10,
//          singleEvents: true,
//          orderBy: 'startTime',
//      });
//      const events = res.data.items;
//      if (!events || events.length === 0) {
//          console.log('No upcoming events found.');
//          return;
//      }
//      console.log('Upcoming 10 events:');
//      events.map((event, i) => {
//          const start = event.start.dateTime || event.start.date;
//          console.log(`${start} - ${event.summary}`);
//      });
//  }

//  authorize().then(listEvents).catch(console.error);

// // This code is contributed by Yashi Shukla

import {google}  from 'googleapis';
const auth = new google.auth.GoogleAuth({
  keyFile: './credentials.json',
  scopes: 'https://www.googleapis.com/auth/calendar'
});
const calendar = google.calendar({version: 'v3', auth});

// Create a new event
const event = {
  summary: 'My fhadjfkasd',
  location: 'fadsfasdf',
  description: 'Description of my event',
  start: {
    dateTime: '2023-02-14T10:00:00-07:00', // date and time in ISO format
    timeZone: 'America/Los_Angeles'
  },
  end: {
    dateTime: '2023-02-15T11:00:00-07:00', // date and time in ISO format
    timeZone: 'America/Los_Angeles'
  },
  reminders: {
    useDefault: true
  }
};

calendar.events.insert({
  calendarId: 'primary',
  resource: event,
}, (err, res) => {
  if (err) return console.error('Error adding event:', err);
  console.log('Event created: %s', res.data.htmlLink);
});

