"use client"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex gap-6">
      <Link href="/" className="hover:underline">🏠 Home</Link>
      <Link href="/add-vehicle" className="hover:underline">➕ Add Vehicle</Link>
      <Link href="/search-book" className="hover:underline">🔍 Search & Book</Link>
    </nav>
  )
}
