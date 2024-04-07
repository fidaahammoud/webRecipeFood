import { Form,NavLink } from 'react-router-dom';

import authManagerInstance from '../components/AuthManager';

import classes from '../css/MainNavigation.module.css';

function MainNavigation() {
 //const isAuthenticated = getIsAuthenticated(); 
 
  const isAuthenticated = authManagerInstance.getIsAuthenticated();

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

          {isAuthenticated && ( 
            <li>
              <NavLink
                to="/addRecipe"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Add Recipe
              </NavLink>
            </li>
          )}

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
