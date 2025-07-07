require('dotenv').config();
const streamChat = require('stream-chat');
const apikey = process.env.STREAM_KEY;
const secret = process.env.SECERET_KEY;
if(!apikey || !secret) {
  console.error('STREAM_KEY and SECERET_KEY must be set in the environment variables');
}
const serverClient = StreamChat.getInstance(apikey, secret);
const token = serverClient.createToken('john');
module.exports = {token }