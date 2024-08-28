import React, { useState, useEffect } from "react";
import styles from './Menu.module.css';
import img from '../../assets/spaghetti.jpg';

function Menu() {
    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        const savedFavorite = localStorage.getItem('isFavorited');
        if (savedFavorite) {
            setIsFavorited(JSON.parse(savedFavorite));
        }
    }, []);

    const toggleFavorite = () => {
        const newFavoriteState = !isFavorited;
        setIsFavorited(newFavoriteState);
        localStorage.setItem('isFavorited', JSON.stringify(newFavoriteState));
    };

    return (
        <div className={styles.menucontainer}>
            <img src={img} width={130} height={80} alt="Spaghetti" />
            <h2 className={styles.truncated}>
                Porotta Beef
            </h2>
            <div className={styles.fav}>
                <h3>
                    i
                </h3>
                <h3 
                    onClick={toggleFavorite} 
                    style={{ color: isFavorited ? 'red' : 'black' }}
                >
                    L
                </h3>
            </div>
        </div>
    );
}

export default Menu;
