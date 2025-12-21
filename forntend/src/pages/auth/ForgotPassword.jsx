import { useForm } from "react-hook-form";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import { forgotPassword } from "../../api/auth.api";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ email }) => {
    // POST /api/auth/forgot-password
    await forgotPassword(email);
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="We’ll send you a secure reset link"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthInput label="Email" register={register("email")} />

        <button className="w-full bg-glow text-bg py-3 rounded-lg font-semibold">
          Send Reset Link
        </button>
      </form>
    </AuthLayout>
  );
}
