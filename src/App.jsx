import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const generateCards = (level) => {
  const images = ['🍋','🍆','🍍','🍎','🍏','🍉','🍊','🍑','🍇','🍐','🍒','🍓','❤️','🎅',"🚒","🚕"];
  // 🚖
  // 🚗
  // 🚙
  // 🚚
  // 🚛
  // 🚜


  switch (level) {
    case 'easy':
      return images.slice(0, 8);
    case 'medium':
      return images.slice(0, 12);
    case 'hard':
      return images.slice(0, 15);
    default:
      return images;
  }
};

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const [level, setLevel] = useState('easy');
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [chances, setChances] = useState(7);

  useEffect(() => {
    const generatedCards = generateCards(level);
    const shuffledCards = shuffleArray([...generatedCards, ...generatedCards]);
    setCards(shuffledCards);
    setChances(7);
  }, [level]);

  const handleCardClick = (index) => {
    if (flippedCards.length === 2) {
      return;
    }

    setFlippedCards([...flippedCards, index]);

    if (flippedCards.length === 1) {
      setTimeout(() => {
        if (cards[flippedCards[0]] === cards[index]) {
          setMatchedCards((prevMatchedCards) => [...prevMatchedCards, flippedCards[0], index]);
        } else {
          setChances((prevChances) => prevChances - 1);
        }

        setFlippedCards([]);

        if (chances === 1) {
          
          alert('Game Over! You ran out of chances.');
          setMatchedCards([]);
          setChances(7);
        }
      }, 500);
    }
  };

  const resetGame = () => {
    setChances(7);
    setMatchedCards([]);
    setFlippedCards([]);
    setLevel('easy');
  };

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <label htmlFor="difficulty" className="mr-2">Select Difficulty:</label>
        <select id="difficulty" className="form-control" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className=" mx-5 row row-cols-6 row-cols-sm-4 row-cols-md-5 row-cols-lg-7 gap-2">
        {cards.map((card, index) => (
          <div
            key={index}
            style={{ fontSize: "30px", cursor: "pointer" }}
            className={`col bg-light border border-dark rounded p-0 rounded-md  ${flippedCards.includes(index) || matchedCards.includes(index) ? 'opacity-100' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {flippedCards.includes(index) || matchedCards.includes(index) ? card : '?'}
          </div>
        ))}
      </div>

      <div className="mt-3">
        <p>Chances Left: {chances}</p>
        <button className="btn btn-primary" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default App;
