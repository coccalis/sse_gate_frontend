import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/logo/sse_icon.png";
import Button from "../shared/components/ui/Button";
import Textfield from "../shared/components/ui/Textfield";
import { CiUser, CiLock } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../store/authSlice";
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
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
    <section className="flex min-h-screen flex-col items-center justify-center bg-gate-control-light-background-primary px-4 dark:bg-gate-control-dark-background-primary">
      <div className="w-full max-w-xl space-y-5 rounded-control border border-gate-control-light-border-glass bg-gate-control-light-surface-glass p-8 shadow-sm backdrop-blur-xl dark:border-gate-control-dark-border-glass dark:bg-gate-control-dark-surface-glass">
        <div className="flex flex-col items-center justify-center">
          <img src={Logo} alt="SSE-LOGO" className="w-1/5 h-1/5" />
          <h1 className="text-center text-2xl font-semibold text-gate-control-light-text-primary dark:text-gate-control-dark-text-primary">
            {t("appName")}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Textfield
            title={t("usernameTextFiledLogin")}
            type={"text"}
            placeholder={t("usernameTextFiledLogin")}
            name="username"
            icon={CiUser}
            value={form.username}
            onChange={handleChange}
          />
          <Textfield
            title={t("passwordTextFiledLogin")}
            type={"password"}
            name="password"
            icon={CiLock}
            value={form.password}
            onChange={handleChange}
          />
          <div className="flex  justify-center items-center">
            <Button type="submit" className="w-full">
              {t("btnLogin")}
            </Button>
          </div>
        </form>
      </div>
      <span className="my-2.5 flex flex-row items-center justify-center space-x-2.5 text-xs text-gate-control-light-text-secondary dark:text-gate-control-dark-text-secondary">
        <IoShieldCheckmarkOutline />
        <p>{t("secureAccessNote")}</p>
      </span>
    </section>
  );
}

export default Login;
