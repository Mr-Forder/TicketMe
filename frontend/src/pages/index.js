import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const { user } = useSelector((state) => state.auth); //grab user data from redux
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [user]);

  if (checkingStatus) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>What can we help you with?</h1>
        <p>Please choose from an option below.</p>
        <Link href={loggedIn ? "/add" : "/login"}>
          <button className="btn btn-reverse btn-block">
            <FaQuestionCircle />
            Create new review
          </button>
        </Link>
        <Link href={loggedIn ? "/tickets" : "/login"}>
          <button className="btn btn-block">
            <FaTicketAlt />
            View my reviews
          </button>
        </Link>
      </section>
    </>
  );
}
