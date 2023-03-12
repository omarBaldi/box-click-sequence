import { useEffect, useState } from 'react';
import './App.css';

const DEFAULT_AMOUNT_ITEMS = 5;

function App() {
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [indexesBoxesClicked, setIndexesBoxesClicked] = useState<number[]>([]);

  useEffect(() => {
    if (indexesBoxesClicked.length === DEFAULT_AMOUNT_ITEMS) {
      setIsRemoving(true);
    }

    if (!isRemoving) return;

    /**
     * After having finished removing all of the indexes previously
     * stored into the array (and in doing so reverted all the boxes
     * to their default colors), reset the state value so I do not
     * remove the index as soon as I click a new one.
     */
    if (indexesBoxesClicked.length <= 0) {
      return setIsRemoving(false);
    }

    const removeOldestIndexFromBoxClicked = (): void => {
      setIndexesBoxesClicked((prevIndexesClicked) => {
        const [oldestIndexClicked, ...rest] = prevIndexesClicked;
        return typeof oldestIndexClicked === 'undefined' ? prevIndexesClicked : [...rest];
      });
    };

    const defaultTimeoutTime = 1000;
    const timeout = setTimeout(removeOldestIndexFromBoxClicked, defaultTimeoutTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [indexesBoxesClicked, isRemoving]);

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
                indexesBoxesClicked.includes(index) || isRemoving
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
