import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, reset } from "../features/auth/authSlice";
import Router from "next/router";
import Spinner from "../../components/Spinner";

const login = () => {
  //form data state, default is object with keys and empty values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //destructure our formData object for easy access to elements within it
  const { email, password } = formData;

  //initialise redux dispatch
  const dispatch = useDispatch();
  //return auth state from our store
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    //redirect when logged in
    if (isSuccess) {
      //if isSuccess, or user
      Router.push("/"); //redirect to home page
    }
    dispatch(reset);
  }, [isError, isSuccess, user, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      //take in previous state of formData as argument
      ...prevState,
      [e.target.name]: e.target.value, //spread previous state and add whatever input is selected (targetted via name property in input in jsx, adding whatever is in input box)
    })),
      console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      //create user data object, using destructured state from formData (in local state, input by user)
      email,
      password,
    };
    dispatch(loginUser(userData)); //dispatch loginUser function from our authSlice
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Log in
        </h1>
        <p>Please log in to continue</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Your Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Secure Password"
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default login;
login;
