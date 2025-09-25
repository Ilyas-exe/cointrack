import { FaUser } from 'react-icons/fa';
import { useState } from 'react';

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // 3. Destructure the formData for easier access
  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    console.log(formData);
  };

  return (
    <>
      {/* Main Container */}
      <div className='max-w-md mx-auto mt-10 bg-slate-800 p-8 rounded-xl shadow-lg'>

        {/* Heading Section */}
        <section className='text-center mb-8'>
          <h1 className='text-3xl font-bold flex items-center justify-center gap-2'>
            Register
          </h1>
          <p className='text-slate-400 mt-2'>Please create an account</p>
        </section>

        {/* Form Section */}
        <section>
          <form onSubmit={onSubmit} >
            <div className='mb-4'>
              <label htmlFor='name' className='block mb-2 font-medium'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                value={name}
                onChange={onChange}
                className='w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
                placeholder='Enter your name'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='block mb-2 font-medium'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={onChange}
                className='w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
                placeholder='Enter your email'
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block mb-2 font-medium'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                value={password}
                onChange={onChange}
                className='w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
                placeholder='Enter password'
                required
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='password2' className='block mb-2 font-medium'>Confirm Password</label>
              <input
                type='password'
                id='password2'
                name='password2'
                value={password2}
                onChange={onChange}
                className='w-full p-3 bg-slate-700 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
                placeholder='Confirm password'
                required
              />
            </div>
            <div>
              <button
                type='submit'
                className='w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 transition duration-300'
              >
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Register;