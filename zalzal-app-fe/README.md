
```markdown
## Task: Implement User Actions and Configure Backend

### Frontend Tasks (In ./src/action/userAction):

1. Open the `./src/action/userAction.js` file.
2. Implement multiple functions to update the village model.
3. Ensure that the functions include logic to interact with the backend API for creating, updating, and deleting user data.
4. Use the provided user name, 'abldmajid mohamed', for the actions.

### Backend Tasks (In ./config.env):

1. Create a `.env` file in the project root directory if it doesn't already exist.
2. Add the following environment variables to the `.env` file:

```env
CLOUDINARY_NAME=dktkavyr3
CLOUDINARY_API_KEY=512456381976955
CLOUDINARY_API_SECRET=VX3uSTA7F6pbsIO_5uFRB6Kiuls
CLOUDINARY_URL=cloudinary://512456381976955:VX3uSTA7F6pbsIO_5uFRB6Kiuls@dktkavyr3
CLOUDINARY_UPLOAD_URL=https://api.cloudinary.com/v1_1/dktkavyr3/video/upload
MONGO_URI="mongodb+srv://raymondyounes:cu4yLypyIbmMfL7K@younes-dev.enszkpk.mongodb.net/test"
PORT=4000
```

3. Save the `.env` file with the specified environment variables.

### Backend Database Connection:

1. Connect the backend to the MongoDB database using the provided `MONGO_URI`.
2. Ensure that the MongoDB connection is established and the database is accessible.

After completing these tasks, the frontend should be able to interact with the backend for updating the village model using the user actions.
```

