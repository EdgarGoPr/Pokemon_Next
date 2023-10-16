export default function validations(form) {
  let error = {}

  if (!form.name.length) {
    error.name = "Enter a name";
  } else if (!/^[a-zA-Z]+$/.test(form.name)) {
    error.name = "There is an error in the name";
  }

  if (form.name.length > 20) {
    error.name = 'Pick a shorter name'
  }

  const health = parseInt(form.health)
  if (isNaN(health) || health < 1 || health > 255) {
    error.health = 'Choose between 1 and 255'
  }

  const attack = parseInt(form.attack)
  if (isNaN(attack) || attack < 1 || attack > 255) {
    error.attack = 'Choose between 1 and 255'
  }

  const defense = parseInt(form.defense)
  if (isNaN(defense) || defense < 1 || defense > 255) {
    error.defense = 'Choose between 1 and 255'
  }

  const speed = parseInt(form.speed)
  if (isNaN(speed) || speed < 1 || speed > 255) {
    error.speed = 'Choose between 1 and 255'
  }

  const height = parseInt(form.height)
  if (isNaN(height) || height < 1 || height > 255) {
    error.height = 'Choose between 1 and 255'
  }

  const weight = parseInt(form.weight)
  if (isNaN(weight) || weight < 1 || weight > 10000) {
    error.weight = 'Choose between 1 and 10000'
  }

  if (!/^https?:\/\/\S+$/.test(form.image)) {
    error.image = "Invalid image URL";
  }

  if(form.type.length === 0) {
    error.type = 'Must select al least one type'
  }
  if (form.type.length > 2) {
    error.type = 'Can not use more than two types'
  }

  return error
}