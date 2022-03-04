let cmds = require("./cmds.js");

console.log(cmds.ping("1"));

var WebSocketClient = require("websocket").client;

let host = "127.0.0.1";
let port = "8888";
let client = new WebSocketClient();
let id = 1;

client.on("connectFailed", (error) => {
  console.log(error);
});

client.on("connect", async (connection) => {
  let sleep = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  console.log("connected");
  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on("close", function () {
    console.log("echo-protocol Connection Closed");
  });
  connection.on("message", function (message) {
    if (message.type === "utf8") {
      console.log(JSON.parse(message.utf8Data));
      //console.log("Received: '" +  + "'");
    }
  });

  // =====
  connection.sendUTF(JSON.stringify(cmds.error_BRF(id++)));
  await sleep(1000);
  connection.sendUTF(JSON.stringify(cmds.error_NEP(id++)));
  await sleep(1000);

  // =====
  connection.sendUTF(JSON.stringify(cmds.ping(id++)));
  await sleep(1000);

  // =====
  connection.sendUTF("sdfgsdfsdfsdf");
  await sleep(1000);

  // =====
  connection.sendUTF(JSON.stringify(cmds.describeChannels(id++)));
  await sleep(1000);
});

client.connect("ws://127.0.0.1:8888/");
