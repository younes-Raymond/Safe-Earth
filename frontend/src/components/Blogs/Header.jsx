import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
// import { articlesSlice } from '../../reducers/articlesSlice';
import { useDispatch } from 'react-redux';
import {fetchArticlesByTopic } from '../../actions/articlesActions'
import updateArticles from '../../actions/articlesActions'

function Header(props) {
  const { sections, title } = props;
  const dispatch = useDispatch();
  

//  // Action creators
//  const updateArticles = (articles) => {
//   return {
//     type: 'UPDATE_ARTICLES',
//     payload: articles,
//   };
// };
  
  React.useEffect(() => {
    const lastTopic = sessionStorage.getItem('lastTopic');
  
    const fetchData = async () => {
      try {
        const response = await fetchArticlesByTopic(lastTopic);
        // Assuming that result.data.response.docs is the array of articles
        dispatch(updateArticles(response.data.response.docs));
      } catch (error) {
        // Handle errors
        console.error('Error fetching articles:', error);
      }
    };
  
    fetchData();
  }, [dispatch]);
  
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Link to='/SignUp'>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
        </Link>

      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
  {sections.map((section) => (
  <Button
    key={section.title}
    color="inherit"
    variant="text"
    sx={{ p: 1, flexShrink: 0 }}
    onClick={async () => {
      const result = await dispatch(fetchArticlesByTopic(section.title));
      // console.log(result);
    }}
  >
    {section.title}
  </Button>
))}



      </Toolbar>
    </React.Fragment>
  );
}


Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};


export default Header;