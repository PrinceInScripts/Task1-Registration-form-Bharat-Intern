<H1 align="center">Registration Form Web App</h1>

  * [Configuration and Setup](#configuration-and-setup)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)


## Configuration and Setup

To run this project locally, follow these steps:

1. Fork and clone the repository or download as zip and unzip on your machine.
2. Open the project in your preferred code editor.
3. Go to the terminal and navigate to the project directory.

In the terminal:

```bash
-$ cd client
-$ npm install # Install frontend-side dependencies
-$ npm start # Start the frontend
```
In another terminal:
- cd server and Set environment variables in config.env under ./config
- Create your mongoDB connection url, which you'll use as your MONGO_URI
- Supply the following credentials

```
#  ---  Config.env  ---
NODE_ENV = production
PORT =5000
URI =http://localhost:3000
MONGO_URI =
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d
RESET_PASSWORD_EXPIRE =  
SMTP_HOST = "smtp.gmail.com"
SMTP_PORT = 
SMTP_USERNAME = 
SMTP_PASSWORD =
SMTP_FROM_EMAIL = 
CONTACT_US_EMAIL =
FRONTEND_URL=http://localhost:5173
```

```
# --- Terminal ---
$ npm install (to install backend-side dependencies)
$ npm start (to start the backend)
```


##  Key Features
-User-friendly registration form.
-Input validation for data integrity.
-Integration with MongoDB for data storage.
-Secure backend powered by Node.js and Express.js.
-Responsive design for seamless user experience.
-Deployment-ready configuration.


<br/>

##  Technologies used

This project was created using the following technologies.

####  Frontend 

- [React js ](https://www.npmjs.com/package/react) - JavaScript library that is used for building user interfaces specifically for single-page applications
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - To handle routing
- [axios](https://www.npmjs.com/package/axios) - For making Api calls
- [Tailwind CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - For User Interface
- [React icons](https://react-icons.github.io/react-icons/) -
 Small library that helps you add icons  to your react apps.

####  Backend 

- [Node js](https://nodejs.org/en/) -A runtime environment to help build fast server applications using JS
- [Express js](https://www.npmjs.com/package/express) -The server for handling and routing HTTP requests.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - For authentication
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - For data encryption
- [Nodemailer](https://nodemailer.com/about/) - Send e-mails from Node.js
- [Dotenv](https://www.npmjs.com/package/dotenv) - Zero Dependency module that loads environment variables
- [cors](https://www.npmjs.com/package/cors) - Provides a Connect/Express middleware


####  Database 

 - [MongoDB ](https://www.mongodb.com/) - It provides a free cloud service to store MongoDB collections.
