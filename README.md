# MyReads Project

This is the first assignment for Udacity's React Fundamentals course. The aim of this assignment is to put into practice the basic concepts of React and learn how to think in React. There are no redux or helper libraries. The app adheres to composability way of development.

## Getting Started
Getting started is simple, either clone or fork this repo. The backend server and its API description is located [here](https://github.com/udacity/reactnd-project-myreads-starter/blob/master/README.md)

### Installing
Fork or clone the repo and run these commands:

* install all project dependencies with `npm install`
* start the development server with `npm start`

You can try out the application by going to the main page, a list of books each within a shelf will be displayed. By clicking on a book, the shelf can be changed. It is possible to search for new books and assign them to a shelf by clicking the plus button in the main page.

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── components
        ├── Book.js
        ├── BookShel.js
        ├── BookShelfChanger.js
        ├── BookShelfList.js
        ├── MainPage.js
        ├── SearchPage.js
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```
## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
