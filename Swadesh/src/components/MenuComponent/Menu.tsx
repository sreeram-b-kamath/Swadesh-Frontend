import React, { useState, useEffect } from "react";
import styles from './Menu.module.css';
import filled from '../../assets/filled-fav.png';
import outlined from '../../assets/outline-fav.png';
import Modal from "../MenuModal/MenuModal";

interface MenuProps {
  id: number;
  primaryImage: string;
  rating: number;
  name: string;
  money: number;
  description: string;
}

const Menu: React.FC<MenuProps> = ({ id, primaryImage, rating, name, money, description }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // On component mount, check if the favorite status is stored in sessionStorage
    const savedFavorite = sessionStorage.getItem(`isFavorited-${id}`);
    if (savedFavorite) {
      setIsFavorited(JSON.parse(savedFavorite));
    }
  }, [id]);

  const toggleFavorite = () => {
    const newFavoriteState = !isFavorited;
    setIsFavorited(newFavoriteState);
    
    // Update sessionStorage with the new favorite state
    sessionStorage.setItem(`isFavorited-${id}`, JSON.stringify(newFavoriteState));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.menucontainer} onClick={openModal}>
      <img src={primaryImage} width={130}  alt={name} />
      <h2 className={styles.truncated}>{name}</h2>
      <h4>₹ {money}</h4>
      <div className={styles.fav}>
        <h3>{rating}</h3>
        <img
          src={isFavorited ? filled : outlined}
          alt="Favorite"
          onClick={(e) => {
            e.stopPropagation(); // Prevents closing the modal when clicking the favorite icon
            toggleFavorite();
          }}
          width={20}
          height={20}
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={name}
        description={description}
        content={<div>{description}</div>} // Customize modal content
        primaryImage={primaryImage}
        money={money}
      />
    </div>
  );
};

export default Menu;
