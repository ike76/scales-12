import React, { Component } from "react";
import { connect } from "react-redux";
import posed, { PoseGroup } from "react-pose";
import Dimensions from "react-dimensions";
import { Button, Message, Icon, Step, Image } from "semantic-ui-react";
import styled from "styled-components";
import Synth from "./sounds/audiosynth";
import Key from "./Key.jsx";
import { ding, plink, keyClick } from "./sounds/soundFX";
import { keyObject, keyList, noteConverter } from "../../keySVGs/keyboardUtils";
import {
  delayBetweenQuestions,
  showCheaterButton
} from "../../utils/generalConfig";
import { completeKeyboardChallenge } from "../../actions/userScoreActions";
import FinishedOverlay from "./FinishedOverlay.jsx";
import CheckBoxes from "./CheckBoxes.jsx";
import { carPic, truckPic, linePic, wagonPic } from "../../images/index";
import FaceUnderlay from "./FaceUnderlay.jsx";
import CheaterButton from "../uiElements/CheaterButton";
const piano = Synth.createInstrument("piano");

const KeyboardDiv = styled.div`
  display: inline-flex;
  // margin: 1rem auto;
  // border: 2px blue dotted;
  padding: 10px;
  width: ${({ keysWide, keyboardScale }) =>
    keysWide * 79 * keyboardScale + 30}px;
  z-index: 10;
  position: relative;
`;

const staggerDuration = 50;
const keyConfig = {
  before: {
    y: "-5vh",
    opacity: 0,
    transition: { type: "spring", stiffness: 200 }
  },
  enter: {
    y: "0vh",
    opacity: 1,
    transition: { type: "spring", stiffness: 200, mass: 1.5 },
    delay: ({ i }) => i * staggerDuration
  },
  exit: {
    y: "5vh",
    opacity: 0,
    transition: { type: "spring", stiffness: 200 }
  }
};
const AnimatedKey = posed.div(keyConfig);
const WhiteKeyDiv = styled(AnimatedKey)`
  position: relative;
  margin: ${p => p.keyboardScale * 1 || 1}px;
`;

const playNote = noteName => {
  let octave = Number(noteName.split("").pop());
  let note = noteConverter[noteName.slice(0, -1)];
  piano.play(note, octave + 2, 2);
};

class Keyboard extends Component {
  state = {
    questionIndex: 0,
    keyGroups: [],
    userGuess: [],
    correctCircles: [],
    correctBottomCircles: [],
    correctTopCircles: [],
    wrongCircles: [],
    correctAnswer: [],
    showCircles: true,
    correct: false,
    finished: false,
    keysIn: false,
    root1: "",
    showShapeBackground: false,
    scaleShapes: {},
    showBottomShape: false,
    showTopShape: false,
    keyToSkip: ""
  };

