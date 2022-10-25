import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import Router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../src/features/auth/authSlice";
import { useState, useEffect } from "react";
const Header = () => {
  const dispatch = useDispatch(); //init redux dispatch to send actions to redux
  const { user } = useSelector((state) => state.auth); //pull user from redux store
  console.log(user);
  //fix issue with rehydration - explained here - https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const onLogout = () => {
    console.log("logout");
    dispatch(logout());
    dispatch(reset());
    Router.push("/");
  };
  if (!hasMounted) {
    return null;
  }
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">Logo</Link>
      </div>

      <ul>
        {user ? (
          <button className="btn" onClick={onLogout}>
            Log out
          </button>
        ) : (
          <li>
            <Link href="/login">
              <a>
                <FaSignInAlt />
                login
              </a>
            </Link>
            <Link href="/register">
              <a>
                <FaUser />
                register
              </a>
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
