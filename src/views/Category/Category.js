import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './Category.css';
import Input from '@material-ui/core/Input';
import { Link } from 'react-router-dom';

const Category = ({ category, currentQuestionIndex, handleSubmit, answerInput }) => {
  const currentQuestion = category.clues[currentQuestionIndex];
  return (
    <section>
      <Button className='btnHomeCate' size={'medium'} variant={'contained'}>
        <Link to='/'>Home</Link>
      </Button>
      <form onSubmit={handleSubmit}>
        <h1>You choosed: {category.title}</h1>
        <div className="question">
          <h3 className="question__title">
            {currentQuestion.question}
          </h3>
          <div className="question__answerInput">
            {/* We give the ref below in order check the value */}
            <Input className='inputCate' ref={answerInput} />
          </div>
          <Button size={'small'} variant={'contained'} className="question__submit btnCate" type="submit">
            Next
          </Button>
        </div>
      </form>
    </section>
  );
}

Category.propTypes = {
  category: PropTypes.shape({}).isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  answerInput: PropTypes.shape({
    value: PropTypes.instanceOf(HTMLInputElement)
  }),
};

export default Category;