import poll from '@qubit/poller'

export default function runMapper () {
  window.xp_events = []

  function emitEvent (event) {
    window.xp_events.push(event)
  }

  return poll('window.digitalData').then(dataLayer => {
    emitEvent({
      eventName: 'xpView'
    })
  })
}
