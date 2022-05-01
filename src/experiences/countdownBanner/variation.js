import { render, h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import utils from '@qubit/utils'
import './variation.less'

export default function variation (options) {
  const { insertAfter } = utils()
  const { log, state } = options
  const prefix = 'xp-countdown-banner'
  const anchor = state.get('anchor')
  const copy = 'Hurry! Our sale ends soon!'

  log.info('Variation')

  return renderPlacement()

  function renderPlacement () {
    const element = document.createElement('div')
    element.className = prefix
    render(<Container />, element)
    insertAfter(anchor, element)
  }

  function Container () {
    const containerClass = `${prefix}-container`
    return (
      <div className={containerClass}>
        <div className={`${containerClass}__title`}>{copy}</div>
        <Countdown />
        <a className={`${containerClass}__cta`} href='/shop'>Find out more</a>
      </div>
    )
  }

  function useCountdownTimer (date) {
    function calculateTimeLeft () {
      const difference = +new Date(date) - +new Date()

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft())
      }, 1000)
      return () => {
        clearTimeout(timer)
      }
    })

    return timeLeft
  }

  function Countdown () {
    const countdownClass = `${prefix}-countdown`
    const timeLeft = useCountdownTimer(`December 25, 2022`)
    const timerComponents = Object.keys(timeLeft).map(interval => (
      <span>
        {timeLeft[interval]} {interval}{' '}
      </span>
    ))

    return (
      <div className={countdownClass}>
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
    )
  }
}
