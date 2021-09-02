import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Breadcrumbs from '../components/breadcrumb/Breadcrumbs';
import Layout from '../components/layout/Layout';
import ContextProvider from '../context/ContextItems';
import Routes from '../routes/Routes';


function Home() {
  return (
   
    <Router basename='/ipo'>
      <Layout>
        <ContextProvider>
          <Breadcrumbs />
          <ToastContainer />
          <Routes />
        </ContextProvider>
      </Layout>
    </Router>
  );
}

export default Home;
