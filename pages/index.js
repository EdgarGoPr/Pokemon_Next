'use client'
import Head from "next/head";
import { useRouter } from "next/router"

export default function Landing() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/home')
  }

  return (
    <>
      <Head>
        <title>Pokemons | Sign In</title>
      </Head>
      <h1>Welcome to your Pokedex</h1>
      <button onClick={handleHome}>Let´s enter!</button>
    </>
  )
}
