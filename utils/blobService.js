require('dotenv').config();
const { BlobServiceClient } = require('@azure/storage-blob');

const containerName = 'academy';
console.log('blobServiceClient -->', process.env.AZURE_STORAGE_CONNECTION_STRING);
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);

const containerClient = blobServiceClient.getContainerClient(containerName);

async function readJsonBlob(filename) {
  const blockBlobClient = containerClient.getBlockBlobClient(filename);
  const downloadBlockBlobResponse = await blockBlobClient.download(0);
  const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);
  return JSON.parse(downloaded);
}

async function writeJsonBlob(filename, data) {
  const blockBlobClient = containerClient.getBlockBlobClient(filename);
  const jsonData = JSON.stringify(data, null, 2);
  await blockBlobClient.upload(jsonData, Buffer.byteLength(jsonData), { overwrite: true });
}

// Utilitaire pour convertir un stream en string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => chunks.push(data.toString()));
    readableStream.on("end", () => resolve(chunks.join("")));
    readableStream.on("error", reject);
  });
}

module.exports = {
  readJsonBlob,
  writeJsonBlob
};
