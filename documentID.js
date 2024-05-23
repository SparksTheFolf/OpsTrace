const fs = require('fs');
const path = require('path');

const documentIdFilePath = path.join(__dirname, 'DocumentIDLast.txt');

// Function to get the next DocumentID
const getNextDocumentID = () => {
  const currentId = fs.readFileSync(documentIdFilePath, 'utf8');
  const nextId = parseInt(currentId, 10) + 1;
  fs.writeFileSync(documentIdFilePath, nextId.toString());
  return nextId;
};

module.exports = {
  getNextDocumentID,
};
