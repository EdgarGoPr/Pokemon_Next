'use client'

import Cards from "@/components/Cards";
import Nav from "@/components/Nav";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function myPage() {
  const [query, setQuery] = useState('');
  const [types, setTypes] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');

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
  }, []);

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

  const handleSort = async (value) => {
    setSort(value);
  };

  const sortOptions = [
    { value: '', label: 'SELECT ORDER' },
    { value: 'az', label: 'ASCENDING' },
    { value: 'za', label: 'DESCENDING' },
    { value: 'max', label: 'MAX ATTACK' },
    { value: 'min', label: 'MIN ATTACK' },
  ];

  const handleReset = async () => {
    setFilter('')
    setSort('')
  }

  return (
    <>
      <Head>
        <title>Pokemons</title>
      </Head>
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
      <Cards searchQuery={query} type={filter} sort={sort} />
    </>
  );
}
