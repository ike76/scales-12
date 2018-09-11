import React, { Component } from "react";
import { Header, Container, Card, Item } from "semantic-ui-react";
import { ScaleCard } from "../components/uiElements/customDisplays";
import Layout from "../layout/Layout.jsx";

import KeyboardInline from "../components/keyboard/KeyboardInline.jsx";

import AmajorScale from "../images/AmajorScale.svg";
import DbMajorScale from "../images/DbMajorScale.svg";
import BbMajorScale from "../images/BbmajorScale.svg";
import { fullScales } from "../components/keyboard/keyboardShapes";
import { CMajorScale } from "../images";
import { StarterIcon } from "../components/uiElements/index";

export default class IntroPage extends Component {
  state = {
    CScaleDone: false
  };
  render() {
    return (
      <Layout myUrl={this.props.match.path}>
        <Header as="h1">
          <Header.Content>Major Scales</Header.Content>
        </Header>
        <Container>
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Image size="medium" src={CMajorScale} />
                <Item.Header as="h4">This is where it all starts.</Item.Header>
                <Item.Description>
                  <p>
                    Major Scales are important to learn and understand. They are
                    the <em>building blocks</em> upon which <em>most music</em>{" "}
                    is based.
                  </p>

                  <p>
                    The process of learning major scales in all 12 keys is a
                    sort of rite of passage for most musicians. The basics of
                    theory and harmony get involved, and your music knowlege
                    grows from there.
                  </p>
                  <p>
                    Most piano teachers or music lessons will start with note
                    names, sharps and flats, and make their way to key
                    signatures and the Major Scale.
                  </p>
                  <br />
                </Item.Description>
                <Header as="h3">
                  The <em>12scales</em> system is different.
                </Header>
                <Item.Description>
                  <p>
                    We're going to skip over note names and key signatures and{" "}
                    <strong>start</strong> with the scales. There will be time
                    to dig into note names later, and by then you'll simply be
                    putting a name to <em>something you already understand</em>.
                    The early advantage you get from knowing your scale-shapes
                    will make those lessons much easier, and more{" "}
                    <em>meaningful</em>.
                  </p>
                  <p>
                    Let's start off with an easy scale-shape, so you can get the
                    feel for it.
                  </p>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>

          <KeyboardInline
            keyboardId="kb000Cmajor"
            bottomKey="C1"
            topKey="C2"
            showAllCircles={true}
            keyboardScale={0.54}
            callbackWhenFinished={() => this.setState({ CScaleDone: true })}
            messageInstructions={{
              icon: "question circle",
              header: "C Major Scale",
              content: (
                <p>
                  Click all the circles from left to right, starting at the{" "}
                  <StarterIcon />
                </p>
              )
            }}
            instructions="Turn on your speakers and click on the dots in order,
            1 thru 8."
            answers={[
              {
                bottomKey: "C1",
                topKey: "C2",
                correctAnswer: fullScales.C
              }
            ]}
          />

          <h3>Easy!</h3>
          <p>
            ...but "C" is just one of the 12 keys, so what about the other 11
            Major Scales?
          </p>
          <p>
            Each (starting) key has its own Major Scale, and therefore it's own
            Major Scale <em>shape</em>. Here are a few examples.
          </p>
          <Card.Group centered>
            <ScaleCard src={AmajorScale} title={"A Major"} />
            <ScaleCard src={DbMajorScale} title={"Db Major"} />
            <ScaleCard src={BbMajorScale} title={"Bb Major"} />
          </Card.Group>
          <p>
            Each scale follows an exact pattern of <strong>half-steps</strong>{" "}
            (goes straight to the next key) and <strong>whole-steps</strong>{" "}
            (skips over a key). That pattern makes each scale{" "}
            <strong>sound</strong> correct, but they still all <em>look</em>{" "}
            completely different.
          </p>
          <p>
            With a few days of practice, it's possible to memorize the shape of
            all 12 Major Scales. It's a lot of information, but no more
            difficult than, say, learning your multiplication tables.
          </p>
          <p>
            What most people don't realize is{" "}
            <strong>there are patterns in the way the scales look</strong>, too.
            It takes a little decoding (you've come to the right place), but
            once you see the patterns, the task of learning these 12 Major
            Scales becomes far easier.
          </p>
          <p>Stay tuned. </p>
        </Container>
      </Layout>
    );
  }
}
