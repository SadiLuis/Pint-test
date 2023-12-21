/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/templates/Layout';
import Home from './components/templates/Home';
import { AuthContextProvider } from './context/AuthProvider';
import CreateImageForm from './components/organisms/CreateImageForm';
import Navbar from './components/organisms/Navbar';
import ImageGallery from './components/organisms/ImageGallery';

function App() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [imagesFromFirestore, setImagesFromFirestore] = useState<FirestoreImage[]>([]);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

 

  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <ImageGallery images={searchResults.length > 0 ? searchResults : imagesFromFirestore} />
              </Layout>
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateImageForm />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
