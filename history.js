const fs = require('fs');
const path = require('path');

// Function to get the last N log entries from a user's log file
const getRecentLogs = (userId, count) => {
  const logFilePath = path.join(__dirname, 'logs', `${userId}.json`);

  try {
    const logs = JSON.parse(fs.readFileSync(logFilePath, 'utf8')).slice(-count);
    return logs.reverse(); // Reverse to display the most recent logs first
  } catch (error) {
    console.error('Error reading log file:', error);
    return [];
  }
};

// Function to format a log entry into a table row
const formatLogRow = (log) => {
    const { DocumentID, method, path, timestamp, body, params } = log;
    return `
      <tr>
        <td>${log.user}</td>
        <td>${DocumentID}</td>
        <td>${method}</td>
        <td>${path}</td>
        <td>${timestamp}</td>
        <td><button type="button" class="btn btn-primary" data-toggle="popover" data-content="${JSON.stringify(body)}">View</button></td>
        <td><button type="button" class="btn btn-primary" data-toggle="popover" data-content="${JSON.stringify(params)}">View</button></td>
      </tr>
    `;
  };
  

// Function to generate the history table
const generateHistoryTable = (userId, count) => {
    const logs = getRecentLogs(userId, count);
    if (logs.length === 0) return '<div class="alert alert-info">No history found.</div>';
  
    let table = `
    <div class="table-responsive">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">User</th>
            <th scope="col">List Number</th>
            <th scope="col">Operator</th>
            <th scope="col">Document ID</th>
            <th scope="col">Method</th>
            <th scope="col">Path</th>
            <th scope="col">Time</th>
            <th scope="col">Body</th>
            <th scope="col">Data</th>
          </tr>
        </thead>
        <tbody>
    `;
    logs.forEach((log, index) => {
      table += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${log.user}</td>
        <td>${log.DocumentID}</td>
        <td>${log.method}</td>
        <td>${log.path}</td>
        <td>${log.timestamp}</td>
        <td><a href="#" onclick="showDetails('${JSON.stringify(log.body)}')">View</a></td>
        <td><a href="#" onclick="showDetails('${JSON.stringify(log.params)}')">View</a></td>
      </tr>
      `;
    });
    table += `
        </tbody>
      </table>
    </div>
    `;
    return table;
  };  

module.exports = {
  generateHistoryTable,
};
