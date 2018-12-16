import React from 'react';

const Score = ({score, attempt, mistake, resetFct}) => {
    return (
        <div className="Score">
            <p className="Score__score">
                Score: <span className="Score__score__span">{score}</span>/10
            </p>
            <p className="Score__attempt">
                Attempts: <span className="Score__attempt__span">{attempt}</span>
            </p>
            <p className="Score__mistake">
                Mistakes: <span className="Score__mistake__span">{mistake}</span>
            </p>

            <button className="Score__resetBtn" onClick={resetFct}>Reset</button>
        </div>
    )
}

export default Score;