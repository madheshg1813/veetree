"use client"

import { useId, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

/**
 * A password input with a reveal toggle.
 *
 * People mistype passwords they cannot see, and on a phone that is most of the
 * reason a sign-in fails twice before it works. The toggle is a `type="button"`
 * so pressing it never submits the form, and it reports its state through
 * `aria-pressed` so it is not a mystery to a screen reader.
 *
 * The field always starts hidden: revealing is a deliberate act by the person
 * typing, not the default in a room where someone may be looking over.
 */
export function PasswordField({
  label,
  value,
  onChange,
  autoComplete,
  minLength,
  required,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  autoComplete: "current-password" | "new-password"
  minLength?: number
  required?: boolean
}) {
  const [shown, setShown] = useState(false)
  const id = useId()

  return (
    <label htmlFor={id}>
      <span>{label}</span>
      <span className="pwfield">
        <input
          id={id}
          type={shown ? "text" : "password"}
          autoComplete={autoComplete}
          minLength={minLength}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          className="pwfield__eye"
          onClick={() => setShown((s) => !s)}
          aria-pressed={shown}
          aria-label={shown ? "Hide password" : "Show password"}
          title={shown ? "Hide password" : "Show password"}
        >
          {shown ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        </button>
      </span>
    </label>
  )
}
