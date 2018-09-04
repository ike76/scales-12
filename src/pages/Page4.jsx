import React, { Component } from "react";
import Layout from "../layout/Layout";
import { Header, Image, Card, Button } from "semantic-ui-react";
import posed from "react-pose";
import styled from "styled-components";
import { lineSpacing, Line, Car, Wagon, Truck } from "../images/";
export default class Page4 extends Component {
  render() {
    return (
      <Layout>
        {/* <p>
          There are four shapes to learn to use the 12scales system. four dots
          per shape, and the spacing looks like this:
        </p>

        <img
          src={lineSpacing}
          alt="spacing of the dots"
          width="200px"
          style={{ margin: "1rem" }}
        />
        <p>
          notice that dots 3 and 4 are close together, while dots 1, 2 and 3 are
          separated by a space.
        </p> */}
        {/* <hr /> */}
        <Header as="h2">
          <Header.Content>The Shapes</Header.Content>
        </Header>
        <DotCardsGrid>
          {shapesArr.map(shape => (
            <ShapeCard {...shape} />
          ))}
        </DotCardsGrid>
      </Layout>
    );
  }
}

const shapesArr = [
  {
    name: "line",
    src: Line,
    header: "Line",
    description: "yep. its just a straight line. You can do this."
  },
  { name: "car", src: Car, header: "Car", description: "down • UP • UP down" },
  {
    name: "truck",
    src: Truck,
    header: "Truck",
    description: "down • down • UP down"
  },
  {
    name: "wagon",
    src: Wagon,
    header: "Wagon",
    description: "down • down • down • UP"
  }
];
const ShapeCard = ({
  src,
  header,
  description,
  setCardIndex,
  i,
  disabled,
  active
}) => (
  <CardFader pose={active ? "active" : disabled ? "disabled" : "done"}>
    <Card>
      <Card.Content>
        <Image src={src} />
        <Card.Header>{header}</Card.Header>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  </CardFader>
);
const CardFader = posed.div({
  active: { opacity: 1, y: "0%" },
  disabled: { opacity: 0.05, y: "10%" },
  done: { opacity: 0.7, y: "3%" }
});
export const DotCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 21rem);
  justify-items: center;
  grid-gap: 10px;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 1px 1px 4px #b7b7b7;
  margin: 1.5rem;
  align-items: center;
  justify-content: center;
`;