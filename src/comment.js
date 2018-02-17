import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Segment,
  SegmentGroup,
  Input,
  Transition,
  TransitionGroup
} from "semantic-ui-react";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <CommentList items={this.state.items} />
        <center>
          <form onSubmit={this.handleSubmit}>
            <Input
              onChange={this.handleChange}
              value={this.state.text}
              actionPosition="left"
              action={{
                color: "teal",
                labelPosition: "left",
                icon: "comment",
                content: "Submit"
              }}
              placeholder="Enter..."
            />
          </form>
        </center>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }
}

class CommentList extends React.Component {
  render() {
    return (
      <Transition.Group
        as={SegmentGroup}
        duration={200}
        divided
        size="small"
        verticalAlign="middle"
      >
        {this.props.items.map(item => (
          <Segment key={item.id}>{item.text}</Segment>
        ))}
      </Transition.Group>
    );
  }
}
