import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Google from '../components/signupform';
import { useDispatch } from 'react-redux';
import { signInStart,signInFailure,sigInSuccess } from '../redux/user/userSlice';
import Loading from '../components/loading'

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch= useDispatch();
  



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      setLoading(true)
      const res = await fetch('/api/auth/signin',  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.Success === false) {
        dispatch(signInFailure(data.message))
        setLoading(false)
        return;
      }
    dispatch(sigInSuccess(data));
      navigate('/');
      setLoading(false)
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  if(loading){
    return <Loading/>;
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'login'}
        </button>
        <Google/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to={'/signup'}>
          <span className='text-blue-700'>Get stared</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}