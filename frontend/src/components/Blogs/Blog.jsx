import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import { useEffect, useState } from 'react';
import { useDispatch ,useSelector } from 'react-redux'; 
import { UTurnLeft } from '@mui/icons-material';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];




const posts = [
  post1,
  post2,
  post3
];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon ,url:'https://github.com/younes-Raymond/earthQuaqApp/'},
    { name: 'facebook/younes raymond', icon: XIcon , url:''},
    { name: 'Facebook', icon: FacebookIcon , url:''},
  ],
};

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  const [mainFeaturedPost, setMainFeaturedPost] = useState({});
  const [featuredPosts, setFeaturedPosts ] = React.useState([])
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true); 

  const articles = useSelector((state) => state.articles.articles);
  // console.log('articles', articles)
// 
  useEffect(() => {

    if (articles.length > 0) {
      const firstArticle = articles[0];
  
      setMainFeaturedPost({
        title: firstArticle.headline?.main || 'Default Title',
        description: firstArticle.snippet || 'Default Description',
        image: firstArticle.multimedia?.[0]?.url.k || 'https://source.unsplash.com/random?wallpapers',
        imageText: 'Image Description',
        linkText: 'Continue reading...',
      });
  
      const updatedFeaturedPostss = articles.map((article) => {
        const rawDate = article.pub_date || new Date();
        const formattedDate = new Date(rawDate).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short',
        });
  
        return {
          title: article.headline?.main || 'Default Title',
          date: formattedDate,
          description: article.snippet || 'Default Description',
          image: article.multimedia?.[0]?.url.k || 'https://source.unsplash.com/random?wallpapers',
          imageLabel: 'Image Text',
        };
      });
  
      setFeaturedPosts(updatedFeaturedPostss);
    } 
  }, [articles]); 




  

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg" style={{ height: '100vh', overflowY: 'auto' }}>
        <Header title="Blog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={posts}  />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}