import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home, Heart, Menu } from 'lucide-react';
import { HomePage } from './pages/HomePage';
import { RecipePage } from './pages/RecipePage';
import { FavoritesPage } from './pages/FavoritesPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <Link to="/" className="text-xl font-bold text-gray-900">
                Recipe App
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="flex items-center space-x-1 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Home className="h-5 w-5" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center space-x-1 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;