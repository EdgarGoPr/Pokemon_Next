import React, { useEffect, useState } from "react";
import Card from "./Card";

const Cards = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get/get_poke");
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((pokemon) => (
        <Card key={pokemon.id} data={pokemon} />
      ))}
    </div>
  );
};

export default Cards;
