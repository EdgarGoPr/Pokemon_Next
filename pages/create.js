import { useRouter } from "next/router"
import { useState, useEffect } from "react"

const TypeButton = ({ type, formType, handleTypeClick }) => {
  const isActive = formType.includes(type);

  return (
    <div>
      <button
        className={`selectButton roundButton ${isActive ? "active" : ""}`}
        onClick={() => handleTypeClick(type)}
      ></button>
      <h4>{type}</h4>
    </div>
  );
};

const Form = () => {
  const router = useRouter();
  const [types, setTypes] = useState([]);
  const [error, setError] = useState({});
  const [form, setForm] = useState({
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
    router.push('/home')
  }

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const errors = {};
    if (form.name.trim() === "") {
      errors.name = "Name is required";
    }
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    const newPokemon = {
      name: form.name.toLowerCase(),
      image: form.image,
      health: form.health,
      attack: form.attack,
      defense: form.defense,
      speed: form.speed,
      height: form.height,
      weight: form.weight,
      type: form.type,
    };

    fetch("/api/post/create_poke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPokemon),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New Pokemon created:", data);
        router.push("/home");
      })
      .catch((error) => console.log(error));
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
      <div>
        <div>
          <button onClick={handleHome}>Home</button>
        </div>
        <form onSubmit={submitHandler}>
          <div>
            <div>
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
                {error.defense && (
                  <p>{error.defense}</p>
                )}
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
              {" "}
              {error.type && (
                <p>{error.type}</p>
              )}{" "}
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