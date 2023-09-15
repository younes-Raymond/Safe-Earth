import React , {useEffect, useState }from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './Routes/PrivateRoutes';
import CheckUserRole  from './Routes/checkUserRole';

const userRole = CheckUserRole()


const App = () => {

  return (
    <>
      <Router>
        {userRole !== 'unknown' && <Header />}
        <Routes>
          <Route element={<PrivateRoutes /> }>
           {/* start user section              */}
          <Route element={<Optionbox />} path='/' exact />
          <Route path="/about-us" element={<Aboutus />} />

          {/* start users section                        */}
      
            {userRole === 'admin' && (
              <>
          {/*  start   admin   dashboard section  */}
        {/*end   admin   dashboard section  */}

              </>
        )}

        {/* start profile section  */}
        <Route path="/profile" element={<Profile />} />
        {/* end  profile section  */}
          </Route>

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />       
          <Route path="/learn-more" element={<LearnBoxes />} />
          <Route path='/Marketing-plan' element={<MarketingPlan />} />
          {/* <Route path="/" element={<Optionbox />} /> */}   

        </Routes>
      </Router>
    </>
  );

};

export default App;