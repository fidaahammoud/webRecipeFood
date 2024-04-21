import React from 'react';
import { Form, NavLink } from 'react-router-dom';
import SearchBar from './SearchBar'; 
import authManagerInstance from '../components/AuthManager';
import classes from '../css/MainNavigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell ,faUser,faUpload  } from '@fortawesome/free-solid-svg-icons';


function MainNavigation() {
  const isAuthenticated = authManagerInstance.getIsAuthenticated();
  const haveUsername = authManagerInstance.getUsername();

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chefs"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Chefs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Categories
            </NavLink>
          </li>


          <li>
            <NavLink
              to="/dietaries"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Dietaries
            </NavLink>
          </li>

          {(!isAuthenticated || (isAuthenticated && !haveUsername)) && (
            <li>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authorization
              </NavLink>
            </li>
          )}
         
         

          {isAuthenticated && haveUsername && ( 
            <li>
              <NavLink
                to="/followings"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Followings
              </NavLink>
            </li>
          )}

          {isAuthenticated && haveUsername && ( 
            <li>
              <NavLink
                to="/addRecipe"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <FontAwesomeIcon icon={faUpload} className={classes.icon}  /> 
              </NavLink>
            </li>
          )}

            {isAuthenticated && haveUsername && ( 
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  <FontAwesomeIcon icon={faUser} className={classes.icon} /> 
                </NavLink>
              </li>
            )}


            {isAuthenticated && haveUsername && ( 
            <li>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <FontAwesomeIcon icon={faBell} className={classes.icon} /> 
              </NavLink>
            </li>
          )}


          {isAuthenticated && haveUsername && (
            <li>
              <Form action="/logout" method="post">
                <button className={classes.logoutButton}>Logout</button>
              </Form>
            </li>
          )}
          
          <li>
            <SearchBar />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
