import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/authSchemas";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthPasswordInput from "../../components/auth/AuthPasswordInput";
import OAuthButton from "../../components/auth/OAuthButton";
import Divider from "../../components/auth/Divider";
import { register as signup } from "../../api/auth.api";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    // POST /api/auth/register
    await signup(data);
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start managing expenses intelligently"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthInput
          label="Name"
          register={register("name")}
          error={errors.name}
        />

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
          Create Account
        </button>
      </form>

      <Divider />
      <OAuthButton />
    </AuthLayout>
  );
}
