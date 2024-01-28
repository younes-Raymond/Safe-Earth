import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/Home/Home';
import SignIn from './components/Auth/SingIn';
import SignUp from './components/Auth/SingUp';
import Menu from './components/Home/Menu';
import Blog from './components/Blogs/Blog';
import Checkout from './components/payments/Checkout.jsx';
import Settings from './components/Layouts/Settings.jsx';
import PdfGenerator from './components/Home/docxGenerator.jsx'
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {!isHomePage && <Menu />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/CheckOut" element={<Checkout />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/PdfGenerator" element={<PdfGenerator />} />
      </Routes>
    </>
  );
}

export default App;
