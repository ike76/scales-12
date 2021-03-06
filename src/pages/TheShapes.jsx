import React, { Component } from "react";
import { Button, Header, Item } from "semantic-ui-react";
import styled from "styled-components";
import { scroller, Element } from "react-scroll";
import Layout from "../layout/Layout";
import { CheckIcon } from "../components/uiElements";
import { DotCardsGrid } from "./ABetterWay";
import { scaleShapes2 } from "../components/keyboard/keyboardShapes";
// import { NextButton } from "../components/uiElements/index";
import Dotboard8 from "../components/dotboard/Dotboard8";
import { Line, Car, Truck, Wagon, KeystoDots } from "../images";
export default class TheShapes extends Component {
  state = {
    hide2ndShape: false,
    split: false,
    shapesSelected: [],
    colorAll: true,
    sectionsCircled: []
  };
  setShapeSelected = shapeSelected => {
    this.setState({ shapeSelected });
  };
  scrollToDotBoard = () => {
    scroller.scrollTo("dotboard", {
      duration: 300,
      delay: 0,
      smooth: true,
      offset: -50
    });
  };
  toggleSectionsCircled = (section1, section2) => {
    const adding = !this.state.sectionsCircled.includes(section1);
    const { sectionsCircled } = this.state;
    let newSectionsCircles;
    if (adding) {
      // add sections
      newSectionsCircles = [...sectionsCircled, section1, section2];
    } else {
      // remove sections
      newSectionsCircles = sectionsCircled.filter(
        sect => sect !== section1 && sect !== section2
      );
    }
    this.setState({ sectionsCircled: [...newSectionsCircles] });
  };

