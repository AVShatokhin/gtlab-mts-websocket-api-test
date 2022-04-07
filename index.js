// let debug = "PING";
// let debug = "ERRORS";
// let debug = "SIGNALS";
// let debug = "PLOTTER";
let debug = "TRANSFORM";

let cmds = require("./cmds.js");

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
      }, ms);
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
    }
  });

  if (debug == "PING") {
    for (j = 0; j < 100; j++) {
      connection.sendUTF(JSON.stringify(cmds.ping(id++)));
      await sleep(100);
    }
    await sleep(5000);
    process.exit(0);
  } else if (debug == "ERRORS") {
    connection.sendUTF(JSON.stringify(cmds.error_BRF(id++)));
    await sleep(100);
    connection.sendUTF(JSON.stringify(cmds.error_NEP(id++)));
    await sleep(100);
    connection.sendUTF("sdfgsdfsdfsdf");
    await sleep(5000);
    process.exit(0);
  } else if (debug == "SIGNALS") {
    connection.sendUTF(JSON.stringify(cmds.describeChannels(id++)));
    await sleep(100);

    connection.sendUTF(JSON.stringify(cmds.signalRecordingStart(id++)));
    await sleep(5000);
    connection.sendUTF(JSON.stringify(cmds.signalRecordingStop(id++)));

    connection.sendUTF(JSON.stringify(cmds.signalRecordingStart(id++)));
    await sleep(5000);
    connection.sendUTF(JSON.stringify(cmds.signalRecordingStop(id++)));

    await sleep(5000);
    process.exit(0);
  } else if (debug == "PLOTTER") {
    for (j = 0; j < 10000; j++) {
      connection.sendUTF(JSON.stringify(cmds.plotter_start(id++)));
      await sleep(50);
      connection.sendUTF(
        JSON.stringify(cmds.plotter_selectStationaryIntervals(id++))
      );
      await sleep(50);
      connection.sendUTF(JSON.stringify(cmds.plotter_plot(id++)));
      await sleep(50);
      connection.sendUTF(JSON.stringify(cmds.plotter_stop(id++)));
      await sleep(50);
      connection.sendUTF(JSON.stringify(cmds.plotter_plot(id++))); // not found
      await sleep(50);
      connection.sendUTF(
        JSON.stringify(cmds.plotter_selectStationaryIntervals(id++))
      ); // not found
      await sleep(50);
      connection.sendUTF(JSON.stringify(cmds.plotter_stop_Not_Found(id++)));
      await sleep(50);
    }
    await sleep(5000);
    process.exit(0);
  } else if (debug == "TRANSFORM") {
    connection.sendUTF(JSON.stringify(cmds.signalTransform(id++)));
    await sleep(5000);
    process.exit(0);
  }
});

client.connect("ws://127.0.0.1:8888/");
