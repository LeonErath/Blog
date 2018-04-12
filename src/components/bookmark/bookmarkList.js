import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { Div } from "../styledComponents";
import { Grid } from "semantic-ui-react";
import axios from "axios";
import BlogShort from "../blog/blogShort.js";

const urlBookmarks = "http://127.0.0.1:3030/api/user/getBookmarks";
const amount = 6;

export default class BookmarkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.pollInterval = null;
  }
  loadBookmarksFromServer = () => {
    axios.defaults.withCredentials = true;
    axios(urlBookmarks, {
      method: "get",
      withCredentials: true
    })
      .then(res => {
        this.setState({ data: res.data.bookmarks });
        console.log("Bookmark", res.data);
      })
      .catch(err => {
        console.log("Bookmark", err);
      });
  };

  componentDidMount() {
    this.loadBookmarksFromServer();
  }

  render() {
    var section1;
    if (this.state.data !== "No authentication") {
      section1 = this.state.data.slice(0, amount).map(article => {
        return (
          <Grid.Column>
            <BlogShort
              headline={article.headline}
              key={article._id}
              id={article._id}
              abstract={article.abstract}
              date={article.date}
            />
          </Grid.Column>
        );
      });
    }

    return (
      <Div>
        <h1>Bookmarks</h1>
        <br />
        <br />
        <div>
          <Grid columns={1}>
            <Grid.Row>{section1}</Grid.Row>
          </Grid>
        </div>
        <br /> <br />
        <hr />
      </Div>
    );
  }
}
