import classNames from "classnames"
import { useRef, useEffect } from "react"
import { InputCheckboxComponent } from "./types"

export const InputCheckbox: InputCheckboxComponent = ({ id, checked = false, disabled, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const { current: inputEl } = inputRef
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault()
        inputEl?.click()
      }
    }
    inputEl?.addEventListener("keydown", handleKeyDown)
    return () => {
      inputEl?.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="RampInputCheckbox--container" data-testid={`RampInputCheckbox-${id}`}>
      <input
        ref={inputRef}
        id={`RampInputCheckbox-${id}`}
        type="checkbox"
        className="RampInputCheckbox--input"
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(!checked)}
      />
      <label
        className={classNames("RampInputCheckbox--label", {
          "RampInputCheckbox--label-checked": checked,
          "RampInputCheckbox--label-disabled": disabled,
        })}
        htmlFor={`RampInputCheckbox-${id}`}
      />
    </div>
  )
}
