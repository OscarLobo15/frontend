import React from 'react';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import '../CSS/Footer.css';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const Footer = () => {
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
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-content">
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=100063115786420" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/company/tattersall-agroinsumos-s-a/?originalSubdomain=cl" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/tattersallagroinsumos/?hl=es-la" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
          <p>{t('Footer.content')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;