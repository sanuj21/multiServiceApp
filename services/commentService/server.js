// This is the entry point for the comment service.

import app from './app.js';

app.listen(process.env.COMMENT_SERVICE_PORT, () => {
  console.log(
    `Comment service listening on port ${process.env.COMMENT_SERVICE_PORT}`
  );
});
