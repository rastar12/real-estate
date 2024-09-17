import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Google from '../components/signupform';
import Loading from '../components/loading';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [selectedType, setSelectedType] = useState(''); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Handler for text inputs
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handler for radio buttons
  const handleRadioChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Update formData to include selectedType
      const updatedFormData = {
        ...formData,
        accountType: selectedType,
      };

      console.log('Updated Form Data:', updatedFormData); // Log updated formData

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      const data = await res.json();
      console.log(data); 

      if (data.Success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/Login');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleInputChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleInputChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleInputChange}
        />
        <div>
          <div className="max-w-2xl mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-slate-700 mb-4">Select Account Type</h1>
            <div className="space-y-4">
              {/* Radio Button for Buying Houses */}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="buying"
                  name="accountType"
                  value="buying"
                  checked={selectedType === 'buying'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-slate-700 focus:ring-slate-500 border-slate-300 rounded"
                />
                <label htmlFor="buying" className="ml-2 text-slate-600 text-sm font-medium">
                  Buying Houses
                </label>
              </div>

              {/* Radio Button for Selling Houses */}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="selling"
                  name="accountType"
                  value="selling"
                  checked={selectedType === 'selling'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-slate-700 focus:ring-slate-500 border-slate-300 rounded"
                />
                <label htmlFor="selling" className="ml-2 text-slate-600 text-sm font-medium">
                  Selling Houses
                </label>
              </div>

              {/* Radio Button for Advertising */}
              <div className="flex items-center">
                <input
                  type="radio"
                  id="advertising"
                  name="accountType"
                  value="advertising"
                  checked={selectedType === 'advertising'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-slate-700 focus:ring-slate-500 border-slate-300 rounded"
                />
                <label htmlFor="advertising" className="ml-2 text-slate-600 text-sm font-medium">
                  Advertising
                </label>
              </div>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <Google />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/Login'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
