// This is the entry point for the blog service.

import app from './app.js';

app.listen(process.env.PORT, () => {
  console.log(`Blog service listening on port ${process.env.PORT}`);
});
