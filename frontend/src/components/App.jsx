import { Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from './home';
import Team from './team';
import Bottom from './bottom';
import CardAni from './use';
import DemoVideo from './video';
import Footer from './footer';
import Join from './join.jsx';
import Suggestion from './suggestion.jsx';
import Organizations from './organization.jsx';
import Spons from './spons.jsx';
import Donate from './donate.jsx';
import Documentation from './document.jsx';
import Login from './login.jsx';
import Register from './register.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Home />
          <Team />
          <Bottom />
          <CardAni />
          <DemoVideo />
          <Footer />
        </>
      } />

      <Route path="/join" element={<Join />} />
      <Route path="/suggestion" element={<Suggestion />} />
      <Route path="/organization" element={<Organizations />} />
      <Route path="/spons" element={<Spons />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />

    </Routes>

  );
}

export default App;
