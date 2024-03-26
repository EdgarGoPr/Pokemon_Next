'use client'
import { signIn } from "next-auth/react";
import Head from "next/head";

export default function Landing() {
  return (
    <>
      <Head>
        <title>Pokemons | Sign In</title>
      </Head>
      <h1>Welcome to your Pokedex</h1>
      <button onClick={() => signIn('github')}>Enter with github</button>
      <button onClick={() => signIn('google')}>Enter with google</button>
    </>
  )
}
