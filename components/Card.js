'use client'

import React from "react";
import { useRouter } from "next/router";
import styles from "@/pages/(Styles)/card.module.css"
import Image from "next/image";

export default function Card({ data }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/Detail?id=${data.id}`);
  };

  return (
    <div className={styles.Card}>
      <div key={data.id}>
        <button className={styles.CardButton} onClick={handleClick}>+</button>
      </div>
      <div>
        <h1 className={styles.CardName}>{data.name.toUpperCase()}</h1>
      </div>
      <div>
        <img className={styles.CardImage} src={data.image} alt={data.name}/>
      </div>
      <div className={styles.TypesContainer}>
        {data.type.map((type, index) => (
          <p key={index}>{type.toUpperCase()}</p>
        ))}
      </div>
    </div>
  );
}
