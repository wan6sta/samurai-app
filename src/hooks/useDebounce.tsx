import { useEffect, useState } from 'react'

export function useDebounce(value: string) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, 600)

		return () => {
			clearTimeout(handler)
		}
	}, [value])

	return debouncedValue
}
