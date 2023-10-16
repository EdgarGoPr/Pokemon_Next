'use client'

import React, { useEffect, useState } from "react";
import Card from "./Card";

const Cards = ({ searchQuery, type, sort }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/get/get_poke?name=${searchQuery}&type=${type}&sort=${sort}`);
        const result = await response.json();
        setData(result.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, type, sort]);

  return (
    <div>
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
