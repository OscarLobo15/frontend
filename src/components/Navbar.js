import React, { useEffect, useState } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom'; 
import { useAuth0 } from '@auth0/auth0-react'; 
import { useTranslation } from 'react-i18next'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 


function NavBar() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const { t, i18n } = useTranslation();
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();

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
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary py-3">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link fs-5 text-white"
                to="/home"
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: '#034574',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 1rem',
                      }
                    : {}
                }
              >
                {t('navbar.home')}
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  className="nav-link fs-5 text-white"
                  to="/productos"
                  style={({ isActive }) =>
                    isActive
                      ? {
                          backgroundColor: '#034574',
                          borderRadius: '0.5rem',
                          padding: '0.5rem 1rem',
                        }
                      : {}
                  }
                >
                  {t('navbar.products')}
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {isAuthenticated ? (
                <button
                  className="btn btn-outline-light me-2"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  {t('navbar.logOut')}
                </button>
              ) : (
                <button className="btn btn-outline-light me-2" onClick={() => loginWithRedirect()}>
                  {t('navbar.logIn')}
                </button>
              )}
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  className="nav-link fs-5 text-white"
                  to="/profile"
                  style={({ isActive }) =>
                    isActive
                      ? {
                          backgroundColor: '#034574',
                          borderRadius: '0.5rem',
                          padding: '0.5rem 1rem',
                        }
                      : {}
                  }
                >
                  <i className="bi bi-person-circle me-2"></i>
                  {t('navbar.account')}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
