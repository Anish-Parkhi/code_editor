import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import Home from './pages/Home';
import { useState } from 'react';

function App() {
  const queryClient = new QueryClient();
  const [theme, setTheme] = useState('dark');
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <Home theme={theme} setTheme={setTheme} />
          <CssBaseline />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
