import * as React from 'react'
import { CssBaseline } from '@mui/material';
import ResponsiveAppBar from './components/appBar';
import ProdutosList from './components/produtosList';
import { ThemeProvider, createTheme } from '@mui/material/styles'

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <div className="App">
          <ResponsiveAppBar />
          <ProdutosList />
        </div>
      </ThemeProvider>
    </ React.Fragment >
  );
}

export default App;
