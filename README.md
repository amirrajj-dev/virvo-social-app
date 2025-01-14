# 🌐 Virvo Social App

Virvo Social App is a modern, fully-responsive social networking platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The application features user authentication, post creation, comments, notifications, and more. It supports dark and light themes with Daisy UI.

## 📑 Table of Contents

1. [📖 Project Overview](#-project-overview)
2. [⚙️ Features](#-features)
3. [💻 Tech Stack](#-tech-stack)
4. [🚀 Getting Started](#-getting-started)

## 📖 Project Overview

Virvo Social App is a full-stack social networking platform where users can create posts, comment on them, like them, and follow other users. It includes real-time notifications and supports dark and light themes.

## ⚙️ Features

- **User Authentication**: Sign-up, Sign-in, Sign-out, and token refresh functionality.
- **Profile Management**: Update profile, view user posts and liked posts.
- **Post Creation and Management**: Create, delete, like/unlike posts.
- **Comment System**: Create, delete, like/unlike comments.
- **Notification System**: Real-time notifications for likes, comments, and follows.
- **Dark/Light Theme**: User-customizable themes with support for system theme detection.
- **Responsive UI**: Fully responsive design using Tailwind CSS and Daisy UI components.
- **Custom Hooks**: UseDelete, UseFollow, UseGetFollowingPosts, UseGetLikedPosts, UseGetMe, UseGetMePosts, UseGetPosts, UseLike, UseUpdateUser.

## 💻 Tech Stack

### 🖥️ Frontend

- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React**: A JavaScript library for building user interfaces.
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) **Vite**: A build tool that aims to provide a faster and leaner development experience for modern web projects.
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- ![Daisy UI](https://img.shields.io/badge/Daisy%20UI-FF69B4?style=flat&logo=daisyui&logoColor=white) **Daisy UI**: A Tailwind CSS component library.

### 🛠️ Backend

- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) **Express**: A minimal and flexible Node.js web application framework.
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) **MongoDB**: A document-oriented NoSQL database used for high-volume data storage.
- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongodb&logoColor=white) **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.

### 🔐 Authentication

- ![bcryptjs](https://img.shields.io/badge/bcryptjs-blue?style=flat&logo=key&logoColor=white) **bcryptjs**: A library to help you hash passwords.
- ![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=json-web-tokens&logoColor=white) **JWT**: A compact, URL-safe means of representing claims to be transferred between two parties.

### 🛠️ Development Tools

- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white) **ESLint**: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- ![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=postcss&logoColor=white) **PostCSS**: A tool for transforming CSS with JavaScript plugins.

## 🚀 Getting Started

before getting started ensure you have the following tools : 

Node Js🔰

Mongo Db🍏

🏡Mongo Db Compass (not required just for better experience)


1.📋 Clone the repository:

```js
git clone https://github.com/amirrajj-dev/virvo-social-app.git
cd virvo-social-app
```

2.🛠️ Create a .env file and add your MongoDB URI and secret key:

```js
example :)
MONGO_URL="mongodb://localhost:27017/virvo"
PORT=5000
SECRET_KEY="LRPGOgLgCN4kEnpgIzqz1JRASgAhK3T4QKEvx+DypKo="
NODE_ENV=development
```

3. 📦 Install dependencies:

in the root of the project use the following command :

```js
npm run build
```

4.🚀 Start the production server::

```js
npm run start
```

and thats it ! now go to the localhost:5000 to see the project⚡.

## The End 🏁

Hope You Like it My Firend🫡😉❤️
