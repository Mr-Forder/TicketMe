import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router from "next/router";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";
const add = () => {
  const { user } = useSelector((state) => state.auth); //grab user data from redux global state
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  //fix issue with rehydration - explained here - https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch(); //initialise redux dispatch

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      Router.push("/tickets");
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  if (isLoading) return <Spinner />;
  return (
    <div>
      {user ? (
        <>
          <BackButton url="/" />
          <section className="heading">
            <h1>Create new</h1>
            <p>Please fill out form below.</p>
          </section>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Product</label>
              <input
                type="text"
                className="form-control"
                value={product}
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description/Review</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-block">Submit</button>
            </div>
          </form>
        </>
      ) : (
        <h1>Please Login to add new</h1>
      )}
    </div>
  );
};

export default add;
