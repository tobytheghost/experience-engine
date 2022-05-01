import Promise from 'sync-p'
import checkInactivity from '@qubit/check-inactivity'
import checkExit from '@qubit/check-exit'

export default function triggers (options, cb) {
  const { log, poll, state } = options
  const inactivityTime = 10

  return pollForElements().then(checkDeviceType)
    .then(checkForExitIntentOrInactivity)
    .then(cb)

  function pollForElements () {
    return poll('body').then(anchor => {
      state.set('anchor', anchor)
    })
  }

  function checkDeviceType () {
    log.info('Checking device type')
    return new Promise(resolve => {
      const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
      return resolve(isMobileOrTablet)
    })
  }

  function checkForExitIntentOrInactivity (isMobileOrTablet) {
    return new Promise(resolve => {
      if (isMobileOrTablet) {
        log.info('Checking for inactivity')
        return checkInactivity(inactivityTime, resolve)
      }
      log.info('Checking for exit intent')
      const exitIntent = checkExit(resolve)
      exitIntent.init()
    })
  }
}
