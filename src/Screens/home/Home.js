import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../Components/AppContext';
import '../../Components/styles.css';
import homeImage from '../../assets/home-image.jpg';


const HomeComponent = () => {

  return (
    <div className="home-image-container">
      <img src={homeImage} alt="Home" className="home-image" />
    </div>
  );
};

export default HomeComponent;
