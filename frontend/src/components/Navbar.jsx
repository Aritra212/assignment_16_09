import { useState } from "react";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

function Navbar() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const adminData = useSelector((state) =>
    authStatus ? state.auth.adminData : null
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutHandler = () => {
    setSidebarActive(false);
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="w-full py-3 bg-black text-white sticky top-0">
      <div className="w-[90%] sm:w-4/5 mx-auto flex justify-between items-center">
        <div className="w-fit">
          <p className="text-2xl font-bold">Logo</p>
        </div>
        <div className="md:hidden w-fit" onClick={() => setSidebarActive(true)}>
          <RiMenu3Fill className="text-3xl" />
        </div>

        {/* Desktop Menu */}
        <div className="w-fit hidden md:flex jus gap-6 items-center ">
          <ul className=" flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#FF6F61]" : "text-white"
              }
            >
              <li className="text-lg font-semibold">Home</li>
            </NavLink>

            {authStatus && (
              <NavLink
                to="/empList"
                className={({ isActive }) =>
                  isActive ? "text-[#FF6F61]" : "text-white"
                }
              >
                <li className="text-lg font-semibold">Employee List</li>
              </NavLink>
            )}
            {authStatus && (
              <NavLink
                to="/addEmp"
                className={({ isActive }) =>
                  isActive ? "text-[#FF6F61]" : "text-white"
                }
              >
                <li className="text-lg font-semibold">Add Employee</li>
              </NavLink>
            )}
          </ul>
          {authStatus ? (
            <div className="flex gap-1 items-center">
              <p className="text-gray-500">{adminData?.name} - </p>
              <p
                className="text-lg font-semibold cursor-pointer"
                onClick={logOutHandler}
              >
                Logout
              </p>
            </div>
          ) : (
            <div>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-[#FF6F61]" : "text-white"
                }
              >
                <p className="text-lg font-semibold ">Login</p>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Menu */}

      {sidebarActive && (
        <div>
          <div
            className=" h-screen z-7 fixed top-0 w-full "
            onClick={() => setSidebarActive(false)}
          ></div>
          <div
            className={`h-full w-[260px] z-10 fixed top-0 right-0 bg-black  p-6`}
          >
            <RiCloseFill
              className="text-3xl"
              onClick={() => setSidebarActive(false)}
            />

            <div className="mt-5">
              {authStatus && (
                <>
                  <p className="text-lg font-semibold text-gray-600">
                    {adminData?.name}
                  </p>
                  <p
                    className="border-solid border-b-2 border-white pb-2 mb-2 text-lg font-semibold cursor-pointer"
                    onClick={logOutHandler}
                  >
                    Logout
                  </p>
                </>
              )}
              <ul>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-[#FF6F61]" : "text-white"
                  }
                >
                  <li className="text-lg font-semibold">Home</li>
                </NavLink>

                {authStatus && (
                  <NavLink
                    to="/empList"
                    className={({ isActive }) =>
                      isActive ? "text-[#FF6F61]" : "text-white"
                    }
                  >
                    <li className="text-lg font-semibold">Employee List</li>
                  </NavLink>
                )}
                {authStatus && (
                  <NavLink
                    to="/addEmp"
                    className={({ isActive }) =>
                      isActive ? "text-[#FF6F61]" : "text-white"
                    }
                  >
                    <li className="text-lg font-semibold">Add Employee</li>
                  </NavLink>
                )}
              </ul>
              {!authStatus && (
                <div className="space-y-3 my-2">
                  <div
                    className="min-w-[90px] w-fit py-1 px-4 font-semibold border-solid border-[#FF6F61] border-2 rounded-lg text-center bg-black bg-opacity-40 cursor-pointer"
                    onClick={() => {
                      setSidebarActive(false);
                      navigate("/login");
                    }}
                  >
                    Log in
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
