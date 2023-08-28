const express = require('express');
const path = require('path');

const app = express();

// Middleware to force HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  return next();
});

// Serve static files
app.use(express.static(path.join(__dirname, '')));

// Send all requests to `index.html`
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
