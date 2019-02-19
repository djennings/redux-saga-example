// create 'fallback' for browsers not supporting localStorage
let localStorage = window.localStorage;
if (typeof Storage === 'undefined') {
  localStorage = {
    getItem: () => 'undefined',
    setItem: () => true
  };
}

export const loadState = () => {
  try {
    const serializedData = localStorage.getItem('sagaState');
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedData = JSON.stringify(state);
    localStorage.setItem('sagaState', serializedData);
  } catch(err) {
    // some day log error
  }
}
