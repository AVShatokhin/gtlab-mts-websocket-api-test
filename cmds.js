let genRequest = (id, methodId, params) => {
  return { version: "1.0.0", id, methodId, params };
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
};
