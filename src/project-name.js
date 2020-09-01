// project business logic goes here
// exports!
const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

let plant = { soil: 0, light: 0, water: 0 }

changePlantState(plant, "soil")

const storeState = (initialState) => {
  let currentState = initialState; // We could pass in an initial state to the object instead of starting with an empty object as well.
  return (stateChangeFunction) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const stateControl = storeState();