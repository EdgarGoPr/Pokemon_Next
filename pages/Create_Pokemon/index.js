import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import validations from "@/pages/api/utils/Validations.js";
import Head from "next/head";

const TypeButton = ({ type, formType, handleTypeClick }) => {
  const isActive = formType.includes(type);

  return (
    <div>
      <button
        type="button"
        onClick={() => handleTypeClick(type)}
      >+</button>
      <h4>{type.toUpperCase()}</h4>
    </div>
  );
};



const Form = () => {
  const router = useRouter();
  const [types, setTypes] = useState([]);
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    ident: "",
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

  const identExists = async (ident) => {
    await fetch(`/api/get/get_ident_poke?ident=${ident}`)
      .then((response) => response.json())
      .then((result) => {
        if (result.message === 'The pokemon exists') {
          setError((prevError) => ({
            ...prevError,
            ident: "Pokemon identification already exists!",
          }));
          return true;
        } else if (result.message === "No pokemons found") {
          setError((prevError) => ({
            ...prevError,
            ident: "",
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
    if (name === 'ident' && name.length > 0) {
      identExists(value)
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const errors = validations(form);

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const newPokemon = {
      ident: parseInt(form.ident),
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

    const confirmed = window.confirm("Are you sure you want to create a new Pokémon?")

    if (confirmed) {
      fetch("/api/post/create_poke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: newPokemon }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("New Pokemon created:", data);
          if (data.message === 'Error creating pokemon') {
            window.alert(data.message)
          } else {
            window.alert(data.message)
            router.push("/");
          }

        })
        .catch((error) => {
          console.log(error)
        });
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
      <div>
        <div>
          <button onClick={handleHome}>HOME</button>
        </div>
        <form onSubmit={submitHandler}>
          <div>
            <div>
              <div>
                <input
                  type="number"
                  name="ident"
                  placeholder="IDENTIFICATION NUMBER"
                  value={form.ident}
                  onChange={changeHandler}
                />
                {error.ident && <p>{error.ident}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="NAME"
                  value={form.name}
                  onChange={changeHandler}
                />
                {error.name && <p>{error.name}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="image"
                  placeholder="IMAGE URL"
                  value={form.image}
                  onChange={changeHandler}
                />
                {error.image && <p>{error.image}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="health"
                  placeholder="HEALTH"
                  value={form.health}
                  onChange={changeHandler}
                />
                {error.health && <p>{error.health}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="attack"
                  placeholder="ATTACK"
                  value={form.attack}
                  onChange={changeHandler}
                />
                {error.attack && <p>{error.attack}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="defense"
                  placeholder="DEFENSE"
                  value={form.defense}
                  onChange={changeHandler}
                />
                {error.defense && <p>{error.defense}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="speed"
                  placeholder="SPEED"
                  value={form.speed}
                  onChange={changeHandler}
                />
                {error.speed && <p>{error.speed}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="height"
                  placeholder="HEIGHT"
                  value={form.height}
                  onChange={changeHandler}
                />
                {error.height && <p>{error.height}</p>}
              </div>
              <div>
                <input
                  type="number"
                  name="weight"
                  placeholder="WEIGHT"
                  value={form.weight}
                  onChange={changeHandler}
                />
                {error.weight && <p>{error.weight}</p>}
              </div>
            </div>
          </div>
          <div>
            <div>
              <div>
                <h1>TYPE</h1>
                <div>
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
            </div>
            <div>
              {error.type && (
                <p className="error-message-types">{error.type}</p>
              )}
            </div>
            <button type="submit">
              Create Pokemons
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Form