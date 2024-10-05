import React, { useState } from 'react';
import './App.css';
import ResponsiveAppBar from './components/appBar';
import ProdutosList from './components/produtosList';

function App() {

  return (
    <div className="App">
      <ResponsiveAppBar />
      <ProdutosList />
    </div>
  );
}

export default App;
