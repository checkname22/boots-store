import React, { useContext, useState } from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

import { AppContext } from '../../App';

const Card = ({none, noneInFavorite, id, img, title, price, addCardToBasket, addCardToFavourits, isFavorit, isLoading}) => {
  const { isCardInBasket, isCardInFavorit } = useContext(AppContext);
  const obj = {id, parentID: id, img, title, price};

  const cardAdded = () => {
    addCardToBasket(obj);
  }
  const addCardToFavourite = () => {
    addCardToFavourits(obj);
  }

  return(
    <div className={styles.Card}>
      {isLoading 
      ? 
        <ContentLoader 
          speed={2}
          width={150}
          height={200}
          viewBox="0 0 150 200"
          backgroundColor="#dbdbdb"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
          <rect x="0" y="105" rx="10" ry="10" width="150" height="15" /> 
          <rect x="0" y="125" rx="10" ry="10" width="100" height="15" /> 
          <rect x="0" y="155" rx="10" ry="10" width="100" height="20" /> 
          <rect x="110" y="150" rx="10" ry="10" width="40" height="25" />
        </ContentLoader>
      :
        <>
          <div className={styles.CardFavourite} onClick={addCardToFavourite}>
            <img style={{display: `${none}`}} src={isCardInFavorit(id) ? '/img/onFavourite.svg' : '/img/notFavourite.svg'} alt='heart'/>
          </div>
          <img width={134} height={122} src={img} alt="boots"/>
          <h5>{title}</h5>
          <div className={styles.cardBottom}>
            <div className={styles.CardPriceBox}>
              <span>Price:</span>
              <b>{price} $</b>
            </div>
            <div width={31} height={31}>
              <img style={{display: `${none}`, display: `${noneInFavorite}`}} onClick={cardAdded} src={isCardInBasket(id) ? '/img/check-green.svg' : '/img/plus.svg'}  alt="plus"/>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default Card;