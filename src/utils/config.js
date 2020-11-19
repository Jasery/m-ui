let config = Object.freeze({});

export function setConfig(cfg = {}) {
  config = Object.freeze(cfg);
}

export function getConfig() {
  return config;
}
