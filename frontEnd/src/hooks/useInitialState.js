import { useState, useEffect } from 'react';

const useInitialState = (API) => {
  // Get data from Hook useState
  const [items, setItems] = useState([]);

  // Update data
  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  return items;
};

export default useInitialState;
