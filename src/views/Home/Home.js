import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Score from '../../components/Score/ScoreContainer';

const Home = ({ categories }) => {
  if (!localStorage.getItem('jService')) {
    localStorage.setItem('jService', JSON.stringify({cateId: []}));
  }

  // get the id of every categories which are already done
  const cateId = JSON.parse(localStorage.getItem('jService')).cateId;

  // categories which are already done will not be displayed
  const newCategories = categories.filter(category => {
    let isCheck = true;
    cateId.map(id => isCheck = category.id === id ? false : isCheck)
    return isCheck;
  })
  
  return (
    <section>
      <Score />
      <h1>Homepage</h1>
      {newCategories.length > 0 && (
        <section>
          {newCategories.map(category => (
              <Link to={`/categories/${category.id}`} key={category.id}>
                {category.title}
              </Link>
            )
          )}
        </section>
      )}
    </section>
  )};

Home.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      clues_count: PropTypes.number
    }),
  ),
}

export default Home;