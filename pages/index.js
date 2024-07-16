'use client'

import Cards from "@/components/Cards";
import Nav from "@/components/Nav";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import Landing from "./Unauth";
import { useRouter } from "next/router";
import styles from "@/pages/(Styles)/index.module.css"


export default function MyPage() {
  const [query, setQuery] = useState('');
  const [types, setTypes] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [user, setUser] = useState({})
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [total, setTotal] = useState(1)
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
      const totalPoke = async (searchQuery, filter, sort) => {
        try {
          let response = await fetch(`/api/get/get_poke?name=${query}&type=${filter}&sort=${sort}`);
          let pok = await response.json();
          setTotal(pok.total);
        } catch (error) {
          console.log("Error:", error);
        }
      }

      User(session)
      totalPoke(query, filter, sort)
    }
  }, [session, query, filter, sort]);

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
  const handlePage = async (value) => {
    setPage(value)
  }

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

  const numPages = Math.ceil(total / pageSize);

  if (session === null) return <Landing />

  return (
    <div>
      <div>
        <Head>
          <title>POKE APP</title>
        </Head>
      </div>
      <div className={styles['container']}>
        <div className={styles['nav']}>
          <div className={styles['stick']}>
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
        </div>

        <div className={styles['cards']}>
          <div>
            <h1 className={styles['title']}>
              Pokemon Cards!
            </h1>
          </div>
          <Cards searchQuery={query} type={filter} sort={sort} page={page} pageSize={pageSize} />
          <div className={styles['page']}>
            {/* Botones de paginación */}
            {[...Array(numPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePage(index + 1)}
                className={styles['pageButton']}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
