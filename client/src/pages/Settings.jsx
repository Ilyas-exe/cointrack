import CategoryManager from '../components/CategoryManager';

function Settings() {
  return (
    <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold mb-8'>Settings & Budgets</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <CategoryManager />
            

            {/* We will build the budget manager here */}
            <div className='bg-slate-800 p-6 rounded-xl shadow-lg'>
                <h2 className='text-2xl font-bold mb-4'>Your Budgets</h2>
                <p className='text-slate-400'>Coming soon...</p>
            </div>
        </div>
    </div>
  )
}

export default Settings;