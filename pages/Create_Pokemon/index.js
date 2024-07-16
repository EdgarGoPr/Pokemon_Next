import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import validations from "@/pages/api/utils/Validations.js";
import Head from "next/head";
import styles from "@/pages/(Styles)/crePoke.module.css"

const TypeButton = ({ type, formType, handleTypeClick, isActivated }) => {
  const isActive = formType.includes(type);

  // Determina si el botón está activado basándose en la prop isActivated
  const buttonStyle = isActive || isActivated ? "active" : "inactive";

  return (
    <div>
      <button
        type="button"
        onClick={() => handleTypeClick(type)}
        className={`${styles[buttonStyle]}`}
      >
        +
      </button>
      <h4 className={styles['tipo']}>{type.toUpperCase()}</h4>
    </div>
  );
};



const Form = () => {
  const router = useRouter();
  const [types, setTypes] = useState([]);
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    // ident: "",
    name: "",
    image: "",
    health: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    type: [],
  });

  useEffect(() => {
    fetch("/api/get/get_types")
      .then((response) => response.json())
      .then((data) => {
        const typeNames = data.data.map((type) => type.name);
        setTypes(typeNames);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleHome = () => {
    router.push('/')
  }

  const nameExists = async (name) => {
    await fetch(`/api/get/get_name_one_poke?name=${name}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.message === 'The pokemon exists') {
          setError((prevError) => ({
            ...prevError,
            name: "Pokemon name already exists!",
          }));
          return true;
        } else if (result.message === "No pokemons found") {
          setError((prevError) => ({
            ...prevError,
            name: "",
          }));
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setError(
      validations({
        ...form,
        [name]: value,
      })
    );
    if (name === 'name' && name.length > 0) {
      nameExists(value)
    }
  };

  const submitHandler = async (event) => {
    console.log('aqui toy')
    event.preventDefault(); // Detiene la propagación del evento por defecto

    const errors = validations(form);

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return; // Detiene la función si hay errores de validación
    }

    const newPokemon = {
      name: form.name.toLowerCase(),
      image: form.image,
      health: parseInt(form.health),
      attack: parseInt(form.attack),
      defense: parseInt(form.defense),
      speed: parseInt(form.speed),
      height: parseInt(form.height),
      weight: parseInt(form.weight),
      type: form.type,
    };

    const confirmed = window.confirm("Are you sure you want to create a new Pokémon?");

    if (confirmed) {
      try {
        const response = await fetch("/api/post/create_poke", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: newPokemon }),
        });

        if (!response.ok) {
          throw new Error("Error creating pokemon");
        }

        const data = await response.json();
        console.log("New Pokemon created:", data);
        window.alert(data.message);
        router.push("/");
      } catch (error) {
        console.error("Error creating pokemon:", error);
        window.alert("Error creating pokemon");
      }
    }
  };


  const handleTypeClick = (type) => {
    if (form.type.includes(type)) {
      setForm((prevForm) => ({
        ...prevForm,
        type: prevForm.type.filter((t) => t !== type),
      }));
    } else {
      if (form.type.length >= 2) {
        setError((prevError) => ({
          ...prevError,
          type: "Can not select more than two types",
        }));
        return;
      }

      setForm((prevForm) => ({
        ...prevForm,
        type: [...prevForm.type, type],
      }));
    }

    if (error.type && form.type.length < 3) {
      setError((prevError) => ({
        ...prevError,
        type: "",
      }));
    }
  };

  return (
    <>
      <Head>
        <title>Pokemon | Create</title>
      </Head>
      <div className={styles['container']}>

        <div className={styles['homeButtonContainer']}>
          <button onClick={handleHome}>HOME</button>
        </div>
        <form onSubmit={submitHandler} className={styles['formContainer']}>
          <div className={styles['leftSection']}>
            <div className={styles['inputGroup']}>
              <input
                type="text"
                name="name"
                placeholder="NAME"
                value={form.name}
                onChange={changeHandler}
              />
              {error.name && <p className={styles['error']}>{error.name}</p>}
            </div>
            <div className={styles['inputGroup']}>
              <input
                type="text"
                name="image"
                placeholder="IMAGE URL"
                value={form.image}
                onChange={changeHandler}
              />
              {error.image && <p className={styles['error']}>{error.image}</p>}
            </div>
            <div className={styles['inputGroup']}>
              <input
                type="number"
                name="health"
                placeholder="HEALTH"
                value={form.health}
                onChange={changeHandler}
              />
              {error.health && <p className={styles['error']}>{error.health}</p>}
            </div>
            <div className={styles['inputGroup']}>
              <input
                type="number"
                name="attack"
                placeholder="ATTACK"
                value={form.attack}
                onChange={changeHandler}
              />
              {error.attack && <p className={styles['error']}>{error.attack}</p>}
            </div>
            <div className={styles['inputGroup']}>
              <input
                type="number"
                name="defense"
                placeholder="DEFENSE"
                value={form.defense}
                onChange={changeHandler}
              />
              {error.defense && <p className={styles['error']}>{error.defense}</p>}
            </div>
            <div className={styles['inputGroup']}>
              <input
                type="number"
                name="speed"
                placeholder="SPEED"
                value={form.speed}
                onChange={changeHandler}
              />
              {error.speed && <p className={styles['error']}>{error.speed}</p>}
            </div>
            <div className={styles['inputGroup']}>
              <input
                type="number"
                name="height"
                placeholder="HEIGHT"
                value={form.height}
                onChange={changeHandler}
              />
              {error.height && <p className={styles['error']}>{error.height}</p>}
            </div>
            <div className={styles['inputGroup']}>
              <input
                type="number"
                name="weight"
                placeholder="WEIGHT"
                value={form.weight}
                onChange={changeHandler}
              />
              {error.weight && <p className={styles['error']}>{error.weight}</p>}
            </div>
          </div >
          <div className={styles['rightSection']}>
            <div className={styles['submitSection']}>
              <div className={styles['typeSection']}>
                <h1 className={styles['h1']}>TYPE</h1>
                <div className={styles['typeButtons']}>
                  {types &&
                    types.map((type, index) => (
                      <TypeButton
                        key={index}
                        type={type}
                        formType={form.type}
                        handleTypeClick={handleTypeClick}
                      />
                    ))}
                </div>
              </div>
              <div>
                {error.type && (
                  <p className={styles['error']}>{error.type}</p>
                )}
              </div>
              <button type="submit">
                Create Pokemons
              </button>
            </div>
          </div>

        </form>
      </div>


    </>
  )
}

export default Form