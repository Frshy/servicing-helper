import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth, user, userLoading } from './api/auth'
import { Dashboard } from './pages/Dashboard'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

const App = () => {
  const { user: fetchedUser, loading: authLoading } = useAuth();

  userLoading.value = authLoading;
  user.value = fetchedUser;

  return (
    <div className='bg-gray-900 w-full h-full font-poppins'>
      <Toaster />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
