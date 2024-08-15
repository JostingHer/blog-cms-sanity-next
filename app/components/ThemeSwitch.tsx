'use client'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { SunSvg, MoonSvg } from './icons';

const ThemeSwitch = () => {

    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
     useEffect(() => setMounted(true), [])

  if (!mounted) return null;

  return (
        <button
            className="border border-purple-500 rounded-2xl p-1 hover:bg-purple-500 hover:bg-opacity-10 dark:hover:bg-opacity-10 dark:hover:bg-amber-50"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <SunSvg /> : <MoonSvg />}
        </button>
  )
}

export default ThemeSwitch