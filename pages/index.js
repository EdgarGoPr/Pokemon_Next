'use client'
import { useRouter } from "next/router"

export default function Landing() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/home')
  }

  return (
    <>
      <h1>Welcome to your Pokedex</h1>
      <button onClick={handleHome}>Let´s enter!</button>
    </>
  )
}
