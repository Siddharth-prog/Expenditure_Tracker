import { useForm } from "react-hook-form";
import AuthLayout from "../../components/auth/AuthLayout";
import { setPassword } from "../../api/auth.api";
import AuthPasswordInput from "../../components/auth/AuthPasswordInput";

export default function SetPassword() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    // POST /api/auth/set-password
    await setPassword(data);
  };

  return (
    <AuthLayout
      title="Secure your account"
      subtitle="Set a password for future email login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthPasswordInput label="Password"  register={register("password")} />

        <button className="w-full bg-glow text-bg py-3 rounded-lg font-semibold">
          Set Password
        </button>
      </form>
    </AuthLayout>
  );
}
