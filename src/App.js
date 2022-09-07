import React, { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.css';

const cardImages = [
  {'src': '/img/helmet-1.png', matched: false},
  {'src': '/img/potion-1.png', matched: false},
  {'src': '/img/ring-1.png', matched: false},
  {'src': '/img/scroll-1.png', matched: false},
  {'src': '/img/shield-1.png', matched: false},
  {'src': '/img/sword-1.png', matched: false}
]

function App() {
const [cards, setCards] = useState([])
const [turns, setTurns] = useState(0)
const [choice1, setChoice1] = useState(null)
const [choice2, setChoice2] = useState(null)
const [disabled, setDisabled] = useState(false)

  const shuffle = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    for(let i = shuffledCards.length - 1; i > 0; i--){
      let j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [{...shuffledCards[j], id: Math.random()}, {...shuffledCards[i], id: Math.random()}]
    }

    setChoice1(null)
    setChoice2(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card)
  }
  useEffect(() => {
    if(choice1 && choice2){
      setDisabled(true)
      if(choice1.src === choice2.src){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choice1.src){
              return {...card, matched: true}
            }
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choice1, choice2])

  const resetTurn = () => {
    setChoice1(null)
    setChoice2(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  // Start game automatically
  useEffect(() => {
    shuffle()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffle}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choice1 || card === choice2 || card.matched}
          disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;