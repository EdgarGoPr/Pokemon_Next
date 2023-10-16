import Cards from "@/components/Cards";
import Nav from "@/components/Nav";
import { useState } from "react";


export default function myPage() {
  const [query, setQuery] = useState('')

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  return (
    <>
      <Nav handleSearch={handleSearch} query={query} />
      <Cards searchQuery={query} />
    </>
  )
} 
