import poll from '@qubit/poller'

const experienceState = {}

function set (key, data) {
  experienceState[key] = data
}

function get (key) {
  return experienceState[key]
}

export default {
  poll,
  state: {
    set,
    get
  },
  log: {
    info: console.log,
    warn: console.warn,
    error: console.error
  }
}
