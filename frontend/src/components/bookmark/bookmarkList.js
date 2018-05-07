import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { Div } from "../styledComponents";
import { Card } from "semantic-ui-react";
import axios from "axios";
import BookmarkShort from "./bookmarkShort.js";

const urlBookmarks = "http://127.0.0.1:3030/api/user/getBookmarks";
const amount = 6;

export default class BookmarkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.pollInterval = null;
    this.handleDeleteBookmark = this.handleDeleteBookmark.bind(this);
  }
  loadBookmarksFromServer = () => {
    axios.defaults.withCredentials = true;
    axios(urlBookmarks, {
      method: "get",
      withCredentials: true
    })
      .then(res => {
        console.log("Bookmark", res);
        this.setState({ data: res.data.bookmarks });
      })
      .catch(err => {
        console.log("Bookmark", err);
      });
  };

  handleDeleteBookmark = id => {
    const url = `http://127.0.0.1:3030/api/user/deleteBookmark`;

    axios
      .put(url, { articleId: id })
      .then(res => {
        let newBookmarks = this.state.data.filter(
          bookmark => bookmark._id !== id
        );
        this.setState({ data: newBookmarks });
        console.log("Bookmark deleted", res.data);
      })
      .catch(err => {
        console.log("Bookmark err delete", err);
      });
  };

  componentDidMount() {
    this.loadBookmarksFromServer();
  }

  render() {
    var section1;
    if (this.state.data !== undefined) {
      section1 = this.state.data.slice(0, amount).map(article => {
        return (
          <BookmarkShort
            thumbnail={article.thumbnail}
            handleBookmarkDelete={this.handleDeleteBookmark}
            headline={article.headline}
            key={article._id}
            id={article._id}
            author={article.author.username}
            likes={article.likes}
            views={article.views}
            abstract={article.abstract}
            date={article.date}
            topic={article.topic}
          />
        );
      });
    }

    return (
      <Div>
        <h1>Bookmarks</h1>
        <br />
        <br />
        <div>
          <Card.Group itemsPerRow={2}> {section1}</Card.Group>
        </div>
      </Div>
    );
  }
}
