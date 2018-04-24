import React from "react";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { PieChart, Pie, Legend, Tooltip, Cell, Label } from "recharts";
import styled from "styled-components";

const DivCenter = styled.div`
  float: center;
  text-align: center;
  display: table;
  margin: 0 auto;
`;

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data });
    }
  }

  render() {
    const data01 = this.state.data
      .map(article => {
        return {
          name: article.headline,
          value: article.views
        };
      })
      .filter(article => article.value > 0);
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const data02 = this.state.data
      .map(article => {
        return {
          name: article.headline,
          value: article.likes
        };
      })
      .filter(article => article.value > 0);
    return (
      <div>
        <DivCenter>
          {this.state.data.length != 0 &&
            data01.length != 0 &&
            data02.length != 0 && (
              <PieChart width={520} height={340}>
                <Pie
                  data={data01}
                  cx={120}
                  cy={140}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  label
                >
                  <Label value="Views" position="center" />
                  {data01.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Pie
                  data={data02}
                  cx={420}
                  cy={140}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  label
                >
                  <Label value="Likes" position="center" />
                  {data02.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
        </DivCenter>
      </div>
    );
  }
}
