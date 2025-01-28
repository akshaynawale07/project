import React from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default App;