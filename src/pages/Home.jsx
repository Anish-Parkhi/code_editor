import CodeEditor from '../components/CodeEditor';

function Home({ setTheme, theme }) {
  return (
    <div>
      <CodeEditor theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default Home;
