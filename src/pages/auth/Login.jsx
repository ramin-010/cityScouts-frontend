import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../recoil/useAuth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSumbit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to log in. Please try again');
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold font-excon text-white">
              Sign in to your account
            </h2>
            <p className="text-center">
              Or{' '}
              <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-400 ">
                create an new account
              </Link>
            </p>
          </div>

          {error && (
            <div className="text-center bg-red-900/50 text-red-200 rounded-md px-2 py-2 text-sm overflow-x-auto ">
              {error}
            </div>
          )}
          <form className="mt-8 space-y-6">
            <div className="rounded-md -space-y-px">
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  placeholder="Email address"
                  name="email"
                  onChange={handleChange}
                  autoComplete="email"
                  value={formData.email}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  type="email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-600 bg-gray-700 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-teal-500 hover:text-teal-400">
                  {/* Forgot your password? */}
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSumbit}
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
