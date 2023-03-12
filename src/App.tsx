import { useState } from 'react';
import './App.css';

const DEFAULT_AMOUNT_ITEMS = 5;

function App() {
  const [indexesBoxesClicked, setIndexesBoxesClicked] = useState<number[]>([]);

  const handleBoxClick = ({ i: newIndex }: { i: number }): void => {
    setIndexesBoxesClicked((prevIndexes) => [...prevIndexes, newIndex]);
  };

  return (
    <div className='App'>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[...Array(DEFAULT_AMOUNT_ITEMS)].map((_, index: number) => {
          return (
            <div
              key={`box-#${index}`}
              onClick={
                indexesBoxesClicked.includes(index)
                  ? undefined
                  : () => handleBoxClick({ i: index })
              }
              style={{
                height: '100px',
                width: '100px',
                border: '1px solid white',
                cursor: 'pointer',
                ...(indexesBoxesClicked.includes(index) && { backgroundColor: 'green' }),
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
