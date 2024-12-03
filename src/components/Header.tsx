import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router";
import { routeKeys } from "router";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-50 h-[80px] fixed w-full z-10">
      <div className="max-w-[480px] mx-auto flex items-center justify-between h-full">
        <div>{user?.name}</div>

        <button
          onClick={() => {
            logout();
            navigate(routeKeys.LOGIN);
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
