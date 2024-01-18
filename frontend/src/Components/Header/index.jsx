import { NavLink } from "react-router-dom";
import "./header.css";

const Header = (props) => {
  return (
    <div className="header">
      <h1 className="header">{props.text}</h1>;
      <NavLink to="/admin">
        <b>Go back</b>
      </NavLink>
      <hr />
    </div>
  );
};

export default Header;
