# Track Your LeetCode

A LeetCode tracker to manage your LeetCode progress, including advanced features such as search, the ability to add personal notes, and the convenience of storing code snippets for enhanced productivity.


## Screenshots

<img width="1000" alt="Screenshot 2023-06-22 at 12 52 00 AM" src="https://github.com/sora62/tracker-app/assets/31125728/5e51fffa-7255-4f90-96d7-3198d46c2cda">
<img width="500" alt="image" src="https://github.com/sora62/tracker-app/assets/31125728/b764997f-7e54-4491-a411-ccf3afadd725">
<img width="500" alt="image" src="https://github.com/sora62/tracker-app/assets/31125728/e74bd3ec-14cb-48cc-82a5-5dfc0d3b84bb">


## Tech Stack

**Client:** React, Redux, Material UI

**Server:** Node.js, Express

**Database:** MongoDB


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DB_NAME`


## Run Locally

Clone the repository:

```bash
  git clone https://github.com/sora62/tracker-app.git
```


Install the necessary dependencies:

```bash
  npm install
```

Run the application:

```bash
  npm run react-dev
  npm run start
```

Access the app in your browser at http://localhost:3000. (If you set PORT=3000 in your local .env file.)

Note: Ensure you have Node.js and npm (Node Package Manager) installed on your system.


## Usage

1. Create an account or log in to your existing account.
2. Once logged in, you'll be directed to the dashboard, where you can view your progress lists.
3. To add a new problem, click on the "Add Problem" button and select or search the title of the LeetCode problem, select the tags for the problem, and click on the "Create" button.
4. Use the checkmark on the left to mark a problem.
5. Click on the problem title will jump to the LeetCode page for that problem.
6. Utilize the code snippet on the right to edit and store your LeetCode problem solutions for easier review.
7. Clicking on each list will expand the fully functional note section, allowing you to add your personal notes.


## Optimizations
Improved Lighthouse performance from 52 to 99:
<img width="1000" alt="Screenshot 2023-06-22 at 1 06 56 AM" src="https://github.com/sora62/tracker-app/assets/31125728/c832eeda-b1b9-47bf-acb8-b99cb3093820">


## Roadmap

- Better UI design and compatibility on mobile

- Add filter feature

- Add sort by feature

- Dark mode


## Acknowledgements

Track Your LeetCode is built using several open-source libraries and frameworks. We would like to acknowledge and express gratitude to the developers and contributors of the following:

- [React](https://reactjs.org/)
- [React-Redux](https://react-redux.js.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Material UI](https://mui.com/)
- [Axios](https://axios-http.com/)
- [Formik](https://formik.org/)
- [JSON Web Token (jsonwebtoken)](https://www.npmjs.com/package/jsonwebtoken)
- [Webpack](https://webpack.js.org/)
- [ESLint](https://eslint.org/)


## Authors

- [@sora62](https://www.github.com/sora62)

## License

[ISC](https://choosealicense.com/licenses/isc/)

