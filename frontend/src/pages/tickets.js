import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { getTickets, reset } from "../features/tickets/ticketSlice";
import Spinner from "../../components/Spinner";
import BackButton from "../../components/BackButton";
import TicketItem from "../../components/TicketItem";
const tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  );

  //init dispatch

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  useEffect(() => {
    //Clear global ticket state when page unmounts
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="ticket">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
          {tickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
        </div>
      </div>
    </>
  );
};

export default tickets;
