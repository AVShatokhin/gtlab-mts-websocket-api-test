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
  signalTransform: function (id) {
    return genRequest(id, "signalTransform", {
      transformId: "furie",
      sourcePath: "1.wav",
      destinationPath: "2.wav",
      transformParams: {},
    });
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
  plotter_start: function (id) {
    return genRequest(id, "plotter.start", {
      plotterId: 1,
      rangeStart: 2,
      rangeStop: 3,
    });
  },
  plotter_stop: function (id) {
    return genRequest(id, "plotter.stop", {
      plotterId: 1,
    });
  },
  plotter_plot: function (id) {
    return genRequest(id, "plotter.plot", {
      plotterId: 1,
      rangeStart: 2,
      rangeStop: 3,
    });
  },
  plotter_stop_Not_Found: function (id) {
    return genRequest(id, "plotter.stop", {
      plotterId: 2,
    });
  },
  plotter_selectStationaryIntervals: function (id) {
    return genRequest(id, "plotter.selectStationaryIntervals", {
      plotterId: 1,
    });
  },
  signalRecordingStop: function (id) {
    return genRequest(id, "signalRecording.stop", {
      recordingId: 1,
    });
  },
  signalRecordingStart: function (id) {
    return genRequest(id, "signalRecording.start", {
      recordingId: 1,
      visualIntervalMillis: 1000,
      visualFrameSize: 100,
      channels: [
        {
          channelId: 0,
          gainMultiplier: 0.12,
        },
        {
          channelId: 1,
          gainMultiplier: 0.21,
        },
        // {
        //   channelId: 2,
        //   gainMultiplier: 0.31,
        // },
        // {
        //   channelId: 3,
        //   gainMultiplier: 0.13,
        // },
      ],
    });
  },
};
