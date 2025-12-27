import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';

import AuthPasswordInput from '../../components/auth/AuthPasswordInput';
import OAuthButton from '../../components/auth/OAuthButton';
import Divider from '../../components/auth/Divider';

import { login } from '../../api/auth.api.js';
import { loginSchema } from '../../validation/loginSchema.js';

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data); // cookie set by backend
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-full max-w-md bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Login</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL */}
          <div>
            <input {...register('email')} placeholder="Email" autoComplete="email"
 className="text-black w-full" />
            {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            {/* PASSWORD */}
            <AuthPasswordInput
              label="Password"
              placeholder="Password"
              {...register('password')}
              error={errors.password}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-glow text-bg py-3 rounded-xl"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* LINKS */}
        <div className="flex justify-between text-sm mt-3">
          <Link to="/forgot-password" className="text-glow">
            Forgot password?
          </Link>
          <Link to="/register" className="text-glow">
            Create account
          </Link>
        </div>

        <Divider />

        {/* GOOGLE OAUTH */}
        <OAuthButton provider="google" />
      </div>
    </div>
  );
}
