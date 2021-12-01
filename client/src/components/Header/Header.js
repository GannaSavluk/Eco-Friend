import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const userId = useSelector((store) => store.auth.user?.id);

  return (
    <div className="Header">
      <Link to="/"> map</Link>
      <Link to="/blog"> blog</Link>
      {!userId && <Link to="/signup"> signup</Link>}
      {!userId && <Link to="/signin"> signin</Link>}
      {userId && <Link to="/logout"> logout</Link>}
    </div>
  );
};

export default Header;
