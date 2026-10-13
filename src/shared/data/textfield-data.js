import { CiUser, CiLock, CiMail, CiPhone } from "react-icons/ci";

export const FIELD_TYPES = {
  text: { inputType: "text", icon: null },
  username: {
    inputType: "text",
    icon: CiUser,
    autoComplete: "username",
    placeholder: "Username",
  },
  email: {
    inputType: "email",
    icon: CiMail,
    autoComplete: "email",
    inputMode: "email",
    placeholder: "you@company.com",
  },
  tel: {
    inputType: "tel",
    icon: CiPhone,
    autoComplete: "tel",
    inputMode: "tel",
    placeholder: "+30 690 000 0000",
  },
  password: {
    inputType: "password",
    icon: CiLock,
    autoComplete: "current-password",
    placeholder: "••••••••",
  },
};
