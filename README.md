# REST API w/ Social Login

## Environment Setup

Configure Social Accounts in the `.env` file.

```
MONGODB_URI
NODE_ENV=development

GOOGLE_CLIENT_ID=getFromYourGoogleDevConsole
GOOGLE_CLIENT_SECRET=getFromYourGoogleDevConsole
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/youtube/redirect

JWT_SIGNING_KEY=someSecretKeyCodeYouWant
JWT_ISSUER=sample-name
JWT_AUDIENCE=sample-name
```
