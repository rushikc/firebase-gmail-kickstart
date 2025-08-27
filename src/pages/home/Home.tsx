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

import React, { FC, ReactElement } from "react";
import { Container, Typography, Paper, Box, Button, Grid } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import StorageIcon from '@mui/icons-material/Storage';
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import CloudIcon from '@mui/icons-material/Cloud';
import LockIcon from '@mui/icons-material/Lock';
import './Home.scss';

/*
TODO: Gmail List Implementation
-------------------------------------------------------
As a learning exercise, implement a component that:

1. Fetches Gmail data from Firestore using GmailAPI.getGmailList()
2. Shows a loading indicator (spinner/skeleton) while data is being fetched
3. Displays each Gmail item in a card/list format with all key information in one box:
   - Sender information (name and email)
   - Subject line
   - Date received
   - Preview of content
4. Sorts the Gmail items from newest to oldest
5. Implements error handling for failed data fetching
6. Provides a refresh button to manually reload data

Implement this component and add it to the Home page below the feature boxes.
-------------------------------------------------------
*/

const Home: FC = (): ReactElement => {
  return (
    <Container maxWidth="md" className="home-root">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Firebase Gmail Kickstart
        </Typography>

        <Typography variant="h6" color="textSecondary" paragraph>
          A full-stack template for parsing Gmail data and displaying it with React
        </Typography>

        <Paper elevation={3} sx={{ p: 4, my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Getting Started
          </Typography>

          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1 }}>
            {/* Core Features */}
            <Grid item xs={12} sm={6} md={4}>
              <Feature
                icon={<EmailIcon fontSize="large" />}
                title="Gmail Integration"
                description="Parse email data using Google Apps Script"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Feature
                icon={<StorageIcon fontSize="large" />}
                title="Firestore Storage"
                description="Store parsed data in Cloud Firestore"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Feature
                icon={<CodeIcon fontSize="large" />}
                title="React Frontend"
                description="Display data with offline support"
              />
            </Grid>

            {/* Advanced Features */}
            <Grid item xs={12} sm={6} md={4}>
              <Feature
                icon={<CloudIcon fontSize="large" />}
                title="Google Cloud Setup"
                description="Learn how to configure projects, IAM roles, and service accounts"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Feature
                icon={<LockIcon fontSize="large" />}
                title="OAuth & Auth Flow"
                description="Implement secure token exchange between services"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Feature
                icon={<SecurityIcon fontSize="large" />}
                title="Security Best Practices"
                description="Secure your database, functions, and frontend code"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              href="https://github.com/rushikc/firebase-gmail-kickstart"
              target="_blank"
            >
              View Documentation
            </Button>
          </Box>
        </Paper>

        <Typography variant="body2" color="textSecondary">
          Fill in the blanks and build your own full-stack application
        </Typography>
      </Box>
    </Container>
  );
};

// Feature component for displaying each capability
const Feature: FC<{ icon: ReactElement, title: string, description: string }> = ({
  icon,
  title,
  description
}) => {
  return (
    <Box sx={{
      textAlign: 'center',
      height: '100%',
      p: 2,
      border: '1px solid #eee',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ color: 'primary.main', mb: 1 }}>
        {icon}
      </Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </Box>
  );
};

export default Home;
