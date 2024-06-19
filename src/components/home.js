import React from 'react';
import Hero from './hero';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import '../CSS/home.css';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
    setInitialized(true);
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  if (!initialized) return null;

  return (
    <div className="home-container">
      <div className="hero-container">
        <Hero />
      </div>
      <div className="text-container">
        <div className="text-content">
          
        </div>
      </div>
    </div>
  );
};

export default Home;