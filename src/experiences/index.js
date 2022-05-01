import createExperience from './createExperience'

// Experiences
import countdownBanner from './countdownBanner'
import exitIntent from './exitIntent'

export default [createExperience(countdownBanner), createExperience(exitIntent)]
