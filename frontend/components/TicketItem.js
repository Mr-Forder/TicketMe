import Router from "next/router";
import Link from "next/link";

const TicketItem = ({ ticket }) => {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("en-uk")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <Link href={`/ticket/${ticket._id}`}>
        <button className="btn btn-reverse btn-sm">
          <a>View</a>
        </button>
      </Link>
    </div>
  );
};

export default TicketItem;
