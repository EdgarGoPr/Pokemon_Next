import { useRouter } from "next/router";

export default function Nav({ handleSearch, query, handleFilter, filter, filterOptions, sort, sortOptions, handleSort, handleReset }) {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };

  const handleProfile = () => {
    // Add the logic for the "Profile" option here
  };

  const handleCreateType = () => {
    // Add the logic for the "Create Type" option here
  };

  const handleCreatePokemon = () => {
    router.push('/create')
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
      handleLogout();
    }
  };

  return (
    <>
      <div>
        <select onChange={handleSelectorChange}>
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
