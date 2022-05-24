import { MutableRefObject, useRef, useState } from 'react'

export const useStateRef = <T extends any>(
  initialValue: T
): [T, (value: T) => void, MutableRefObject<T>] => {
  const [value, _setValue] = useState<T>(initialValue)
  const valueRef = useRef<T>(value)

  const setValue = (newValue: T) => {
    valueRef.current = newValue
    _setValue(newValue)
  }

  return [value, setValue, valueRef]
}
