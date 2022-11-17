import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Album from './components/Album/Album';
import Artboard from './components/Gallery/Artboard';


import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AlbumPage from './pages/AlbumPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
        {authCtx.isLoggedIn && <Artboard />}
          {!authCtx.isLoggedIn && <HomePage/>}
        </Route>

        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>
        <Route path='/artboard'>
          {authCtx.isLoggedIn && <Artboard/>}
          {!authCtx.isLoggedIn && <Redirect to='/' />}
        </Route>

        <Route path='/album'>
          {authCtx.isLoggedIn && <Album albumName='albumOne'/>}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>

        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;