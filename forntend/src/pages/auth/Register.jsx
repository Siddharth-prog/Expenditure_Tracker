import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { registerSchema } from "../../validation/resgisterSchema";
import { register as signup } from "../../api/auth.api.js";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import AuthPasswordInput from "../../components/auth/AuthPasswordInput";
import OAuthButton from "../../components/auth/OAuthButton.jsx";
import Divider from "../../components/auth/Divider";

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      
     await signup(data);
     navigate(`/verify-email?email=${encodeURIComponent(data.email)}`);

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start managing expenses intelligently"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        {/* NAME */}
        <AuthInput
          id="name"
          label="Name"
          autoComplete="name"
          register={register("name")}
          error={errors.name}
        />

        {/* EMAIL */}
        <AuthInput
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          register={register("email")}
          error={errors.email}
        />

        {/* PASSWORD */}
        <AuthPasswordInput
              label="Password"
              placeholder="Password"
              {...register('password')}
              error={errors.password}
            />
          

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-glow text-bg py-3 rounded-lg font-semibold disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <Divider />
      <OAuthButton />
    </AuthLayout>
  );
}
