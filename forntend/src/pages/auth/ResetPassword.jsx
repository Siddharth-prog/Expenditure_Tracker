import { useForm } from "react-hook-form";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import { resetPassword } from "../../api/auth.api";

export default function ResetPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // POST /api/auth/reset-password
    await resetPassword(data);
  };

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Choose a strong password for your account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthInput label="New Password" type="password" register={register("password")} />
        <AuthInput label="Reset Token" register={register("token")} />

        <button className="w-full bg-glow text-bg py-3 rounded-lg font-semibold">
          Update Password
        </button>
      </form>
    </AuthLayout>
  );
}
