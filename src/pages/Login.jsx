import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/logo/sse_icon.png";
import Button from "../shared/components/ui/Button";
import Textfield from "../shared/components/ui/Textfield";
import { CiUser, CiLock } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../store/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ username: "", password: "" });

  const from = location.state?.from?.pathname || "/home";

  if (user) return <Navigate to={from} replace />;

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    console.log("HELLLOOOO?");
    e.preventDefault();
    const result = await dispatch(login(form));
    console.log(result);
    if (login.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  };
  return (
    <section className="flex flex-col min-h-screen items-center justify-center ">
      <div className="w-full max-w-xl space-y-5 rounded-control border border-gate-control-light-border-glass  bg-gate-control-light-surface-glass p-8 backdrop-blur ">
        <div className="flex flex-col justify-center items-center">
          <img src={Logo} alt="SSE-LOGO" className="w-1/5 h-1/5 " />
          <h1 className="text-center text-2xl font-semibold text-fg text-gate-control-light-text-primary">
            Εφαρμογή Πύλης ΣΣΕ
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Textfield
            title={"Όνομα χρήστη"}
            type={"text"}
            placeholder={"Όνομα Χρήστη"}
            name="username"
            icon={CiUser}
            value={form.username}
            onChange={handleChange}
          />
          <Textfield
            title={"Κωδικός Πρόσβασης"}
            type={"password"}
            name="password"
            icon={CiLock}
            value={form.password}
            onChange={handleChange}
          />
          <div className="flex  justify-center items-center">
            <Button type="submit" className="w-full">
              Σύνδεση
            </Button>
          </div>
        </form>
      </div>
      <span className="my-2.5 flex flex-row justify-center items-center space-x-2.5 text-gate-control-light-text-secondary text-xs">
        <IoShieldCheckmarkOutline />
        <p>Μόνο εξουσιοδοτημένο προσωπικό · Στρατιωτική Σχολή Ευελπίδων</p>
      </span>
    </section>
  );
}

export default Login;
