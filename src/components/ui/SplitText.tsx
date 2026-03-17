'use client'

import { useRef, useEffect } from 'react'

interface SplitTextProps {
  text: string
  className?: string
  wordClassName?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

export function SplitText({
  text,
  className = '',
  wordClassName = '',
  as: Tag = 'div',
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null)

  const words = text.split(/\s+/)

  return (
    <Tag ref={containerRef as React.RefObject<HTMLElement & HTMLDivElement>} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className={`inline-block ${wordClassName}`}
          data-word-index={i}
        >
          {word}
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  )
}
