import React from "react";
import styled from "styled-components";
import CommentBox from "./comment/commentBox.js";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { Divider, Label, Segment } from "semantic-ui-react";

const Title = styled.h2`
  text-align: center;
  color: black;
`;

const Article = styled.div`
  margin: 0 auto;
  width: 800px;
  padding: 10px;
  line-height: 1.5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-align: justify;
  color: gray;
`;

const Labels = styled.div`
  text-align: right;
`;

export default class Home extends React.Component {
  render() {
    return (
      <div id="container">
        <Article>
          <Segment>
            <Title>
              Vaultier holt Gold im Snowboard-Cross, Nörl chancenlos
            </Title>
            Der Gold-Gewinner von Sotschi 2014 ließ am Donnerstag (15.02.18) im
            Finale von Pyeongchang den Australier Jarryd Hughes und den Spanier
            Regino Hernandez hinter sich. Weltmeister Vaultier war als Favorit
            in den Wettbewerb gegangen und fuhr im Endlauf einen sicheren Sieg
            ein.
            <Title>Finale ohne deutsche Beteiligung</Title>
            Die drei deutschen Starter Martin Nörl, Paul Berg und Konstantin
            Schad hatten das Finale verpasst. Der 24-jährige Nörl hatte das
            "Große Finale" um die Medaillen nur knapp verpasst. Der Adelkofener
            gewann zunächst sowohl sein Achtel- als auch Viertelfinale, ehe er
            im Halbfinale stürzte und nur noch den vierten Rang rettete. Für den
            Einzug in den Goldlauf der besten sechs Snowboarder hätte der
            Olympia-Debütant allerdings mindestens Rang drei benötigt.
            <Title>Nörl schafft A-Kader-Förderung</Title>
            Im kleinen Finale belegte Nörl Rang zwei und wurde damit insgesamt
            Achter. Damit steigt der Bayer in den A-Kader auf, in dem die
            Snowboarder gefördert werden. Der als Medaillenanwärter gehandelte
            Berg aus Konstanz schied nach einem Crash im Viertelfinale aus. Für
            Schad war bereits in der ersten K.o.-Runde Endstation.
            <p />
            <Labels>
              <Label as="a" color="blue" attached="bottom right" image>
                Leon Erath
                <Label.Detail>Author</Label.Detail>
              </Label>
            </Labels>
            <p />
          </Segment>

          <Divider horizontal>Comments</Divider>

          <CommentBox />
        </Article>
      </div>
    );
  }
}
