import Logo from "../assets/logo/sse_icon.png";
import Button from "../shared/components/ui/Button";
import Textfield from "../shared/components/ui/Textfield";
import { CiUser, CiLock } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

function Login() {
  return (
    <section className="flex flex-col min-h-screen items-center justify-center">
      <form className="w-full max-w-xl space-y-4 rounded-control border border-gate-control-light-border-glass  bg-gate-control-light-surface-glass p-8 backdrop-blur ">
        <div className="flex flex-col justify-center items-center">
          <img src={Logo} alt="SSE-LOGO" className="w-1/5 h-1/5 " />
          <h1 className="text-center text-2xl font-semibold text-fg text-gate-control-light-text-primary">
            Εφαρμογή Πύλης ΣΣΕ
          </h1>
        </div>

        <Textfield
          title={"Όνομα χρήστη"}
          type={"email"}
          placeholder={"Όνομα Χρήστη"}
          icon={CiUser}
        />
        <Textfield
          title={"Κωδικός Πρόσβασης"}
          type={"password"}
          icon={CiLock}
        />
        <div className="flex  justify-center items-center">
          <Button type="sumbit" className="w-full">
            Σύνδεση
          </Button>
        </div>
      </form>
      <span className="my-2.5 flex flex-row justify-center items-center space-x-2.5 text-gate-control-light-text-secondary text-xs">
        <IoShieldCheckmarkOutline />
        <p>Μόνο εξουσιοδοτημένο προσωπικό · Στρατιωτική Σχολή Ευελπίδων</p>
      </span>
    </section>
  );
}

export default Login;
