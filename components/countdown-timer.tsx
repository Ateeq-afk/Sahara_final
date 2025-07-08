"use client"

import { useState, useEffect } from 'react'

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else {
          // Reset to 24 hours
          return { hours: 23, minutes: 59, seconds: 59 }
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="text-center">
        <div className="bg-orange-100 text-orange-700 rounded-lg px-3 py-2 min-w-[60px]">
          <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="text-xs uppercase">Hours</div>
        </div>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="text-center">
        <div className="bg-orange-100 text-orange-700 rounded-lg px-3 py-2 min-w-[60px]">
          <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="text-xs uppercase">Mins</div>
        </div>
      </div>
      <div className="text-2xl font-bold">:</div>
      <div className="text-center">
        <div className="bg-orange-100 text-orange-700 rounded-lg px-3 py-2 min-w-[60px]">
          <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="text-xs uppercase">Secs</div>
        </div>
      </div>
    </div>
  )
}