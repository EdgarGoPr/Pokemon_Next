'use client'

import Cards from "@/components/Cards";
import Nav from "@/components/Nav";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Landing from "./Unauth";
import { useRouter } from "next/router";


export default function myPage() {
  const [query, setQuery] = useState('');
  const [types, setTypes] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [user, setUser] = useState({})
  const { data: session } = useSession()

  const router = useRouter()



  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch('/api/get/get_types');
        const result = await response.json();
        const sortedTypes = result.data.sort((a, b) => a.name.localeCompare(b.name));
        setTypes(sortedTypes);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    fetchTypes();

    if (!!session) {
      const User = async (session) => {
        // console.log('session.user', session.user)
        const response = await fetch(`/api/get/get_user?email=${session.user.email}`);
        // console.log('response', response)
        const result = await response.json();
        // console.log('result', result)
        if (result.data) {
          console.log('estoy aqui')
          const usuario = result.data
          setUser(usuario)
        } else {
          try {
            // console.log('benvenuto')
            // console.log('session.user', session.user.uid)
            const data = {
              uid: session.user.uid,
              name: session.user.name,
              image: session.user.image,
              email: session.user.email,
              username: session.user.username
            }
            // console.log('data', data)
            const response = await fetch('/api/post/create_user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                data: data
              })

            })
            const result = await response.json();
            // console.log('result.data', result.data)
            const usuario = result.data
            // console.log('usuario', usuario)
            setUser(usuario)
          } catch (error) {
            alert('Hubo un error con el usuario')
          }
        }

      }
      User(session)
    }
  }, [session]);

  if (user.name) {
    console.log('user', user)
  }


  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleFilter = async (value) => {
    setFilter(value);
  };

  const filterOptions = [
    { value: '', label: 'SELECT TYPE' },
    ...types.map((type) => ({ value: type.name, label: type.name.toUpperCase() })),
  ];

  console.log('filter', filter)

  const handleSort = async (value) => {
    setSort(value);
  };

  const sortOptions = [
    { value: '', label: 'SELECT ORDER' },
    { value: 'az', label: 'ASCENDING' },
    { value: 'za', label: 'DESCENDING' },
    { value: 'max', label: 'MAX ATTACK' },
    { value: 'min', label: 'MIN ATTACK' },
    { value: 'idnum', label: 'IDENT NUM' },
  ];

  const handleReset = async () => {
    setFilter('')
    setSort('')
  }

  if (session === null) return <Landing />

  return (
    <div>
      <div>
        <Head>
          <title>Pokemons</title>
        </Head>
      </div>
      <div>
        <Nav
          handleSearch={handleSearch}
          query={query}
          handleFilter={handleFilter}
          filter={filter}
          filterOptions={filterOptions}
          sort={sort}
          sortOptions={sortOptions}
          handleSort={handleSort}
          handleReset={handleReset}
        />
      </div>
      <div>
        <Cards searchQuery={query} type={filter} sort={sort} />
      </div>
    </div>
  );
}
