import { FaArrowCircleLeft } from "react-icons/fa";
import Link from "next/link";

const BackButton = ({ url }) => {
  return (
    <Link href={url}>
      <button className="btn btn-reverse btn-black">
        <a>
          <FaArrowCircleLeft /> Back
        </a>
      </button>
    </Link>
  );
};

export default BackButton;
