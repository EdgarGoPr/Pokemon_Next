'use client'
import { signIn } from "next-auth/react";
import Head from "next/head";
import styles from "@/pages/(Styles)/landing.module.css"

export default function Landing() {
  return (
    <>
      <Head>
        <title>Pokemons | Sign In</title>
      </Head>
      <div className={styles['container']}>
        <h1>Edgar Gonzalez de Prada</h1>
        <h2>Pokedex with complete CRUD</h2>
        <button onClick={() => signIn('github')} className={styles['button']}>Enter with github</button>
        <button onClick={() => signIn('google')} className={styles['button']}>Enter with google</button>
      </div>
    </>
  )
}
