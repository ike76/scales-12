import React, { Component } from "react";
import { connect } from "react-redux";
import { paths, keyObject } from "../../keySVGs/keyboardUtils";
import styled from "styled-components";
import { addNoteToList } from "../../actions/keyboardActions";
import BlackKey from "./BlackKey.jsx";
import Circle from "../components/keyboard/Circle.jsx";
const WhiteKeyDiv = styled.div`
  position: relative;
  margin: 1px;
`;

const Svg = styled.svg`
  &:hover path {
    fill: lightgrey;
  }
`;

const NoteDisplay = styled.div`
  position: absolute;
  bottom: 1rem;
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
`;

class WhiteKey extends Component {
  render() {
    const { noteName, hideFlat, showNoteName, keyboardId, circle } = this.props;

    const handleClick = noteName => () => {
      this.props.dispatch(addNoteToList({ noteName, keyboardId }));
    };
    return (
      <WhiteKeyDiv>
        <Svg
          onClick={handleClick(noteName)}
          width="77"
          height="502"
          viewBox="0 0 77 502"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={paths[noteName]} stroke="#000" id="C" fill="none" />
        </Svg>
        {!hideFlat && (
          <BlackKey
            noteName={`${noteName}b`}
            keyboardId={keyboardId}
            handleClick={handleClick(`${noteName}b`)}
          />
        )}
        {showNoteName && <NoteDisplay>{noteName}</NoteDisplay>}
      </WhiteKeyDiv>
    );
  }
}
const mapStateToProps = state => ({});
export default connect(mapStateToProps)(WhiteKey);
