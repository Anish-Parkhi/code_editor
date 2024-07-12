import Editor from '@monaco-editor/react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Blocks } from 'react-loader-spinner'; // Make sure to install this package
import logo from '../assets/js.svg';
import styles from './styles.module.css';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

function CodeEditor({ setTheme, theme }) {
  const editorRef = useRef(null);
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  console.log(isLoading);

  const handleThemeChange = () => {
    setChecked((prev) => !prev);
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  const submitCode = async () => {
    setIsLoading(true);
    const code = editorRef.current.getValue();
    console.log(code);
    try {
      const res = await axios.post(
        'https://668ee5be83617cb8eb9e.appwrite.global/runcode',
        { code: code }
      );
      setRes(res.data);
    } catch (error) {
      console.error('Error executing code:', error);
      setRes({ error: 'Error executing code' });
    }
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
          <Blocks
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
          />
        </div>
      )}
      <div
        className={`p-4 flex flex-row justify-between ${
          isLoading ? 'blur-sm' : ''
        }`}
      >
        <div className="flex flex-row">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <h1 className="text-2xl ml-2 flex flex-col">
            <div className="justify-end self-end justify-self-end content-end">
              Editor
            </div>
          </h1>
        </div>
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} checked={checked} />}
          // label="MUI switch"
          onClick={handleThemeChange}
        />
      </div>
      <div className={`flex flex-row w-full ${isLoading ? 'blur-sm' : ''}`}>
        <div
          className={` ${
            theme === 'light' ? styles.editorContainer : null
          } rounded-lg border-2 m-2 border-slate-800 border-solid basis-1/2`}
        >
          <div className={`${theme === 'light' ? styles.textColor : null} p-2`}>
            script.js
          </div>
          <div className={` border-slate-600 border-2`}></div>
          <Editor
            className="mt-2"
            height="60vh"
            defaultLanguage="javascript"
            defaultValue={`function a() {
  return 1;
}
a();`}
            onMount={handleEditorDidMount}
            theme={theme === 'light' ? 'light' : 'vs-dark'}
          />
        </div>
        <div
          className={`${theme === 'light' ? styles.consoleContiner : null} ${
            styles.containerbg
          } rounded-lg border-2 m-2 border-slate-800 border-solid basis-1/2`}
        >
          <div className={`${theme === 'light' ? styles.textColor : null} p-2`}>
            Console.log
          </div>
          <div className="border-slate-600 border-2"></div>
          <div className="p-2">
            {res ? (res.error ? res.error : res.result) : null}
          </div>
        </div>
      </div>
      <div className={`flex ${isLoading ? 'blur-sm' : ''}`}>
        <PlayCircleIcon
          onClick={submitCode}
          sx={{
            fontSize: '4rem',
            margin: 'auto',
            position: 'relative',
            top: '-3rem',
            left: '-4rem',
            cursor: 'pointer',
          }}
        />
      </div>
      <div className="flex justify-center">
        <div>Developed by @Anish Parkhi</div>
      </div>
    </div>
  );
}

export default CodeEditor;
