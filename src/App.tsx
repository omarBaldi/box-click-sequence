import './App.css';

const DEFAULT_AMOUNT_ITEMS = 5;

function App() {
  return (
    <div className='App'>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[...Array(DEFAULT_AMOUNT_ITEMS)].map((_, index: number) => {
          return (
            <div
              key={`box-#${index}`}
              style={{ height: '100px', width: '100px', border: '1px solid white' }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
