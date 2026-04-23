import React, { useEffect, useState } from 'react'
import LogoLoader from "#/components/LogoLoader.tsx";

const AppBootLoader = ({
  children,
  minMs = 4800,
  loading = false,
}: {
  children?: React.ReactNode
  minMs?: number
  loading?: boolean
}) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const start = performance.now()
    let timeoutId: any

    const onReady = () => {
      const elapsed = performance.now() - start
      const remaining = Math.max(0, minMs - elapsed)

      timeoutId = window.setTimeout(() => setShow(false), remaining)
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      onReady()
    } else {
      window.addEventListener('load', onReady, { once: true })
    }

    return () => {
      window.removeEventListener('load', onReady)
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [minMs])

  return (
    <>
      {children}

      {(show || loading) && (
        <div
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-background
          "
        >
          <LogoLoader />
        </div>
      )}
    </>
  )
}

export default AppBootLoader