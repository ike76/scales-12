import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import DumbKey from "./DumbKey";
import { keyObject, keyList } from "../../keySVGs/keyboardUtils";

const KeyboardDiv = styled.div`
  display: inline-flex;
  padding: 3px;
  width: ${({ keysWide, keyboardScale }) =>
    keysWide * 79 * keyboardScale + 30}px;
  z-index: 10;
  position: relative;
`;
const KeyboardBox = styled.div`
  // padding: 5px;
  text-align: center;
`;
const WhiteKeyDiv = styled.div`
  position: relative;
  margin: ${p => p.keyboardScale * 1}px;
`;

class Keyboard extends Component {
  state = {
    keyGroups: [],
    selected: false
  };

  componentDidMount() {
    const { bottomKey, topKey } = this.props;
    this.setState({
      keyGroups: keyList(bottomKey, topKey)
    });
  }
  getCircleShape = noteName => {
    const { notesToShow } = this.props;

    if (notesToShow.includes(noteName)) return "greyFade";
    return null;
  };

  render() {
    const {
      bottomKey,
      keysToLabel,
      keyboardId,
      showShapeBackground,
      keyboardScale,
      showCircles,
      fadeKeys,
      notesToShow,
      displayText,
      displayTitleCircle,
      colorAll,
      labelType
    } = this.props;

    const theme = {
      orange: "#D79922",
      cream: "#EFE2BA",
      red: "#F13C20",
      blue: "#4056A1",
      grey: "#C5CBE3",
      greyFade: "#c5cbe36b",
      black: "#2b2b2b",
      green: "#2a8c3c",
      wagon: "#F13C20",
      car: "#2a8c3c",
      line: "#D79922",
      truck: "#4056A1"
    };

    const ScaleName = styled.div`
      text-align: center;
      color: rgb(43, 43, 43);
      position: absolute;
      top: 0px;
      left: -3px;
      border: grey 1px solid;
      /* padding: 3px; */
      border-radius: 50%;
      background: white;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: rotate(-10deg);
      opacity: 1;
      z-index: 10;
      box-shadow: 1px 1px 4px #9e9e9e8f;
      font-weight: 600;
      color: ${p => p.theme.black};
    `;
    return (
      <ThemeProvider theme={theme}>
        <KeyboardBox>
          <KeyboardDiv>
            {this.state.keyGroups.map(key => {
              const sharedProps = {
                keyboardId,
                showCircles,
                colorAll
              };
              return (
                <WhiteKeyDiv
                  key={`${key[0]} whiteKeyDiv`}
                  keyboardScale={keyboardScale}
                >
                  <DumbKey
                    {...sharedProps}
                    key={`${key[0]} whiteKey`}
                    noteShape={keyObject[key[0]].shape}
                    noteName={key[0]}
                    circleType={this.getCircleShape(key[0])}
                    showLabel={keysToLabel && keysToLabel.includes(key[0])}
                    showShapeBackground={showShapeBackground}
                    keyboardScale={keyboardScale}
                    fadeKeys={fadeKeys}
                    numberOfScale={notesToShow.findIndex(n => n === key[0]) + 1}
                    labelType={labelType}
                  />
                  {key.length > 1 && (
                    <DumbKey
                      {...sharedProps}
                      noteShape="flat"
                      key={`${key[0]} blackKey`}
                      noteName={key[1]}
                      hide={key[0] === bottomKey}
                      circleType={this.getCircleShape(key[1])}
                      showLabel={keysToLabel && keysToLabel.includes(key[1])}
                      showShapeBackground={showShapeBackground}
                      keyboardScale={keyboardScale}
                      numberOfScale={
                        notesToShow.findIndex(n => n === key[1]) + 1
                      }
                      labelType={labelType}
                      fadeKeys={fadeKeys}
                    />
                  )}
                </WhiteKeyDiv>
              );
            })}
          </KeyboardDiv>
          {displayTitleCircle && <ScaleName>{displayText}</ScaleName>}
        </KeyboardBox>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps)(Keyboard);
