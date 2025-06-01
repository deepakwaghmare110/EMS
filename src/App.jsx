import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import Shortlisted from './pages/Shortlisted';
import { AtlassianNavigation, PrimaryButton, ProductHome } from '@atlaskit/atlassian-navigation';
import { ShortlistProvider } from './context/ShortlistContext';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ShortlistProvider>
        <AtlassianNavigation
          label="EMS"
          primaryItems={[
            <Link to="/" key="home"><PrimaryButton>Employees</PrimaryButton></Link>,
            <Link to="/shortlisted" key="shortlisted"><PrimaryButton>Shortlisted</PrimaryButton></Link>,
          ]}
          productHome={<ProductHome href="#" siteTitle="EMS System" />}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shortlisted" element={<Shortlisted />} />
          </Routes>
        </main>
      </ShortlistProvider>
    </BrowserRouter>
  );
}

export default App;
