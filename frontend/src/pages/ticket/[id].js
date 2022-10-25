import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket } from "../../features/tickets/ticketSlice";
import { getNotes, createNote, reset } from "../../features/notes/noteSlice";
import BackButton from "../../../components/BackButton";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";
import NoteItem from "../../../components/NoteItem";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%",
    position: "relative",
  },
};

Modal.setAppElement("#__next"); //mount modal to root

const ticket = () => {
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [noteText, setNoteText] = useState("");

  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );

  const help = ticket;
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const dispatch = useDispatch(); //init redux dispatch to send actions to redux

  const router = useRouter();
  const { id } = router.query;
  const ticketId = id;
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //fix issue with rehydration - explained here - https://www.joshwcomeau.com/react/the-perils-of-rehydration/
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, []);

  useEffect(() => {
    setHasMounted(true);
    dispatch(getTicket(id));

    hasMounted && dispatch(getNotes(id));
  }, [isError, message, id]);

  //close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(id));
    toast.success("Ticket closed");
    router.push("/tickets");
  };

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h3>Something went wrong!</h3>;
  }

  //submit note
  const onNoteSubmit = (e) => {
    e.preventDefault();

    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  };

  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/tickets" />
        <h2>
          Ticket ID: {id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date submitted:{new Date(ticket.createdAt).toLocaleString("en-uk")}{" "}
        </h3>
        <hr />
        <div className="ticket-desc">
          <h3>Product:</h3>
          <p>{ticket.product}</p>
          <h3>Description:</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>
      {ticket.status !== "closed" && (
        <button className="btn" onClick={openModal}>
          <FaPlus />
          Add a note
        </button>
      )}
      {notes.map((note) => note.ticket === id && <h3>{note.text}</h3>)}

      <Modal
        isOpen={ismodalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add note"
      >
        <h2>Add Note</h2>
        <button onClick={closeModal} className="btn-close">
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note here"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      {ticket.status != "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
};

export default ticket;
