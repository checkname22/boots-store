import React, { useContext } from "react";
import Card from "../components/Card/Card";
import { AppContext } from "../App";

const Favourite = () => {
  const {favouriteBoots, onAddFavourits} = useContext(AppContext);
  return(
    <main className="content">
        <header className="content-header">
          <h1>My Favourites</h1>
        </header>
        <div className="bootsBox" style={{display: "flex"}}>
        {true
        ?
        favouriteBoots.map((el) => {
          return <Card
                    key={el.id}
                    id={el.id}
                    img={el.img} 
                    title={el.title} 
                    price={el.price}
                    isFavorit
                    addCardToFavourits={(obj) => onAddFavourits(obj)}
                    noneInFavorite={'none'}
                  />
        })
        :
        null
      }
        </div>
      </main>
  )
}

export default Favourite;