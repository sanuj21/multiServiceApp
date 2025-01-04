// This is the entry point for the blog service.

import app from './app.js';

app.listen(process.env.BLOG_SERVICE_PORT, () => {
  console.log(
    `Blog service listening on port ${process.env.BLOG_SERVICE_PORT}`
  );
});
