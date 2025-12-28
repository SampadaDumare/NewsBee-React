import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const updateNews = async (page) => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=7806689a31e741c9a5f26549ac7bbf8b&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsBee`
    setPage(1);
    setHasMore(true);
    updateNews(1);
  }, [props.category]);
  // async componentDidMount() {
  //  updateNews(1);
  // }

  const fetchMoreData = async () => {
    let nextPage = page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=7806689a31e741c9a5f26549ac7bbf8b&page=${nextPage}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    if (parsedData.articles.length === 0) {
      setHasMore(false);
      return;
    }
    setPage(nextPage);
    setArticles(prevArticles => prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };


  return (
    <>
      <h1 className="text-center" style={{ height: "70px", marginTop: "80px" }}>NewsBee - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {/* {state.loading && <Loading/>} */}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <p className="text-center my-3">
            You have seen all the news
          </p>
        }
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <Newsitem title={element.title?.slice(0, 65) || "No title available"} description={element.description?.slice(0, 88) || "No description available"} author={element.author ? element.author : "Unknown"} date={element.publishedAt} imageUrl={element.urlToImage} newsUrl={element.url} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )

}

export default News

News.defaultProps = {
  pageSize: 10,
  category: "general"

}

News.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string
}