import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/authSchemas";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthPasswordInput from "../../components/auth/AuthPasswordInput";
import OAuthButton from "../../components/auth/OAuthButton";
import Divider from "../../components/auth/Divider";
import { login } from "../../api/auth.api";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    // POST /api/auth/login
    await login(data);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthInput
          label="Email"
          register={register("email")}
          error={errors.email}
        />

        <AuthPasswordInput
          label="Password"
          register={register("password")}
          error={errors.password}
        />

        <button className="w-full bg-glow text-bg py-3 rounded-lg font-semibold">
          Sign In
        </button>
      </form>

      <Divider />
      <OAuthButton />

      <p className="text-sm text-center mt-6 text-textMuted">
        <a href="/forgot-password" className="hover:text-glow">
          Forgot password?
        </a>
      </p>
    </AuthLayout>
  );
}
