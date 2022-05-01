import options from './options'

export default function ({ triggers, variation }) {
	return () => triggers(options, () => variation(options))
}