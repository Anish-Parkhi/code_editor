import Editor from '@monaco-editor/react';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import axios from 'axios';
import { useRef, useState } from 'react';
import {Blocks} from 'react-loader-spinner'; // Make sure to install this package
import logo from '../assets/js.svg';
import styles from './styles.module.css';

function CodeEditor() {
  const editorRef = useRef(null);
  const [res, setRes] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading);

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
        className={`p-4 flex flex-row flex-end ${isLoading ? 'blur-sm' : ''}`}
      >
        <img src={logo} alt="logo" className="w-8 h-8" />
        <h1 className="text-2xl ml-2 flex flex-col">
          <div className="justify-end self-end justify-self-end content-end">
            Editor
          </div>
        </h1>
      </div>
      <div className={`flex flex-row w-full ${isLoading ? 'blur-sm' : ''}`}>
        <div className={` ${styles.containerbg} rounded-lg border-2 m-2 border-slate-800 border-solid basis-1/2`}>
          <div className="p-2">script.js</div>
          <div className="border-slate-600 border-2"></div>
          <Editor
            className="mt-2"
            height="60vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            onMount={handleEditorDidMount}
            theme="vs-dark"
          />
        </div>
        <div className={`${styles.containerbg} rounded-lg border-2 m-2 border-slate-800 border-solid basis-1/2`}>
          <div className="p-2">Console.log</div>
          <div className="border-slate-600 border-2"></div>
          <div className="p-2">{res && res.result}</div>
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
    </div>
  );
}

export default CodeEditor;
