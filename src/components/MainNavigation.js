import { Form, NavLink } from 'react-router-dom';
import { getIsAuthenticated } from '../components/auth.js'; // Import the authentication module

import classes from '../css/MainNavigation.module.css';

function MainNavigation() {
  const isAuthenticated = getIsAuthenticated(); // Get the authentication status

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
          {!isAuthenticated && (
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
          {isAuthenticated && ( 
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Profile
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              upload
            </NavLink>
          </li>

          {isAuthenticated && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
