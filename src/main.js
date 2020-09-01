// This function stores our state. No initial values.

// const storeState = () => {
//   let currentState = {};
//   return (stateChangeFunction = state => state) => {
//     const newState = stateChangeFunction(currentState);
//     currentState = {...newState};
//     return newState;
//   }
// }

// Function factory that accounts for initial state values

const storeState = (initialState) => {
  let currentState = initialState;
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

// Instantiated objects are equal to the store state. Initial values are passed in.

const initialValues = { name: " ", soil: 5, water: 5 };
const plant = storeState(initialValues);
const plant2 = storeState(initialValues);

// This is a function factory. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

// We create four functions using our function factory. We could easily create many more.


const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);
const bob = changeState("name")("Bob");
const terrance = changeState("name")("Terrance");


$(document).ready(function() {
  const plantOneState = plant(bob);
  $('#name-value1').text(`${plantOneState.name}`);
  $('#soil-value1').text(`Soil: ${plantOneState.soil}`);
  $('#water-value1').text(`Water: ${plantOneState.water}`);

  const plantTwoState = plant2(terrance);
  $('#name-value2').text(`${plantTwoState.name}`);
  $('#soil-value2').text(`Soil: ${plantTwoState.soil}`);
  $('#water-value2').text(`Water: ${plantTwoState.water}`);
  
// This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. 
  $('#water1').click(function() {
    const newState = plant(hydrate);
    $('#water-value1').text(`Water: ${newState.water}`);
  });

  $('#water2').click(function() {
    const newState = plant2(hydrate);
    $('#water-value2').text(`Water: ${newState.water}`);
  });
  

  $('#feed1').click(function() {
    const newState1 = plant(blueFood);
    $('#soil-value1').text(`Soil: ${newState1.soil}`);
  });

  $('#feed2').click(function() {
    const newState2 = plant2(blueFood);
    $('#soil-value2').text(`Soil: ${newState2.soil}`);
  });

// Currently redundant as the values are displayed on the page by default * This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-state1').click(function() {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = plant();
    $('#soil-value1').text(`Soil: ${currentState.soil}`);
    $('#water-value1').text(`Water: ${currentState.water}`);
  });

  $('#show-state2').click(function() {
    const currentState = plant2();
    $('#soil-value2').text(`Soil: ${currentState.soil}`);
    $('#water-value2').text(`Water: ${currentState.water}`);
  });
});