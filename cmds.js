let genRequest = (id, methodId, properties) => {
  return { version: "1.0.0", id, methodId, properties };
};

let genRequest_NEP = (id, methodId, params) => {
  return { version: "1.0.0", methodId, params };
};

let genRequest_BRF = (id, methodId, params) => {
  return [1, 2, 3, 4];
};

module.exports = {
  ping: function (id) {
    return genRequest(id, "ping", {});
  },
  describeChannels: function (id) {
    return genRequest(id, "signalRecording.describeChannels", {});
  },
  error_NEP: function (id) {
    // не достаточно параметров
    return genRequest_NEP(id, "ping", {});
  },
  error_BRF: function (id) {
    // не достаточно параметров
    return genRequest_BRF(id, "ping", {});
  },
  signalRecordingStop: function (id) {
    return genRequest(id, "signalRecording.stop", {
      recordingId: 1,
    });
  },
  signalRecordingStart: function (id) {
    return genRequest(id, "signalRecording.start", {
      frameIntervalMillis: 101,
      recordingId: 1,
      measurementsFrame: 102,
      channels: [
        {
          channelId: 1,
          gainMultiplier: 0.2,
          recordings: [
            { transformId: 1, recordingPath: "/fdg/dfgdfg" },
            { transformId: 2, recordingPath: "/dsfsdf//sdfsdf" },
          ],
        },
        {
          channelId: 2,
          gainMultiplier: 0.3,
          recordings: [
            { transformId: 3, recordingPath: "/fdg/dfgdfg/ssdf" },
            { transformId: 4, recordingPath: "/dsfsdf//sdfsdf/sdfsdf" },
          ],
        },
      ],
    });
  },
};