  toggleShapeSelected = shape => {
    const { shapesSelected } = this.state;
    let newShapesSelected;
    if (shapesSelected.includes(shape)) {
      // remove it
      newShapesSelected = [...shapesSelected.filter(s => s !== shape)];
    } else {
      // add it
      this.scrollToDotBoard();

      newShapesSelected = [...shapesSelected, shape];
    }
    this.setState({ shapesSelected: newShapesSelected });
  };
  toggleSplit = () => {
    this.setState({ split: !this.state.split });
  };
  ShapeLink = ({ shapeName }) => (
    <a
      style={{ cursor: "pointer" }}
      onClick={() => this.toggleShapeSelected(shapeName.toLowerCase())}
    >
      <strong>{shapeName}</strong>
    </a>
  );
  render() {
    const { split } = this.state;

    return (
      <Layout myUrl={this.props.match.path}>
        <Header as="h2">
          <Header.Content>All The Shapes</Header.Content>
        </Header>

        <Item>
          <Item.Image size="medium" src={KeystoDots} />
          <Item.Header as="h4">
            Here is how we'll LOOK at all the scales.
          </Item.Header>
          <Item.Description>
            <p>
              <CheckIcon />
              Each Major Scale is a series of <strong>eight keys</strong> with
              its own unique pattern of <strong>BLACK</strong> and{" "}
              <strong>WHITE</strong> keys.
            </p>
            <p>
              <CheckIcon />
              We'll convert those <strong>BLACK</strong> and{" "}
              <strong>WHITE</strong> keys into <strong>UP</strong> and{" "}
              <strong>DOWN</strong> dots.
            </p>
            <p>
              <CheckIcon />
              <strong>UP</strong> dots are <strong>black</strong> keys, and
              <strong> DOWN</strong> dots are <strong>white</strong> keys.
            </p>
            <p>
              <CheckIcon />
              Four dots make a <em>shape</em>, and two <em>shapes</em> make a
              scale.
            </p>
            <p>
              <CheckIcon />
              First,{" "}
              <Button
                onClick={() => {
                  this.toggleSplit();
                }}
                primary={!this.state.split}
                basic={this.state.split}
              >
                Click Here
              </Button>{" "}
              to see how each scale splits into two <em>shapes</em>.
            </p>
          </Item.Description>
        </Item>
        <p />
        <Element name="dotboard" />
        <DotCardsGrid>
          {Object.entries(scaleShapes2).map(scaleShape => (
            <Dotboard8
              bottomShape={scaleShape[1].bottom}
              topShape={scaleShape[1].top}
              shapesSelected={this.state.shapesSelected}
              root={scaleShape[0]}
              split={split}
              colorAll={!this.state.shapesSelected.length}
            />
          ))}
        </DotCardsGrid>

        <p>(Click on any of those shapes to hear them.)</p>

        <p>
          The best part of the 12scales system is after you split the scales up
          like this, there are only
          <strong> FOUR</strong> shapes to learn.{" "}
        </p>
        <p>
          We'll give each of our four shapes a name. Similar to a constellation
          of stars (<em>i.e. The Big Dipper</em>
          ), giving a name to each shape will make them easier to recognize and
          remember.
        </p>
        <p>
          We'll call our shapes The <this.ShapeLink shapeName="Line" />, The{" "}
          <this.ShapeLink shapeName="Car" />, The{" "}
          <this.ShapeLink shapeName="Truck" />, and The{" "}
          <this.ShapeLink shapeName="Wagon" />.
        </p>
        <p>
          Click on each shape to see where they are used in the above graph:
        </p>
        <ButtonRow>
          {shapesArr.map((shape, i) => (
            <Button
              onClick={() => this.toggleShapeSelected(shape.name)}
              active={this.state.shapesSelected.includes(shape.name)}
              primary={!this.state.shapesSelected.includes(shape.name)}
            >
              <div>{shape.name}</div>
              <img
                src={shape.image}
                alt={`${shape.name} shape`}
                width={60}
                style={{
                  background: "#ffffffa1",
                  padding: "3px",
                  borderRadius: "3px"
                }}
              />
            </Button>
          ))}
        </ButtonRow>
        <br />
        <p>
          You may have noticed that sometimes they're upside-down. Fear not.
          We'll get into that.
        </p>
        <hr />
        <Header as="h2">
          <Header.Content>It gets easier</Header.Content>
          <Header.Subheader>the further you go</Header.Subheader>
        </Header>
        <p>
          We've already cut the complexity down by a lot. Instead of remembering
          <strong> eight individual notes</strong> for each of the 12 scales,
          we'll only need to remember which two shapes (of the four
          possibilities) make up each scale.
        </p>
        <p>
          Instead of <strong>Bb, C, D, Eb, F, G, A, Bb</strong>, we'll think '
          <strong>CAR - WAGON</strong>'
        </p>
        <p>
          <em>but it gets even easier than that.</em>
        </p>
        <p />
        <p>
          Look again at our scale chart below. Notice how the{" "}
          <strong>2nd shape of the C scale</strong> <em>looks and sounds</em>{" "}
          the same as the
          <strong> first shape of the G scale</strong>?{" "}
          <Button
            size="mini"
            compact
            onClick={() => this.toggleSectionsCircled("Ctop", "Gbottom")}
            basic
            primary
          >
            {!this.state.sectionsCircled.includes("Ctop")
              ? "show me"
              : "got it"}
          </Button>
        </p>
        <p>
          ...and the 2nd shape of the 'G' scale matches the 1st shape of the 'D'
          scale?{" "}
          <Button
            size="mini"
            compact
            onClick={() => this.toggleSectionsCircled("Gtop", "Dbottom")}
            basic
            primary
          >
            {!this.state.sectionsCircled.includes("Gtop")
              ? "show me"
              : "got it"}
          </Button>
        </p>
        <p>
          ...and the 2nd shape of the 'D' scale matches the 1st shape of the 'A'
          scale ? . . . and on and on and on.
        </p>

        <DotCardsGrid>
          {Object.entries(scaleShapes2).map((scaleShape, i) => (
            <Dotboard8
              bottomShape={scaleShape[1].bottom}
              topShape={scaleShape[1].top}
              shapesSelected={["Car", "Truck", "Wagon", "Line"]}
              root={scaleShape[0]}
              split={!this.state.hide2ndShape && true}
              colorAll={true}
              circleTop={this.state.sectionsCircled.includes(
                `${scaleShape[0]}top`
              )}
              circleBottom={this.state.sectionsCircled.includes(
                `${scaleShape[0]}bottom`
              )}
              hide2ndShape={this.state.hide2ndShape}
            />
          ))}
        </DotCardsGrid>
        <p>
          We'll talk about how these scales connect later, but when we start
          playing them, you'll find{" "}
          <em>you don't even have to memorize the 2nd shape.</em>
        </p>
        <p>
          You really only have to remember the{" "}
          <Button
            primary={!this.state.hide2ndShape}
            basic={this.state.hide2ndShape}
            onClick={() => this.setState({ hide2ndShape: true })}
          >
            FIRST SHAPE
          </Button>
        </p>
        <p>Let's dig in and learn those four shapes.</p>
      </Layout>
    );
  }
}

const shapesArr = [
  { name: "line", image: Line },
  { name: "car", image: Car },
  { name: "truck", image: Truck },
  { name: "wagon", image: Wagon }
];

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-around;
  align-items: center;
`;
