import React, { useContext } from "react";
import Card from "../../components/Card/Card";
import { AppContext } from "../../App";
import styles from './Home.module.scss';

const Home = () => {
  const {bootsArray, searchBoots, setSearchBoots, onAddToCard, onAddFavourits, isLoading, page, setPages} = useContext(AppContext);
  const renderItems = () => {
    const filterBoots = bootsArray.filter(el => el.title.toLowerCase().includes(searchBoots.toLowerCase()));
    return (isLoading ? [...Array(4)] : filterBoots).map((el, index) => {
        return <Card
                  key={index}
                  addCardToBasket={(obj) => onAddToCard(obj)}
                  addCardToFavourits={(obj) => onAddFavourits(obj)}
                  isLoading={isLoading}
                  {...el}
                />
      })
  }
  return (
    <main className="content">
        <header className="content-header">
          <h1>All boots</h1>
          <div className="search-block">
            <img src="/img/find.svg" alt="find"/>
            <input placeholder="Search..." onChange={(e) => setSearchBoots(e.target.value)}/>
          </div>
        </header>
        <div className="bootsBox" style={{display: "flex"}}>
          {
            renderItems()
          }
            <ul className={styles.PagesCount}>
              {
                [...Array(4)].map((el, i) => <li onClick={() => {setPages(i + 1)}} className={page === (i + 1) ? `${styles.Active}` : ''}>{i + 1}</li>)
              }
            </ul>
          </div>
      </main>
  )
}

export default Home;