import Landing from "@/pages/unauth";
import { signOut } from "next-auth/react";

export default function Nav({ handleSearch, query, handleFilter, filter, filterOptions, sort, sortOptions, handleSort, handleReset }) {

  const handleProfile = () => {
    // Add the logic for the "Profile" option here
  };

  const handleCreateType = () => {
    router.push('/create_type')
  };

  const handleCreatePokemon = () => {
    router.push('/create_poke')
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
        <select value={filter} onChange={handleFilter}>
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select value={sort} onChange={handleSort}>
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
