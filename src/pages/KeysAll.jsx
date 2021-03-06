import React, { Component } from "react";
import Layout from "../layout/Layout";
import { connect } from "react-redux";
import { Header } from "semantic-ui-react";
import KeyboardDynamicInstructions from "../components/keyboard/KeyboardDynamicInstructions";
import { StarterIcon } from "../components/uiElements";
import { completeChapterQuiz } from "../actions/userScoreActions";

import { keyboardShapes } from "../components/keyboard/keyboardShapes";
class KeysAll extends Component {
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
  quizId = "All Shapes";
  render() {
    return (
      <Layout
        myUrl={this.props.match.path}
        nextButtonDisabled={!this.state.quizCompleted}
        quizId={this.quizId}
      >
        <Header as="h2">
          <Header.Content>All Shapes</Header.Content>
        </Header>
        <p>
          Now for the <em>real</em> test. Every key has its own shape, and in
          this test we'll play all of them.
        </p>
        <p>Don't worry, you'll still get a hint of which shape to play.</p>

        <KeyboardDynamicInstructions
          keyboardId="AllShapes"
          keyboardScale={0.5}
          showAllCircles={false}
          messageInstructions={{
            icon: "question circle",
            header: "Wagon Shapes",
            content: (
              <p>
                Make WAGON shapes on the keyboard, starting at the{" "}
                <StarterIcon />
              </p>
            )
          }}
          whenToShowShape={"afterCorrect"}
          answers={wagonAnswers}
          continueText="Well done!  That's all the shapes."
          callbackWhenFinished={this.handleCompletedQuiz}
        />
      </Layout>
    );
  }
}

const wagonAnswers = [
  {
    bottomKey: "F1",
    topKey: "A2",
    correctAnswer: keyboardShapes.G,
    shapeWord: "LINE"
  },
  {
    bottomKey: "C1",
    topKey: "E2",
    correctAnswer: keyboardShapes.E,
    shapeWord: "CAR"
  },
  {
    bottomKey: "C1",
    topKey: "E2",
    correctAnswer: keyboardShapes.Db,
    shapeWord: "TRUCK"
  },
  {
    bottomKey: "F1",
    topKey: "A2",
    correctAnswer: keyboardShapes.Bb,
    shapeWord: "CAR"
  },
  {
    bottomKey: "C1",
    topKey: "E2",
    correctAnswer: keyboardShapes.F,
    shapeWord: "WAGON"
  },
  {
    bottomKey: "C1",
    topKey: "E2",
    correctAnswer: keyboardShapes.D,
    shapeWord: "TRUCK"
  },
  {
    bottomKey: "F1",
    topKey: "A2",
    correctAnswer: keyboardShapes.Ab,
    shapeWord: "TRUCK"
  },
  {
    bottomKey: "C1",
    topKey: "E2",
    correctAnswer: keyboardShapes.C,
    shapeWord: "LINE"
  },
  {
    bottomKey: "F1",
    topKey: "A2",
    correctAnswer: keyboardShapes.B,
    shapeWord: "CAR"
  },
  {
    bottomKey: "C1",
    topKey: "E2",
    correctAnswer: keyboardShapes.Gb,
    shapeWord: "WAGON"
  },
  {
    bottomKey: "F1",
    topKey: "A2",
    correctAnswer: keyboardShapes.A,
    shapeWord: "TRUCK"
  },
  {
    bottomKey: "C1",
    topKey: "E2",
    correctAnswer: keyboardShapes.Eb,
    shapeWord: "CAR"
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
)(KeysAll);
