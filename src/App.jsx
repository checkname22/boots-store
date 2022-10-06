import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header/Header";
import "./index.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Favourite from "./pages/Favourite";

export const AppContext = createContext({});

function App() {
  const [isBaskerOpen, setIsBasketOpen] = useState(false);
  const [bootsArray, setBootsArray] = useState([]);
  const [addItemToBasket, setAddItemToBasket] = useState([]);
  const [favouriteBoots, setfavouriteBoots] = useState([]);
  const [searchBoots, setSearchBoots] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      
      const bootsResponse = await axios.get(`https://63363ae465d1e8ef2669c62d.mockapi.io/boots/?p=${page}&l=4`);
    
      setIsLoading(false);

      setBootsArray(bootsResponse.data)
    }

    fetchData();
  }, [page]);

  const onAddToCard = (item) => {
    const findItem = addItemToBasket.find(obj => item.parentID == obj.id);
    if(findItem) {
      setAddItemToBasket((prev) => prev.filter(el => el.parentID != item.id))
    } else {
      setAddItemToBasket((prev) => [...prev, item]);
    }
  }
  const onRemoveFromBasket = (id) => {
    setAddItemToBasket((prev) => prev.filter(el => el.id != id));
  }
  const onAddFavourits = (item) => {
    if(favouriteBoots.find(obj => obj.id === item.id)) {
      setfavouriteBoots((prev) => prev.filter(el => el.id !== item.id))
    } else {
      setfavouriteBoots((prev) => [...prev, item])
    }
  }

  const isCardInBasket = (id) => {
    return addItemToBasket.some(obj => obj.parentID == id);
  }
  const isCardInFavorit = (id) => {
    return favouriteBoots.some(obj => obj.parentID == id);
  }

  return (
    <AppContext.Provider value={{page, setPages, bootsArray, addItemToBasket, favouriteBoots, isCardInBasket, isCardInFavorit, onAddFavourits, isBaskerOpen, setIsBasketOpen, onRemoveFromBasket, setAddItemToBasket, searchBoots, setSearchBoots, onAddToCard, isLoading}}>
      <div className='App'>

        {isBaskerOpen
        ?
        <Drawer />
        :
        null
        }

        <Header />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/favourites" exact element={<Favourite />} />
        </Routes>
      </div>
      </AppContext.Provider>
  );
}

export default App;