import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import ForgotPassword from './components/auth/ForgotPassword';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ResetPassword from './components/auth/ResetPassword';
import VerifyEmail from './components/auth/VerifyEmail';
import Home from './components/home/Home';
import DefaultLayout from './components/layouts/DefaultLayout';
import HomeLayout from './components/layouts/HomeLayout';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Auth routes */}
                    <Route path="/register" element={<DefaultLayout><Register /></DefaultLayout>} />
                    <Route path="/login" element={<DefaultLayout><Login /></DefaultLayout>} />
                    <Route path="/verify-email" element={<DefaultLayout><VerifyEmail /></DefaultLayout>} />
                    <Route path="/forgot-password" element={<DefaultLayout><ForgotPassword /></DefaultLayout>} />
                    <Route path="/reset-password" element={<DefaultLayout><ResetPassword /></DefaultLayout>} />
                    {/* Home route */}
                    <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
                    {/* Catch-all route for 404 */}
                    <Route path="*" element={<DefaultLayout><NotFound /></DefaultLayout>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
