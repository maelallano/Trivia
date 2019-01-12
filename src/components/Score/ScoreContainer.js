import React, {Component} from 'react';
import Score from './Score';
import './Score.css';

class ScoreContainer extends Component {
    constructor(props) {
        super(props);

        if (!localStorage.getItem('trivia')) {
            localStorage.setItem('trivia', JSON.stringify({score: 0, mistake: 0, attempt: 0}));
        }
        const score = JSON.parse(localStorage.getItem('trivia')).score;
        const mistake = JSON.parse(localStorage.getItem('trivia')).mistake;
        const attempt = JSON.parse(localStorage.getItem('trivia')).attempt;

        this.state = {
            score: score,
            mistake: mistake,
            attempt: attempt
        };
    }

    handleClick = () => {
        this.setState({
            score: 0,
            mistake: 0,
            attempt: 0
        })
        localStorage.setItem('trivia', JSON.stringify({score: 0, mistake: 0, attempt: 0}));
        localStorage.setItem('jService', JSON.stringify({cateId: []}));
    }

    render() {
        const trivia = JSON.parse(localStorage.getItem('trivia'));
        
        return (
            <Score 
                score={trivia.score} 
                attempt={trivia.attempt} 
                mistake={trivia.mistake} 
                resetFct={this.handleClick}
            />
        )
    }
}

export default ScoreContainer;