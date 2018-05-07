import _ from "lodash";
import axios from "axios";
import React from "react";
import { Search, Grid } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

var source;

const url = "http://127.0.0.1:3030/api/article";

const resultRenderer = ({ headline, _id }) => (
  <Link to={`blog/${_id}`}>{headline}</Link>
);

resultRenderer.propTypes = {
  headline: PropTypes.string,
  _id: PropTypes.string
};

export default class SearchStandard extends React.Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) => {
    this.setState({ value: "" });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.headline);

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch)
      });
    }, 300);
  };

  loadCommentsFromServer = () => {
    axios.get(url).then(res => {
      console.log("serach", res.data);

      source = res.data;
    });
  };

  componentDidMount() {
    this.loadCommentsFromServer();
  }

  render() {
    const { isLoading, value, results } = this.state;

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            resultRenderer={resultRenderer}
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true
            })}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
