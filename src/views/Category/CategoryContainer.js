import React, { Component, createRef } from 'react';
import api from '../../helpers/api';
import Category from './Category';
import Score from '../../components/Score/ScoreContainer';

class CategoryContainer extends Component {
  constructor(props) {
    super(props)

    if (!localStorage.getItem('jService')) {
      localStorage.setItem('jService', JSON.stringify({cateId: []}));
    }

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
    e.preventDefault();

    const answer = this.answerInput.current.value;

    let score = this.state.score;
    let mistake = this.state.mistake;
    let attempt = this.state.attempt + 1;

    // check if answer is equal to the requested answer from the current question
    if (answer === this.state.category.clues[this.state.currentQuestion].answer) {
      score++;
      if (score === 10) {
        alert(`T'es un winner`);
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

    // reset input value after submit
    this.answerInput.current.value = "";

    if (!this.state.category.clues[this.state.currentQuestion + 1]) {
      // set the current category to done
      const newCateId = JSON.parse(localStorage.getItem('jService'));
      newCateId.cateId.push(this.state.category.id);
      localStorage.setItem('jService', JSON.stringify({cateId: newCateId.cateId}))

      // redirect to homepage
      window.location.replace('/')
    }
  }

  render() {
    const { category, currentQuestion } = this.state;
    // at first render, category will be null so we need to wait
    // before using data.
    if (!category) return <div>is loading</div>

    console.log(category.clues[currentQuestion].answer)

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