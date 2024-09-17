import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const adminStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  return (
    <div>
      {adminStatus ? (
        <div>
          <p>Wellcome to admin panel</p>
        </div>
      ) : (
        <div className="w-fit space-y-2">
          <p className="text-xl sm:text-2xl font-bold">
            Please login to access the features
          </p>
          <div
            className="w-[125px] py-1 px-4 mx-auto text-lg font-semibold border-solid border-[#FF6F61] border-2 rounded-lg text-center cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
