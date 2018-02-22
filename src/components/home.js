import React from "react";
import ReactDOM from "react-dom";
import "./home.css";
import Comments from "./comment.js";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Icon, Divider, Label, Segment } from "semantic-ui-react";
import axios from "axios";

export default class Home extends React.Component {
  render() {
    return (
      <div id="container">
        <div className="article">
          <Segment>
            <h2>Vaultier holt Gold im Snowboard-Cross, Nörl chancenlos</h2>
            Der Gold-Gewinner von Sotschi 2014 ließ am Donnerstag (15.02.18) im
            Finale von Pyeongchang den Australier Jarryd Hughes und den Spanier
            Regino Hernandez hinter sich. Weltmeister Vaultier war als Favorit
            in den Wettbewerb gegangen und fuhr im Endlauf einen sicheren Sieg
            ein.
            <h2>Finale ohne deutsche Beteiligung</h2>
            Die drei deutschen Starter Martin Nörl, Paul Berg und Konstantin
            Schad hatten das Finale verpasst. Der 24-jährige Nörl hatte das
            "Große Finale" um die Medaillen nur knapp verpasst. Der Adelkofener
            gewann zunächst sowohl sein Achtel- als auch Viertelfinale, ehe er
            im Halbfinale stürzte und nur noch den vierten Rang rettete. Für den
            Einzug in den Goldlauf der besten sechs Snowboarder hätte der
            Olympia-Debütant allerdings mindestens Rang drei benötigt.
            <h2>Nörl schafft A-Kader-Förderung</h2>
            Im kleinen Finale belegte Nörl Rang zwei und wurde damit insgesamt
            Achter. Damit steigt der Bayer in den A-Kader auf, in dem die
            Snowboarder gefördert werden. Der als Medaillenanwärter gehandelte
            Berg aus Konstanz schied nach einem Crash im Viertelfinale aus. Für
            Schad war bereits in der ersten K.o.-Runde Endstation.
            <p />
            <div className="labels">
              <Label as="a" color="blue" attached="bottom right" image>
                Leon Erath
                <Label.Detail>Author</Label.Detail>
              </Label>
            </div>
            <p />
          </Segment>

          <Divider horizontal>Comments</Divider>

          <Comments />
        </div>
      </div>
    );
  }
}
