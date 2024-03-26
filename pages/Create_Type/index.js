'use client'

import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"


const createType = () => {
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
    <div>
      <button onClick={handleHome}>HOME</button>
    </div>
      <form onSubmit={handleSubmit}>
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
    </>
  )
}

export default createType