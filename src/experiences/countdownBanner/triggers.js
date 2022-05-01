export default function triggers (options, cb) {
  const { log, state, poll } = options

  log.info('Triggers')

  return pollForElements().then(cb)

  function pollForElements () {
    log.info('Polling for elements')
    return poll('#athemes-blocks-block-428d2d54').then(anchor => {
      state.set('anchor', anchor)
    })
  }
}
