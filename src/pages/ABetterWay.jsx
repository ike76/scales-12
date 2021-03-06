import React, { Component } from "react";
import { Header, Image, Card } from "semantic-ui-react";
import styled from "styled-components";

import Layout from "../layout/Layout";
// import { NextButton } from "../components/uiElements";
import { EMajor12Scales, EMajorConventional } from "../images";
export const DotCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  justify-items: center;
  grid-gap: 10px;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 1px 1px 4px #b7b7b7;
  margin: 1.5rem;
`;

export default class ABetterWay extends Component {
  state = {
    split: false,
    shapesSelected: [],
    colorAll: true,
    slideIndex: 0
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  increment = () => {
    this.setState({ slideIndex: this.state.slideIndex + 1 });
  };
  decrement = () => {
    this.setState({ slideIndex: this.state.slideIndex - 1 });
  };

  render() {
    return (
      <Layout myUrl={this.props.match.path}>
        <Header as="h2">
          <Header.Content>A Better Way</Header.Content>
          <Header.Subheader>to learn Major scales</Header.Subheader>
        </Header>

        <p>
          For this class, we are going to sidestep music theory, key signatures,
          note names, sharps and flats. We're just going to cut straight to how
          these 12 Major Scales{" "}
          <em>
            <strong>look</strong>
          </em>
          .
        </p>
        <p>
          Think of the how you <em>"just know"</em> your way around your
          neighborhood, even if you don't know every street name. In the same
          way, you can <em>"just know"</em> all your Major scales, even without
          knowing any of the note names.
        </p>

        <Card.Group centered>
          <Card color="red">
            <Image src={EMajorConventional} />
            <Card.Content>
              <Card.Header>The Conventional Way</Card.Header>
              <Card.Meta>E Major Scale</Card.Meta>
              <Card.Description>
                <p>
                  Sharps (#s) get assigned in this order:{" "}
                  <strong>F#, C#, G#, D#, A#, E#, B#</strong>.
                </p>{" "}
                <p>
                  The E Major Scale has four sharps, so we use the first four
                  from that list:
                  <strong> F#, C#, G# </strong>
                  and <strong>D#</strong>.
                </p>{" "}
                So when we get to any of those keys (<strong>F</strong>,{" "}
                <strong>C</strong>, <strong>G</strong> & <strong>D</strong>
                ), we substitute the 'sharped' key in for the natural key. (
                <strong>F </strong>
                becomes <strong>F#</strong>, etc){" "}
                <p style={{ fontSize: "2rem" }}>
                  <span role="img" aria-label="confused face">
                    🤔
                  </span>
                </p>
              </Card.Description>
            </Card.Content>
          </Card>
          <Card color="green">
            <Image src={EMajor12Scales} />
            <Card.Content>
              <Card.Header>The 12Scales Method</Card.Header>
              <Card.Meta>E Major Scale</Card.Meta>
              <Card.Description>
                <strong>Car, Car.</strong>{" "}
                <p style={{ fontSize: "2rem" }}>
                  <span role="img" aria-label="smiles thumbs up">
                    😎👍🏼
                  </span>
                </p>
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
        <p>
          <br />
          Both methods will lead you to a proper E major scale, but remembering
          'Car, Car' is going to be easier than all that other stuff.
        </p>
        <p>
          Later, when you already know the shape of an E major scale, you wont
          even have to think "Car Car," you'll just think "E Major." At that
          point, learning which notes are sharp will be a simple task; like
          learning <em>the name</em> of a road that you already use all the
          time.
        </p>

        <Header>
          <Header.Content as="h2">12Scales method</Header.Content>
        </Header>
        <p>
          As you saw in the example above, the 12Scales method divides each
          scale into two halves. The first four notes make a shape, and the last
          four notes make a second shape. (E Major becomes "Car, Car")
        </p>
        <p />
        <p>
          So we're going to cover three concepts:
          <ul>
            <li>The Shapes</li>
            <li>Where they go</li>
            <li>How to put them together</li>
          </ul>
          First up, The Shapes.
        </p>
      </Layout>
    );
  }
}
