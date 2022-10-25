import { useState, useEffect } from "react";
import Router from "next/router";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import Spinner from "../../components/Spinner";
const register = () => {
  //form data state, default is object with keys and empty values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  //destructure our formData object for easy access to elements within it
  const { name, email, password, password2 } = formData;

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
    if (password !== password2) {
      toast.error("Passwords do not match.");
    } else {
      const userData = {
        //create user data object, using destructured state from formData (in local state, input by user)
        name,
        email,
        password,
      };
      dispatch(registerUser(userData)); //dispatch registerUser function from our authSlice
    }
  };

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register Account
        </h1>
        <p>Create an account.</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Your Name"
              required
            />
          </div>
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
              type="text"
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
            <input
              type="text"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm Password"
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

export default register;
