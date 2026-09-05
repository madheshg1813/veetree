"use client"

import { useEffect, useRef, type ClipboardEvent, type KeyboardEvent } from "react"

interface Props {
  readonly value: string
  readonly length: number
  readonly disabled?: boolean
  readonly invalid?: boolean
  readonly describedBy?: string
  readonly onChange: (next: string) => void
  readonly onComplete: (code: string) => void
}

/**
 * One box per digit, the way every Indian checkout does it.
 *
 * The value is kept as a plain left-to-right prefix rather than one character
 * per box. That single invariant removes a whole class of bugs — no holes in
 * the middle, no ambiguity about which box a paste lands in — and it matches
 * how people actually type a code they are reading off a notification.
 */
export function OtpInput({
  value,
  length,
  disabled,
  invalid,
  describedBy,
  onChange,
  onComplete,
}: Props) {
  const boxes = useRef<(HTMLInputElement | null)[]>([])

  /**
   * The value as of the last commit. Focus moves synchronously, before React
   * has re-rendered with the new value, so the focus guard below cannot read
   * the prop — it would still see the previous digit count and bounce the
   * caret backwards on every keystroke.
   */
  const live = useRef(value)
  useEffect(() => {
    live.current = value
  }, [value])

  const focus = (i: number) => boxes.current[Math.max(0, Math.min(i, length - 1))]?.focus()

  const commit = (next: string) => {
    const trimmed = next.slice(0, length)
    live.current = trimmed
    onChange(trimmed)
    focus(trimmed.length)
    if (trimmed.length === length) onComplete(trimmed)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault()
      if (value.length > 0) commit(value.slice(0, -1))
      return
    }
    if (e.key === "ArrowLeft") { e.preventDefault(); focus(value.length - 1) }
    if (e.key === "ArrowRight") { e.preventDefault(); focus(value.length) }
  }

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const digits = e.clipboardData.getData("text").replace(/\D/g, "")
    if (digits) commit(digits)
  }

  return (
    <div
      className={`otpboxes ${invalid ? "is-error" : ""}`}
      role="group"
      aria-label={`${length}-digit verification code`}
      aria-describedby={describedBy}
    >
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => { boxes.current[i] = el }}
          value={value[i] ?? ""}
          // Typing always appends, and focus follows the caret, so a box can
          // never be filled out of order.
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "")
            if (digits) commit(value + digits)
          }}
          // Clicking ahead of what has been typed snaps back to the next empty
          // box, keeping the prefix intact.
          onFocus={() => { if (i > live.current.length) focus(live.current.length) }}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          aria-invalid={invalid ? "true" : undefined}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  )
}
