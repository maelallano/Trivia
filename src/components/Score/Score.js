import React from 'react';
import Draggable from 'react-draggable';
import Button from '@material-ui/core/Button';

const Score = ({score, attempt, mistake, resetFct}) => {
    return (
        <Draggable>
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

            <Button size={'small'} variant={'contained'} className="Score__resetBtn" onClick={resetFct}>Reset</Button>
        </div>
        </Draggable>
    )
}

export default Score;