import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Navigation } from './components/Navigation';
import { Cart } from './components/Cart';
import { store } from './store/store';
import { CategoryPage } from './pages/CategoryPage';

const App= () => {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Cart />
        <Routes>
          <Route path="/" element={<Navigate to="/food" replace />} />
          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
