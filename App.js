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
          <Route path="/show-products" element={<ProductDetailPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/settings" element={<SettingsComponent />} />

          {/* start users section                        */}
      
            {userRole === 'admin' && (
              <>
          {/*  start   admin   dashboard section  */}
          <Route path="/admin/option" element={<OptionDashboard />} />
          <Route path="/admin/add-worker" element={<AddWorkersForm />} />
          <Route path="/admin/add-Jobs" element={<AddJobForm />} />
          <Route path="/admin/dashboard" element={<Dashboard/>} />
          <Route path="/admin/add-material" element={<ProductForm />} />
          <Route path='/admin/showWorkers' element={<ShowWorkers />} />
          <Route path='/admin/showMaterial' element={<ShowMaterials />} />
          <Route path='/admin/ShowJobs' element={<ShowJobs />} /> 
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