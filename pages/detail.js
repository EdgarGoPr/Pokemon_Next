'use client'

import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [poke, setPoke] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPoke = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/get/get_id_poke?id=${id}`);
        const result = await response.json();
        setPoke(result.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error:", error);
        setIsLoading(false);
      }
    };

    fetchPoke();
  }, [id]);

  return (
    <>
      <Head>
        {isLoading ? (
          <title>Pokemon</title>
        ) : (
          <title>{poke.name.toUpperCase()}</title>
        )}
      </Head>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <h1>{`NAME: ${poke.name.toUpperCase()}`}</h1>
          </div>
          <div>
            <h2>{`IDENTIFICATION NUMBER: ${poke.ident}`}</h2>
          </div>
          <div>
            <img src={poke.image} alt={poke.name} />
          </div>
          <div>
            <h4>{`HP: ${poke.health}`}</h4>
          </div>
          <div>
            <h4>{`ATK: ${poke.attack}`}</h4>
          </div>
          <div>
            <h4>{`DEF: ${poke.defense}`}</h4>
          </div>
          <div>
            <h4>{`SPD: ${poke.speed}`}</h4>
          </div>
          <div>
            <h4>{`HGT: ${poke.height}`}</h4>
          </div>
          <div>
            <h4>{`WGT: ${poke.weight}`}</h4>
          </div>
          <div>
            {poke.type && (
              <h3>{`TYPE: ${poke.type
                .map((type) => type.toUpperCase())
                .join(", ")}`}</h3>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
