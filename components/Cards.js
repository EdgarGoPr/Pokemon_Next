'use client'

import React, { useEffect, useState } from "react";
import Card from "./Card";
import styles from "@/pages/(Styles)/cards.module.css"

const Cards = ({ searchQuery, type, sort, page, pageSize }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/get/get_poke/?name=${searchQuery}&type=${type}&sort=${sort}&page=${page}&pageS=${pageSize}`);
        const result = await response.json();
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, type, sort, page, pageSize]);

  return (
    <div className={styles['cardsContainer']}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.map((pokemon) => (
          <Card key={pokemon.id} data={pokemon} />
        ))
      )}
    </div>
  );
};

export default Cards;
