const { io } = require("socket.io-client");
const socket = io("https://credsafe.server.mrinmoymondal.ml/");
export default socket;