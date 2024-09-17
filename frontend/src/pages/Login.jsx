import AdminLogin from "../components/AdminLogin";

function Login() {
  return (
    <div className="w-full mt-3 min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div
        className={`mx-auto max-w-md sm:max-w-lg bg-gray-100 rounded-xl p-5 sm:p-10 border border-black/10 flex flex-col items-center`}
      >
        <AdminLogin />
      </div>
    </div>
  );
}

export default Login;
