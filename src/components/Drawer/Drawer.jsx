import React, {useContext, useState} from "react";
import Info from "../../components/Info/Info";
import styles from './Drawer.module.scss';
import { AppContext } from "../../App";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = () => {
  const {isBaskerOpen, setIsBasketOpen, addItemToBasket, onRemoveFromBasket, setAddItemToBasket} = useContext(AppContext)
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const basketTotalPrice = addItemToBasket.reduce((sum, obj) => Number(obj.price) + sum, 0);
  
  const onClickOrder = () => {
    setIsOrderComplete(true);
    setAddItemToBasket([]);
  }
  const closeBasket = () => {
    setIsBasketOpen(!isBaskerOpen);
  }

  return(
  <div className={styles.Overlay}>
    <div className={styles.Drawer}>
    <h3>Basket
      <img  onClick={closeBasket} src="/img/remove.svg" alt="close" />
    </h3>
    <div className={styles.BasketItemBox}>
      {addItemToBasket.length 
      ?
      addItemToBasket.map((el) => {
          return(
            <div key={el.id} className={styles.BasketItem}>
              <img width={70} height={70} src={el.img} alt='boots'/>
              <div className={styles.DescrPriceBox}>
                <p>{el.title}</p>
                <b>{el.price} $</b>
              </div>
              <img onClick={() => onRemoveFromBasket(el.id)} className={styles.RemoveBasketItem} src='/img/remove.svg' alt="Remove"/>
            </div>
          )
        })
      :
      <Info closeBasket={closeBasket}
      img={isOrderComplete ? '/img/orderReady.png' : '/img/basketEmpty.png'} 
      title={isOrderComplete ? 'The order №1 is complete' : 'You need to add some supplies.'} 
      text={isOrderComplete ? 'Thank you' : 'The basket is empty.'} 
       />
      }
    </div>
    {addItemToBasket.length
    ?
      <div>
        <ul>
      <li style={{marginBottom: '15px'}}>
        <span>Total:</span>
        <div></div>
        <b>{basketTotalPrice} $</b>
      </li>
      <li>
        <span>Tax 5%:</span>
        <div></div>
        <b>{Math.floor(basketTotalPrice / 100 * 5)} $</b>
      </li>
    </ul>
    <button onClick={onClickOrder}>Make Order</button>
      </div>
    :
    null
    }
    </div>
  </div>
  )
}
export default Drawer;