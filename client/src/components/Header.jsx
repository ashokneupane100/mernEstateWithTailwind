import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const text = "Type here to search properties ...";
    let index = 0;

    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        if (index === text.length) {
          index = 0;
          return "";
        }
        return prev + text[index++];
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="bg-slate-200 shadow-md">
      <Link to="/">
        <img
          src="../../assets/images/logo192.png"
          width="35px"
          height="35px"
          alt=""
          style={{
            marginLeft: "2.1rem",
            marginTop: "1.8px",
            marginBottom: "-1.8rem",
          }}
        />
      </Link>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-700 ml-[-.6rem]">homeland.com</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder={placeholder}
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="flex items-center justify-center bg-blue-600 text-white font-bold rounded-full border-2 border-blue-700 hover:bg-blue-500 mr-4 px-1 py-.5">
                SignIn
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