  componentDidMount() {
    const { answers } = this.props;
    this.setState({
      keyGroups: keyList(answers[0].bottomKey, answers[0].topKey),
      starters: answers[0].starters,
      correctAnswer: answers[0].correctAnswer,
      root1: answers[0].correctAnswer[0],
      scaleShapes: answers[0].scaleShapes,
      keyToSkip: answers[0].keyToSkip
    });
    setTimeout(() => this.setState({ keysIn: true }), 0);
  }
  increment = () => {
    this.setState({ questionNumber: this.state.questionNumber + 1 });
  };
  clickHandler = noteName => () => {
    this.state.userGuess.includes(noteName)
      ? this.removeNoteFromGuess(noteName)
      : this.addNoteToGuess(noteName);
  };
  addNoteToGuess = noteName => {
    playNote(noteName);
    this.setState(
      { userGuess: [...this.state.userGuess, noteName] },
      this.checkGuess
    );
  };
  removeNoteFromGuess = noteName => {
    keyClick();
    this.setState(
      {
        userGuess: this.state.userGuess.filter(note => note !== noteName)
      },
      this.checkGuess
    );
  };
  checkGuess() {
    const { userGuess } = this.state;
    const { correctAnswer } = this.state;
    const correctCircles = userGuess.filter(guess =>
      correctAnswer.includes(guess)
    );
    const correctBottomCircles = userGuess.filter(guess =>
      correctAnswer.slice(0, 4).includes(guess)
    );
    const correctTopCircles = userGuess.filter(guess =>
      correctAnswer.slice(4).includes(guess)
    );

    const wrongCircles = userGuess.filter(
      guess => !correctAnswer.includes(guess)
    );
    this.setState({
      correctCircles,
      wrongCircles,
      correctBottomCircles,
      correctTopCircles
    });
    if (correctBottomCircles.length >= 4) {
      if (!this.state.showBottomShape) {
        ding();
        this.setState({ showBottomShape: true });
      }
    } else {
      this.setState({ showBottomShape: false });
    }
    if (correctTopCircles.length >= 4) {
      this.setState({ showTopShape: true });
    } else {
      this.setState({ showTopShape: false });
    }
    if (correctAnswer.length === userGuess.length) {
      if (
        // if there are no un-clicked correct notes (so answer is correct)
        correctAnswer.filter(note => !userGuess.includes(note)).length === 0
      ) {
        this.handleCorrectAnswer();
      } else {
        this.handleWrongAnswer();
      }
    } else {
      return;
    }
  }
  handleCorrectAnswer = () => {
    ding();
    const nextIndex = this.state.questionIndex + 1;
    this.setState({ questionIndex: nextIndex });
    const { whenToShowShape } = this.props;

    this.setState({
      showCircles: false,
      showShapeBackground: whenToShowShape === "afterCorrect"
    });
    setTimeout(this.goToNextQuestion, 1000);
  };
  handleWrongAnswer = () => {
    plink();
    this.setState({ correct: false, showCircles: false, finished: true });
    setTimeout(this.resetKeyboard, delayBetweenQuestions);
  };
  goToNextQuestion = () => {
    const { answers } = this.props;
    const { questionIndex } = this.state;
    if (questionIndex >= answers.length) {
      this.finishThisTest();
    } else {
      this.setState(
        {
          correctAnswer: answers[questionIndex].correctAnswer,
          starters: answers[questionIndex].starters,
          root1: answers[questionIndex].correctAnswer[0],
          showShapeBackground: false,
          scaleShapes: answers[questionIndex].scaleShapes,
          keyToSkip: answers[questionIndex].keyToSkip
        },
        this.resetKeyboard
      );
    }
  };
  finishThisTest = () => {
    const { keyboardId, callbackWhenFinished } = this.props;
    if (callbackWhenFinished) callbackWhenFinished();
    this.props.dispatch(completeKeyboardChallenge(keyboardId));
  };
  resetKeyboard = () => {
    const index = this.state.questionIndex;
    const { answers } = this.props;
    this.setState({
      userGuess: [],
      showCircles: true,
      correctCircles: [],
      wrongCircles: [],
      keyGroups: keyList(answers[index].bottomKey, answers[index].topKey),
      finished: false,
      showBottomShape: false,
      showTopShape: false
    });
  };
  getCircleShape = noteName => {
    const {
      userGuess,
      finished,
      correctCircles,
      wrongCircles,
      starters,
      correctAnswer,
      showBottomShape
    } = this.state;
    const { showAllCircles } = this.props;
    if (finished && correctCircles.includes(noteName)) return "correct";
    if (finished && wrongCircles.includes(noteName)) return "wrong";
    if (userGuess.includes(noteName)) return "selected";
    if (showBottomShape && correctAnswer[4] === noteName) return "starter";
    if (correctAnswer[0] === noteName) return "starter";
    if (starters && starters.includes(noteName)) return "starter";
    if (showAllCircles && correctAnswer.includes(noteName)) return "outline";
    return null;
  };
  doOver = () => {
    this.setState({
      userGuess: [],
      finished: false,
      correct: false
    });
  };
  render() {
    const {
      bottomKey,
      keysToLabel,
      keyboardId,
      messageInstructions,
      continueLink,
      continueText,
      answers,
      root1
    } = this.props;
    let { keyboardScale } = this.props;
    const {
      showCircles,
      questionIndex,
      showShapeBackground,
      scaleShapes,
      showBottomShape,
      showTopShape,
      keyToSkip,
      correctTopCircles,
      userGuess
    } = this.state;
    const thisTest = this.props.keyboardChallenges[keyboardId];
    const doneWithThisTest =
      thisTest && this.props.keyboardChallenges[keyboardId].completed;
    const bottomIsWrong = userGuess.length >= 4 && !showBottomShape;
    const topIsWrong =
      showBottomShape && userGuess.length > correctTopCircles.length + 4;
    return (
      <div style={{ position: "relative", textAlign: "center" }}>
        <Message {...messageInstructions} />
        <CheckBoxes
          totalAnswersCount={answers.length}
          currentIndex={questionIndex}
        />
        <div>
          <Step.Group size="mini" unstackable>
            <Step active={!showBottomShape}>
              {showBottomShape
                ? shapeImages[scaleShapes.bottom]
                : bottomIsWrong
                  ? shapeImages.wrongness
                  : shapeImages.unknown}
              <Step.Content>
                <Step.Title>1st Shape</Step.Title>
                <Step.Description>
                  {showBottomShape ? scaleShapes.bottom : "?"}
                </Step.Description>
              </Step.Content>
            </Step>

            <Step active={showBottomShape && !correctTopCircles.length}>
              <Step.Content>
                <Step.Title>
                  <Orange>Skip a Key</Orange>
                </Step.Title>
              </Step.Content>
            </Step>
            <Step active={showBottomShape && correctTopCircles.length}>
              {showTopShape
                ? shapeImages[scaleShapes.top]
                : topIsWrong
                  ? shapeImages.wrongness
                  : shapeImages.unknown}
              <Step.Content>
                <Step.Title>2nd Shape</Step.Title>
                <Step.Description>
                  {showTopShape ? scaleShapes.top : "?"}
                </Step.Description>
              </Step.Content>
            </Step>
          </Step.Group>
        </div>
        <KeyboardDiv>
          <FaceUnderlay show={topIsWrong || bottomIsWrong} />
          <PoseGroup preEnterPose="before">
            {this.state.keyGroups.map((key, i) => {
              const sharedProps = {
                keyboardId,
                showCircles
              };
              return (
                <WhiteKeyDiv
                  keyboardScale={keyboardScale}
                  key={`${key[0]} whiteKeyDiv`}
                  i={i}
                >
                  <Key
                    {...sharedProps}
                    key={`${key[0]} whiteKey`}
                    noteShape={keyObject[key[0]].shape}
                    noteName={key[0]}
                    circleType={this.getCircleShape(key[0])}
                    clickHandler={this.clickHandler(key[0])}
                    showLabel={keysToLabel && keysToLabel.includes(key[0])}
                    showShapeBackground={
                      showShapeBackground && key[0] === root1
                    }
                    keyboardScale={keyboardScale}
                    fadeMe={showBottomShape && keyToSkip === key[0]}
                  />
                  {key.length > 1 && (
                    <Key
                      {...sharedProps}
                      noteShape="flat"
                      key={`${key[0]} blackKey`}
                      noteName={key[1]}
                      hide={key[0] === bottomKey}
                      circleType={this.getCircleShape(key[1])}
                      clickHandler={this.clickHandler(key[1])}
                      showLabel={keysToLabel && keysToLabel.includes(key[1])}
                      showShapeBackground={
                        showShapeBackground && key[1] === root1
                      }
                      keyboardScale={keyboardScale}
                      fadeMe={showBottomShape && keyToSkip === key[1]}
                    />
                  )}
                </WhiteKeyDiv>
              );
            })}
          </PoseGroup>
          {doneWithThisTest && (
            <FinishedOverlay
              correct
              continueLink={continueLink}
              continueText={continueText}
            />
          )}
          {showCheaterButton && (
            <Button
              style={{ position: "absolute", top: 0, right: 0, zIndex: 100 }}
              onClick={this.handleCorrectAnswer}
            >
              cheat
            </Button>
          )}
        </KeyboardDiv>
        <CheaterButton onClick={this.finishThisTest} />
        {/* </StyledKeyboard> */}
      </div>
    );
  }
}
const Orange = styled.span`
  font-weight: bold;
  color: #f5a623;
  padding: 3px;
`;

const mapStateToProps = state => ({
  keyboardChallenges: state.userScore.keyboardChallenges
});
export default Dimensions()(connect(mapStateToProps)(Keyboard));

const shapeImages = {
  car: <Image src={carPic} size="mini" />,
  line: <Image src={linePic} size="mini" />,
  truck: <Image src={truckPic} size="mini" />,
  wagon: <Image src={wagonPic} size="mini" />,
  flipCar: (
    <Image src={carPic} size="mini" style={{ transform: "scaleY(-1)" }} />
  ),
  flipTruck: (
    <Image src={truckPic} size="mini" style={{ transform: "scaleY(-1)" }} />
  ),
  flipWagon: (
    <Image src={wagonPic} size="mini" style={{ transform: "scaleY(-1)" }} />
  ),
  unknown: <Icon name="question circle" />,
  wrongness: (
    <span
      style={{
        fontSize: "2rem",
        marginRight: "8px"
      }}
      role="img"
      aria-label="i dont think thats quite right"
    >
      🤨
    </span>
  )
};
