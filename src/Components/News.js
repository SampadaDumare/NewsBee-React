import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    pageSize: 10,
    category: "general"

  }

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(props) {
    super(props);
    console.log("I am constructor from news.js");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      hasMore: true
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsBee`
  }

  async updateNews(page) {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=7806689a31e741c9a5f26549ac7bbf8b&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews(1);
  }

  fetchMoreData = async () => {
    let nextPage = this.state.page + 1;
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=7806689a31e741c9a5f26549ac7bbf8b&page=${nextPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    if (parsedData.articles.length === 0) {
      this.setState({ hasMore: false });
      return;
    }
    this.setState({
      page: nextPage,
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ height: "70px" }}>NewsBee - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* {this.state.loading && <Loading/>} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<Loading />}
          endMessage={
            <p className="text-center my-3">
              You have seen all the news 
            </p>
          }
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
}

export default News
