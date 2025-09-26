import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import { FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                name,
                email,
                password,
            };
            dispatch(register(userData));
        }
    };

    if (isLoading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className='w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl'
                >
                    <section className='text-center mb-8'>
                        <h1 className='text-4xl font-bold flex items-center justify-center gap-3'>
                            <FaUser /> Create Account
                        </h1>
                        <p className='text-slate-400 mt-2'>Start tracking your coins today!</p>
                    </section>
                    <section>
                        <form onSubmit={onSubmit}>
                            <div className='mb-4'>
                                <input
                                    type='text'
                                    id='name'
                                    name='name'
                                    value={name}
                                    onChange={onChange}
                                    className='w-full p-3 bg-slate-800/50 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
                                    placeholder='Enter your name'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                    className='w-full p-3 bg-slate-800/50 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
                                    placeholder='Enter your email'
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                    className='w-full p-3 bg-slate-800/50 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
                                    placeholder='Enter password'
                                    required
                                />
                            </div>
                            <div className='mb-6'>
                                <input
                                    type='password'
                                    id='password2'
                                    name='password2'
                                    value={password2}
                                    onChange={onChange}
                                    className='w-full p-3 bg-slate-800/50 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition'
                                    placeholder='Confirm password'
                                    required
                                />
                            </div>
                            <div>
                                <button
                                    type='submit'
                                    className='w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition duration-300'
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <p className='text-center mt-6 text-slate-400'>
                            Already have an account?{' '}
                            <Link to='/login' className='font-medium text-sky-400 hover:underline'>
                                Login
                            </Link>
                        </p>
                    </section>
                </motion.div>
            </div>
        </>
    );
}

export default Register;
