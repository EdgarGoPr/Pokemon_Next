'use client'

import Landing from "@/pages/Unauth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import styles from "@/pages/(Styles)/nav.module.css"

export default function Nav({ handleSearch, query, handleFilter, filter, filterOptions, sort, sortOptions, handleSort, handleReset }) {
  const [selectedFilter, setSelectedFilter] = useState(filter)
  const router = useRouter()


  const handleChangeFilter = (e) => {
    const value = e.target.value;
    setSelectedFilter(value);
    handleFilter(value);
  }

  const renderFilterOptions = () => {
    return filterOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))
  }

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
      <div className={styles['nav']}>
        <div className={styles['navSelect']}>
          <select onChange={handleSelectorChange}>
            <option value=''>HOME</option>
            {/* <option value="profile">PROFILE</option> */}
            <option value="createType">CREATE TYPE</option>
            <option value="createPokemon">CREATE POKEMON</option>
            <option value="logout">LOGOUT</option>
          </select>
        </div>
        <div className={styles['navInput']}>
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search"
          />
        </div>
        <div className={styles['navSelect']}>
          <select value={selectedFilter} onChange={handleChangeFilter}>
            {renderFilterOptions()}
          </select>
        </div>
        <div className={styles['navSelect']}>
          <select value={sort} onChange={(e) => handleSort(e.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className={styles['navButton']}>
          <button value={''} onClick={handleReset}>RESET</button>
        </div>
      </div>
      <div className={styles['end']}/>
    </>
  );
}
