import { useState } from "react"
import search from "@/pages/api/get/get_name_poke";


export default function Search() {
  const [query, setQuery] = useState('')

  const handleSearch = async (event) => {
    const value = event.target.value;
    setQuery(value);
    const response = await search({ query: { name: value } });
    console.log(response.data);
  };

    return (
      <>
        <input
        type='text'
        value={query}
        onChange={handleSearch}
        />
      </>
    )
}