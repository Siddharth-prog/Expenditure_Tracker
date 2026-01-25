// src/pages/auth/SetPassword.jsx
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthPasswordInput from "../../components/auth/AuthPasswordInput";
import { setPassword } from "../../api/auth.api";

export default function SetPassword() {
  const { register, handleSubmit } = useForm();
  const [params] = useSearchParams();
  const navigate = useNavigate(); // ✅ hook at top level

  const token = params.get("token");

  const onSubmit = async (data) => {
    try {
      await setPassword({
        password: data.password,
        token,
      });

      navigate("/dashboard"); // ✅ works
    } catch (error) {
      console.error("SET PASSWORD ERROR:", error);
    }
  };

  return (
    <AuthLayout
      title="Secure your account"
      subtitle="Set a password for future email login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthPasswordInput
          label="Password"
          {...register("password", { required: true })}
        />

        <button
          type="submit"
          className="w-full bg-glow text-bg py-3 rounded-lg font-semibold"
        >
          Set Password
        </button>
      </form>
    </AuthLayout>
  );
}
