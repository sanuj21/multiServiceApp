// This is the entry point for the user service. It starts the service and listens on port 3000.

import app from './app.js';

app.listen(3000, () => {
  console.log('Users service listening on port 3000');
});
