// This function stores our state.

const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  }
}

const plant = storeState();
const plant2 = storeState();

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
// const plant1 = { "soil": 0, "water": 0};
// const plant2 = { "soil": 0, "water": 0};

const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

$(document).ready(function() {
  // const plantState = storeState({"name": "Jerry", "soil": 0});
  // const plantName = plantState("name")();
  // $('#name-value').text(`Name: ${plantName.name}`);
  
// This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.
  $('#water').click(function() {
    const newState = plant(hydrate);
    $('#water-value').text(`Water: ${newState.water}`);
  });
  

  $('#feed1').click(function() {
    const newState1 = plant(blueFood);
    $('#soil-value1').text(`Soil: ${newState1.soil}`);
  });

  $('#feed2').click(function() {
    const newState2 = plant2(blueFood);
    $('#soil-value2').text(`Soil: ${newState2.soil}`);
  });

// This function doesn't actually do anything useful in this application - it just demonstrates how we can "look" at the current state (which the DOM is holding anyway). However, students often do need the ability to see the current state without changing it so it's included here for reference.

  $('#show-state').click(function() {
    // We just need to call stateControl() without arguments to see our current state.
    const currentState = plant();
    $('#soil-value').text(`Soil: ${currentState.soil}`);
    $('#water-value').text(`Water: ${currentState.soil}`);
  });
});