'use client'

import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import styles from "@/pages/(Styles)/creType.module.css"


const CreateType = () => {
  const router = useRouter()
  const [error, setError] = useState({})
  const [form, setForm] = useState({
    name: '',
  })

  const handleChange = (event) => {
    const {name, value} = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const errors = {};
    if (form.name.trim() === "") {
      errors.name = "Name is required";
    }
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const newType = {
      name: form.name.toLowerCase()
    }
    fetch('/api/post/create_type', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data: newType}),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('New type created', data);
      window.alert(data.message);
      router.push('/')
    })
  }

  const handleHome = () => {
    router.push('/')
  }

  return (
    <>
  <Head>
    <title>Type | Create</title>
  </Head>
  <div className={styles['home-button-container']}>
    <button onClick={handleHome}>HOME</button>
  </div>
  <div className={styles['main-container']}>
    <form onSubmit={handleSubmit} className={styles['form-container']}>
      <div>
        <input
          type='text'
          name='name'
          placeholder="NAME"
          value={form.name}
          onChange={handleChange}
        />
      </div>
      <div>
        {error.name && <p>{error.name}</p>}
      </div>
      <div>
        <button type="submit">CREATE TYPE</button>
      </div>
    </form>
  </div>
</>
  )
}

export default CreateType