import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Languages } from 'lucide-react'
import './LanguageDropdown.css'

function LanguageDropdown({
  value,
  onChange,
  options,
  label = 'Select investigation language',
  compact = false,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const optionRefs = useRef([])
  const listboxId = useId()

  const selectedIndex = Math.max(
    options.findIndex((option) => option.code === value),
    0
  )
  const selectedOption = options[selectedIndex]

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  const focusOption = (index) => {
    if (options.length === 0) return

    const nextIndex = (index + options.length) % options.length
    setActiveIndex(nextIndex)
    optionRefs.current[nextIndex]?.focus()
  }

  const openDropdown = (index = selectedIndex) => {
    if (options.length === 0) return

    const nextIndex = Math.min(index, options.length - 1)
    setActiveIndex(nextIndex)
    setIsOpen(true)
    requestAnimationFrame(() => optionRefs.current[nextIndex]?.focus())
  }

  const closeDropdown = (restoreFocus = false) => {
    setIsOpen(false)
    if (restoreFocus) triggerRef.current?.focus()
  }

  const selectOption = (option) => {
    onChange(option.code)
    closeDropdown(true)
  }

  const handleTriggerKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      openDropdown(selectedIndex)
    } else if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      closeDropdown(true)
    }
  }

  const handleOptionKeyDown = (event, index) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        focusOption(index + 1)
        break
      case 'ArrowUp':
        event.preventDefault()
        focusOption(index - 1)
        break
      case 'Home':
        event.preventDefault()
        focusOption(0)
        break
      case 'End':
        event.preventDefault()
        focusOption(options.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        selectOption(options[index])
        break
      case 'Escape':
        event.preventDefault()
        closeDropdown(true)
        break
      case 'Tab':
        closeDropdown()
        break
      default:
        break
    }
  }

  return (
    <div
      ref={rootRef}
      className={`relative z-20 ${
        compact ? 'w-36 shrink-0 max-[359px]:w-[7.5rem]' : 'w-full sm:w-auto'
      }`}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${label}: ${selectedOption?.name ?? 'No language selected'}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        onKeyDown={handleTriggerKeyDown}
        className={`flex min-h-11 w-full max-w-full items-center gap-3 rounded-xl border border-outline-variant/50 bg-card px-3 py-2.5 text-left text-sm text-on-surface transition-colors hover:border-primary/50 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
          compact ? 'min-w-0' : 'sm:min-w-64'
        }`}
      >
        <Languages size={18} className="shrink-0 text-primary-strong" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate">
          {selectedOption?.name ?? 'Select language'}
        </span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`shrink-0 text-outline transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Investigation language options"
          className="language-dropdown-panel absolute left-0 top-[calc(100%+0.5rem)] z-[60] max-h-[min(18rem,calc(100dvh-2rem))] w-72 max-w-[calc(100vw-4rem)] overflow-y-auto rounded-xl border border-outline-variant bg-card p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
        >
          {options.map((option, index) => {
            const isSelected = option.code === value
            const isActive = index === activeIndex

            return (
              <div
                key={option.code}
                ref={(element) => {
                  optionRefs.current[index] = element
                }}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
                onClick={() => selectOption(option)}
                onKeyDown={(event) => handleOptionKeyDown(event, index)}
                className={`flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive || isSelected
                    ? 'bg-surface-container-high text-on-surface'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                    isSelected
                      ? 'border-primary bg-primary'
                      : 'border-outline/50'
                  }`}
                >
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-on-primary" />}
                </span>
                <span className="min-w-0 flex-1">{option.name}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
