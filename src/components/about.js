import React from "react";
import styled from "styled-components";

const RoundImage = styled.img`
  border-radius: 50%;
  width: 170px;
`;

const DivItem1 = styled.div`
  width: 200px;
  padding: 20px;
`;

const DivItem2 = styled.div`
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  padding: 20px;
  font-size: 16px;
  text-align: justify;
`;

const Grid = styled.div`
  margin-top: 200px;
  width: 800px;
  display: grid;
  grid-template-columns: auto auto auto;
`;

export default class About extends React.Component {
  render() {
    return (
      <div>
        <center>
          <Grid>
            <DivItem1>
              <RoundImage src="./images/leon_sqaure.png" alt="me" />
            </DivItem1>
            <DivItem2>
              Hi, my name is Leon Erath. I am 18 years old, living in Mannheim
              Germany. I'm young Guy, who wants to share my ideas and concepts.
              I love developing Apps and want to take you with me, on my way to
              become a Developer. I know it is hard to learn something new and
              get successful with it, but I will try it. Hope you are having a
              great day and share my enthusiasm for creating something new. If
              so please join my Blog.
            </DivItem2>
          </Grid>
        </center>
      </div>
    );
  }
}
