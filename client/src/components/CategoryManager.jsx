// src/components/CategoryManager.jsx
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, addCategory } from '../features/categories/categorySlice';
import { FaTimes } from 'react-icons/fa';

function CategoryManager() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const { items: categories } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addCategory(name));
        setName('');
    };

    return (
        <div className='bg-slate-800 p-6 rounded-xl shadow-lg'>
            <h2 className='text-2xl font-bold mb-4'>Your Categories</h2>
            <form onSubmit={onSubmit} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="New category name..."
                    className="flex-grow p-2 bg-slate-700 rounded-md border border-slate-600"
                    required
                />
                <button type="submit" className="bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-700">Add</button>
            </form>
            <ul className="space-y-2">
                {categories.map(cat => (
                    <li key={cat._id} className="flex justify-between items-center bg-slate-700 p-2 rounded-md">
                        <span>{cat.name}</span>
                        {/* Delete button functionality can be added here later */}
                        <button className='text-red-500'><FaTimes /></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryManager;