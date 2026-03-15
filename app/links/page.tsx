"use client"

import { useEffect } from "react"

const LINKTREE_URL = "https://linktree.compreitodos.com"

export default function LinksRedirect() {
  useEffect(() => {
    window.location.href = LINKTREE_URL
  }, [])

  return null
}
