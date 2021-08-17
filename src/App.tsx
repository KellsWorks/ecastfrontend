import { Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPageFooter from './components/layouts/LandingPageFooter';
import LandingPageHeader from './components/layouts/LandingPageHeader';
import { ThemeProvider } from './context/themeContext';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Overview from './pages/dashboard/overview/Overview.jsx';
import Contacts from './pages/dashboard/podcast/Contacts';
import Episodes from './pages/dashboard/podcast/Episodes';
import Events from './pages/dashboard/podcast/episodes/Events';
import UserInfo from './pages/dashboard/user/UserInfo';
import LandingPage from './pages/LandingPage';
import OnBoarding from './pages/OnBoarding';

function App() {
  return (
    <div>
      <ThemeProvider initialTheme="light">
      <Switch>

          <Route path="/" exact> 
            <LandingPageHeader/>
            <LandingPage/>
            <LandingPageFooter/>
          </Route>

          <Route path="/get-started"> 
            <OnBoarding/>
          </Route>

          <Route path="/sign-in"> 
            <LandingPageHeader/>
            <Login/>
            <LandingPageFooter/>
          </Route>

          <Route path="/sign-up"> 
            <LandingPageHeader/>
            <Register/>
            <LandingPageFooter/>
          </Route>

          <Route path="/forgot-password"> 
            <LandingPageHeader/>
            <ForgotPassword/>
            <LandingPageFooter/>
          </Route>

          {/* Dashboard routes */}

          <Route path="/dashboard/overview"> 
            <Overview/>
          </Route>

          <Route path="/dashboard/profile"> 
            <UserInfo/>
          </Route>

          <Route path="/dashboard/episodes"> 
            <Episodes/>
          </Route>

          <Route path="/dashboard/contacts"> 
            <Contacts/>
          </Route>

          <Route path="/dashboard/events"> 
            <Events/>
          </Route>

        </Switch>
        </ThemeProvider>
    </div>
  );
}

export default App;
