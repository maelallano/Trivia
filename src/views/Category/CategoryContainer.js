import React, { Component, createRef } from 'react';
import api from '../../helpers/api';
import Category from './Category';

class CategoryContainer extends Component {
  constructor(props) {
    super(props)

    if (!localStorage.getItem('trivia')) {
      localStorage.setItem('trivia', JSON.stringify({score: 0, mistake: 0}));
    }
    const score = JSON.parse(localStorage.getItem('trivia')).score;
    const mistake = JSON.parse(localStorage.getItem('trivia')).mistake;

    this.state = {
      category: null,
      currentQuestion: 0,
      score: score,
      mistake: mistake,
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

    if (answer === this.state.category.clues[this.state.currentQuestion].answer) {
      if (this.state.score + 1 === 10) {
        console.log(`T'es un winner`);
      }
      localStorage.setItem('trivia', JSON.stringify({score: this.state.score + 1, mistake: this.state.mistake}));
      this.setState({
        score: this.state.score + 1,
      });
    } else {
      if (this.state.mistake + 1 === 3) {
        localStorage.setItem('trivia', JSON.stringify({score: 0, mistake: 0}));
        this.setState({
          mistake: 0,
          score: 0
        });
      } else {
        localStorage.setItem('trivia', JSON.stringify({score: this.state.score, mistake: this.state.mistake + 1}));
        this.setState({
          mistake: this.state.mistake + 1,
        });
      }
    }
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
    });
    // check if answer is equal to the requested answer from the current question
  }

  render() {
    const { category, currentQuestion } = this.state;
    // at first render, category will be null so we need to wait
    // before using data.
    if (!category) return <div>is loading</div>

    return (
      <Category
        category={category}
        currentQuestionIndex={currentQuestion}
        handleSubmit={this.handleSubmit}
        // plug createRef to chidlren
        answerInput={this.answerInput}
      />
    );
  }
}

export default CategoryContainer;