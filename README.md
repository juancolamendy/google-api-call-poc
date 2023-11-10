# Configuration
## Setting Up a Project in Google Cloud Platform
- Sign in to Google Cloud Console
- Create a New Project
- Select the Project

## Enabling the API
- Access the API Library: From the main dashboard of your project, click on the "API & Services" > "Library".
- Search for the API: In the API Library, use the search bar to find "Google Business Profile API".
- Enable the API
  - Click on the API from the search results, and then click the "Enable" button to enable it for your project.

## Set Up OAuth 2.0 on Google Cloud Console
- Configure OAuth Consent Screen:
  - Go to the Google Cloud Console and select your project.
  - Navigate to "APIs & Services" > "OAuth consent screen".
  - Choose the appropriate user type (Internal or External).
  - Fill in the application details such as the application name, user support email, and developer contact information.
  - Add any scopes that your application requires. For Google My Business, you'll likely need scopes that allow reading and responding to reviews.
  - Save the settings.
- Create OAuth 2.0 Client ID:
  - Still in "APIs & Services", go to "Credentials" and click on "Create credentials".
  - Select "OAuth client ID".
  - Choose "Web application" as the application type.
  - Set the Authorized redirect URIs to where you want Google to send your users after they authenticate. This URI should be a route in your application that can handle the OAuth 2.0 response.
    - Authorized url: http://localhost:8000
    - Authorized redirect: http://localhost:8000/callback
Read more [Google OAuth Documentation](https://developers.google.com/my-business/content/implement-oauth)

## Authorization Scopes
  - https://www.googleapis.com/auth/business.manage

## Install dependencies
```sh
pip install -r requirements.txt
```

## Run
```sh
gunicorn main:app --workers 1 --worker-class uvicorn.workers.UvicornWorker
```
