import React, { Component, createRef } from 'react';
import api from '../../helpers/api';
import Category from './Category';
import Score from '../../components/Score/ScoreContainer';

class CategoryContainer extends Component {
  constructor(props) {
    super(props)

    if (!localStorage.getItem('trivia')) {
      localStorage.setItem('trivia', JSON.stringify({score: 0, mistake: 0, attempt: 0}));
    }
    const score = JSON.parse(localStorage.getItem('trivia')).score;
    const mistake = JSON.parse(localStorage.getItem('trivia')).mistake;
    const attempt = JSON.parse(localStorage.getItem('trivia')).attempt;

    this.state = {
      category: null,
      currentQuestion: 0,
      score: score,
      mistake: mistake,
      attempt: attempt
    }
  }

  // createRef in order to bring back input value to its parent
  answerInput = createRef();

  // async needed when using promise
  async componentDidMount() {
    const data = await api.getCategoryById(this.props.match.params.id);
    // stored response in the state;
    this.setState({
      category: data,
    });
  }

  handleSubmit = (e) => {
    // here I prevent the default bh of submitting form
    e.preventDefault();
    // write logic to handle good/bad answer
    // increment currentQuestion
    // save in the storage the id of the question
    // if no more question, remove category from categories playable
    // increment score somewhere and redirect to /

    const answer = this.answerInput.current.value;

    let score = this.state.score;
    let mistake = this.state.mistake;
    let attempt = this.state.attempt + 1;

    // check if answer is equal to the requested answer from the current question
    if (answer === this.state.category.clues[this.state.currentQuestion].answer) {
      score++;
      if (score === 10) {
        console.log(`T'es un winner`);
      }
    } else {
      mistake++;
      if (mistake === 3) {
        score = 0;
        mistake = 0;
        attempt = 0;
      }
    }
    localStorage.setItem('trivia', JSON.stringify({score: score, mistake: mistake, attempt: attempt}));
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      score: score,
      mistake: mistake,
      attempt: attempt
    });
  }

  render() {
    const { category, currentQuestion } = this.state;
    // at first render, category will be null so we need to wait
    // before using data.
    if (!category) return <div>is loading</div>

    return (
      <div>
        <Category
          category={category}
          currentQuestionIndex={currentQuestion}
          handleSubmit={this.handleSubmit}
          // plug createRef to chidlren
          answerInput={this.answerInput}
        />
        <Score />
      </div>
    );
  }
}

export default CategoryContainer;