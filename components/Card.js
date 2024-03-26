'use client'

import React from "react";
import { useRouter } from "next/router";

export default function Card({ data }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/Detail?id=${data.id}`);
  };

  return (
    <>
      <div key={data.id}>
        <button onClick={handleClick}>+</button>
      </div>
      <div>
        <h1>{data.name.toUpperCase()}</h1>
      </div>
      <div>
        <img src={data.image} alt={data.name} />
      </div>
      <div>
        {data.type.map((type, index) => (
          <p key={index}>{type.toUpperCase()}</p>
        ))}
      </div>
    </>
  );
}
