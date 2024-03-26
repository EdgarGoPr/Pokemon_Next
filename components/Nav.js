import Landing from "@/pages/Unauth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Nav({ handleSearch, query, handleFilter, filter, filterOptions, sort, sortOptions, handleSort, handleReset }) {

  const router = useRouter()

  const handleProfile = () => {
    // Add the logic for the "Profile" option here
  };

  const handleCreateType = () => {
    router.push('/Create_Type')
  };

  const handleCreatePokemon = () => {
    router.push('/Create_Pokemon')
  };

  const handleSelectorChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "profile") {
      handleProfile();
    } else if (selectedOption === "createType") {
      handleCreateType();
    } else if (selectedOption === "createPokemon") {
      handleCreatePokemon();
    } else if (selectedOption === "logout") {
      signOut()
    }
  };

  return (
    <>
      <div>
        <select onChange={handleSelectorChange}>
          <option value=''>HOME</option>
          <option value="profile">PROFILE</option>
          <option value="createType">CREATE TYPE</option>
          <option value="createPokemon">CREATE POKEMON</option>
          <option value="logout">LOGOUT</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
        />
      </div>
      <div>
        <select value={filter} onChange={(e) => handleFilter(e.target.value)}>
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select value={sort} onChange={(e) => handleSort(e.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button value={''} onClick={handleReset}>RESET</button>
      </div>
    </>
  );
}
