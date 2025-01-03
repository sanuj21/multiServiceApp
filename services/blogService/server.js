// This is the entry point for the blog service. It starts the service and listens on port 3000.

import app from './app.js';

app.listen(3001, () => {
  console.log('Blog service listening on port 3001');
});
