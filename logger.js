const fs = require('fs');
const path = require('path');
const { getNextDocumentID } = require('./documentID');

// Function to log requests
const logRequest = (req, params = {}) => {
  // Read the exclusion list from exclusions.json
  const exclusionsFilePath = path.join(__dirname, './public/exclusions.json');
  const exclusions = JSON.parse(fs.readFileSync(exclusionsFilePath, 'utf8'));

  // Check if the requested path is in the exclusion list
  if (exclusions.includes(req.originalUrl)) {
    return;
  }

  const logEntry = {
    DocumentID: getNextDocumentID(),
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
    user: req.headers['user'] || 'anonymous', // Eventually change to req.user.username from a LDAP or OAuth2 strategy
    body: req.body || {},
    params: params,
  };

  // Determine the user's log file path
  const userFile = path.join(__dirname, 'logs', `${logEntry.user}.json`);

  // Read the existing logs
  fs.readFile(userFile, 'utf8', (err, data) => {
    let logs = [];
    if (!err && data) {
      logs = JSON.parse(data);
    }

    // Append the new log entry
    logs.push(logEntry);

    // Write the updated logs back to the file
    fs.writeFile(userFile, JSON.stringify(logs, null, 2), (err) => {
      if (err) {
        console.error('Failed to write log:', err);
      }
    });
  });
};

// Middleware to handle logging for different request types
const logger = (req, res, next) => {
  switch (req.method) {
    case 'GET':
      logGET(req);
      break;
    case 'PUT':
      logPUT(req);
      break;
    case 'POST':
      logPOST(req);
      break;
    case 'DELETE':
      logDELETE(req);
      break;
    default:
      logRequest(req);
  }
  next();
};

// Functions for different request types
const logGET = (req) => {
  const params = { query: req.query };
  logRequest(req, params);
};

const logPUT = (req) => {
  const params = { update: req.body };
  logRequest(req, params);
};

const logPOST = (req) => {
  const params = { data: req.body };
  logRequest(req, params);
};

const logDELETE = (req) => {
  const params = { id: req.body.id };
  logRequest(req, params);
};

module.exports = logger;
