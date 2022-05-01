import { render, h } from 'preact'
import { useEffect, useRef } from 'preact/hooks'
import utils from '@qubit/utils'
import Glide from '@glidejs/glide'
import './variation.less'

export default function variation (options) {
  const { appendChild } = utils()
  const { log, state } = options
  const anchor = state.get('anchor')
  const prefix = 'xp-exitIntent'
  const content = {
    headline: 'Wait! Before you go...',
    subtitle: 'You may also like',
    recs: [
      { title: 'Product Title' },
      { title: 'Product Title' },
      { title: 'Product Title' },
      { title: 'Product Title' },
      { title: 'Product Title' }
    ]
  }

  const glideOptions = {
    type: 'slider',
    bound: true,
    perView: 3.5,
    gap: 8,
    scrollLock: true,
    rewind: false,
    breakpoints: {
      767: {
        perView: 1.25,
        gap: 8
      }
    }
  }

  return fire()

  function fire () {
    log.info('Running experience')
    const element = createElement()
    renderPlacement(element)
  }

  function createElement () {
    const element = document.createElement('div')
    element.classList.add(prefix)
    appendChild(anchor, element)
    return element
  }

  function renderPlacement (element) {
    render(
      <Placement>
        <Carousel />
      </Placement>,
      element
    )
  }

  function Placement ({ children }) {
    const containerClass = `${prefix}-container`

    const handleClose = () => {
      const experience = document.querySelector(`.${containerClass}`)
      experience.parentElement.removeChild(experience)
    }

    return (
      <div className={containerClass}>
        <div class={`${containerClass}__header`}>
          <div className={`${containerClass}__title`}>{content.headline}</div>
          <div className={`${containerClass}__subtitle`}>{content.subtitle}</div>
          <button
            className={`${containerClass}__close`}
            onClick={handleClose}
          >X</button>
        </div>
        {children}
      </div>
    )
  }

  function Carousel () {
    const carouselClass = `${prefix}-carousel`
    const carouselContainer = useRef()

    useEffect(() => {
      const glide = new Glide(`.${carouselClass}`, glideOptions)
      glide.mount()
      return () => glide.destroy()
    }, [])

    return (
      <div class={carouselClass} ref={carouselContainer}>
        <Arrows carouselClass={carouselClass} />
        <div class={`${carouselClass}__track`} data-glide-el='track'>
          <ul class={`${carouselClass}__slides`}>
            {content.recs.map((rec, i) => (
              <Slide key={i} {...rec} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  function Arrows ({ carouselClass }) {
    const arrowClass = `${prefix}-arrow`
    return (
      <div class={`${carouselClass}__arrows`} data-glide-el='controls'>
        <div
          class={`${arrowClass} ${arrowClass}--left previous`}
          data-glide-dir='<'
        >
          <svg
            width='14'
            height='23'
            viewBox='0 0 14 23'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M-3.8147e-06 11.5L0.567094 12.0579L11.7345 23L13.3376 21.8842L2.73731 11.5L13.3376 1.11581L11.7345 0L0.567094 10.9421L-3.8147e-06 11.5Z'
              fill='#979797'
            />
          </svg>
        </div>
        <div class={`${arrowClass} next`} data-glide-dir='>'>
          <svg
            width='14'
            height='23'
            viewBox='0 0 14 23'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M14 11.5L13.4329 10.9421L2.26547 -1.90735e-06L0.662354 1.1158L11.2627 11.5L0.662354 21.8842L2.26547 23L13.4329 12.0579L14 11.5Z'
              fill='black'
            />
          </svg>
        </div>
      </div>
    )
  }

  function Slide () {
    const slideClass = `${prefix}-slide`

    return (
      <a className={slideClass}>
        <div className={`${slideClass}__image`}>
          <img src={'https://picsum.photos/200'} />
        </div>
        <div className={`${slideClass}__content`}>
          <div className={`${slideClass}__title`}>
            Product Name
          </div>
          <div
            className={`${slideClass}__old-price ${slideClass}__old-price--strike`}
          >
            £10.00
          </div>
          <div className={`${slideClass}__new-price`}>
            <div className={`${slideClass}__price-value`}>£12.00</div>
            <div className={`${slideClass}__price-saved`}>£12.00</div>
          </div>
        </div>
      </a>
    )
  }
}
