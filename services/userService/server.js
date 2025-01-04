// This is the entry point for the user service.
import app from './app.js';

app.listen(process.env.USER_SERVICE_PORT, () => {
  console.log(
    `User service listening on port ${process.env.USER_SERVICE_PORT}`
  );
});
