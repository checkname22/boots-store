import React from 'react';
import styles from './Info.module.scss';

const Info = ({img, title, text, closeBasket}) => {
  return (
    <div className={styles.EmptyBasket}>
        <img src={img} alt='correct'/>
        <p>{text}</p>
        <b>{title}</b>
        <button onClick={closeBasket}>Go back</button>
      </div>
  )
}
export default Info;