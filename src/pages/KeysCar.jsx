import React, { Component } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";

import { Header, Card, Image } from "semantic-ui-react";
import { CarSkips, CarSkips2 } from "../images/";
import KeyboardInline from "../components/keyboard/KeyboardInline";
import { StarterIcon } from "../components/uiElements";
import { NN } from "../keySVGs/keyboardUtils";
import { completeChapterQuiz } from "../actions/userScoreActions";

import { keyboardShapes } from "../components/keyboard/keyboardShapes";
class KeysCar extends Component {
  state = {
    quizCompleted: false
  };
  handleCompletedQuiz = () => {
    const { displayName, city } = this.props.profile;
    const { completeChapterQuiz } = this.props;
    completeChapterQuiz({
      quizId: this.quizId,
      displayName,
      city
    });
    this.setState({ quizCompleted: true });
  };
  quizId = "Cars";
  render() {
    return (
      <Layout
        myUrl={this.props.match.path}
        nextButtonDisabled={!this.state.quizCompleted}
        quizId={this.quizId}
      >
        <Header as="h2">
          <Header.Content>The Cars</Header.Content>
        </Header>
        <p>
          Now we'll start putting <strong>CARS</strong> (and Flipped-CARS) on
          the keyboard. But first . . .
        </p>
        <h3>A note about spacing</h3>
        <p>
          Usually it will be obvious which keys make the shape, but in a couple
          situations you have two white keys in a row, and you'll have to know
          which white key to use.
        </p>
        <p>
          If you get stuck, just remember that <NN num={1} />, <NN num={2} /> &{" "}
          <NN num={3} /> are spread apart, while <NN num={3} /> & <NN num={4} />{" "}
          are squished together.
        </p>
        <p>That is, you 'skip' a key between 1 - 2, and 2 - 3.</p>
        <p>
          <NN num={1} /> (skip) <NN num={2} /> (skip) <NN num={3} />{" "}
          <NN num={4} />.
        </p>
        <Card.Group centered>
          <Card>
            <Image size="medium" src={CarSkips} />
            <Card.Description>
              <p>SKIP between 1 & 2</p>
            </Card.Description>
          </Card>
          <Card>
            <Image size="medium" src={CarSkips2} />
            <Card.Description>
              <p>NO skip between 3 & 4</p>
            </Card.Description>
          </Card>
        </Card.Group>
        <br />
        <p>
          Don't worry if that doesn't make total sense yet. You'll get it after
          you do it a couple times.
        </p>

        <KeyboardInline
          keyboardId={this.quizId}
          keyboardScale={0.5}
          showAllCircles={false}
          messageInstructions={{
            icon: "question circle",
            header: "Car Shapes",
            content: (
              <p>
                Make CAR shapes on the keyboard, starting at the <StarterIcon />
              </p>
            )
          }}
          whenToShowShape={"afterCorrect"}
          answers={carAnswers}
          continueText="Well done!  Next we'll check out the TRUCKS."
          callbackWhenFinished={this.handleCompletedQuiz}
        />
      </Layout>
    );
  }
}

const carAnswers = [
  {
    bottomKey: "C1",
    topKey: "C2",
    correctAnswer: keyboardShapes.E
  },
  {
    bottomKey: "G1",
    topKey: "G2",
    correctAnswer: keyboardShapes.B
  },
  {
    bottomKey: "C1",
    topKey: "C2",
    correctAnswer: keyboardShapes.Eb
  },
  {
    bottomKey: "G1",
    topKey: "G2",
    correctAnswer: keyboardShapes.Bb
  }
];
const mapStateToProps = state => ({
  profile: state.firebase.profile
});
const actions = {
  completeChapterQuiz
};
export default connect(
  mapStateToProps,
  actions
)(KeysCar);
