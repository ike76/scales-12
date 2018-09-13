import React, { Component, Fragment } from "react";
import { chapters } from "../utils/chapterIndex";
import { Container, Dropdown, Image, Menu, Icon } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withFirestore } from "react-redux-firebase";
import { openModal } from "../components/uiElements/modals/modalActions.jsx";
import { signInUserAnon } from "../actions/authActions.jsx";
import firebase from "../utils/firebase";

const ChapterTitle = props => {
  const { displayText, lessons, profile, currentUrl } = props;
  let chapterIsFinished = false;
  let chapterIsCurrent = false;
  if (profile && profile.finishedLessons) {
    const theseFinishedLessons = lessons.filter(les =>
      profile.finishedLessons.find(
        profileLesson => profileLesson.slug === les.slug
      )
    );
    chapterIsFinished = theseFinishedLessons.length === lessons.length;
    chapterIsCurrent = lessons.find(les => les.url === currentUrl);
  } else {
    chapterIsCurrent = displayText === "Introduction";
  }
  return (
    <Dropdown.Item>
      <span style={!chapterIsCurrent ? { color: "#dadada" } : {}}>
        <Icon
          className={
            chapterIsCurrent
              ? "arrow right"
              : chapterIsFinished
                ? "check square outline"
                : "square outline"
          }
        />
        {displayText}
      </span>
      {lessons && (
        <Dropdown.Menu>
          {lessons.map(lesson => {
            const finished =
              profile &&
              profile.finishedLessons &&
              profile.finishedLessons.find(les => les.slug === lesson.slug);
            const current = currentUrl === lesson.url;
            return (
              <Dropdown.Item key={lesson.url} as={Link} to={lesson.url}>
                <span
                  style={
                    current
                      ? { color: "#6f3030", fontWeight: "bolder" }
                      : finished
                        ? { color: "#dadada" }
                        : {}
                  }
                >
                  {current && <Icon name="arrow right" />}
                  {lesson.title}
                </span>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      )}
    </Dropdown.Item>
  );
};

class NavBar extends Component {
  state = {
    isSignedIn: false,
    user: {}
  };
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };
  handleSignInAnon = () => {
    this.props.signInUserAnon();
  };
  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };
  handleSignOut = () => {
    // this.props.firebase.logout();
    firebase.auth().signOut();
    // this.setState({ isSignedIn: false, user: {} });
  };

  render() {
    const { finishedPages, auth, profile } = this.props;
    const currentUrl = this.props.match.path;
    const authenticated = auth.isLoaded && !auth.isEmpty;

    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as={Link} to="/" header>
            <Image
              size="mini"
              src="/logo.png"
              style={{ marginRight: "1.5em" }}
            />
            12scales
          </Menu.Item>
          <Dropdown item simple text="Chapters">
            <Dropdown.Menu>
              {Object.keys(chapters).map(key => {
                const lessons = chapters[key];
                return (
                  <ChapterTitle
                    key={key}
                    to={lessons[0] ? lessons[0].url : "/"}
                    displayText={key}
                    disabled={false}
                    lessons={lessons}
                    finishedPages={finishedPages}
                    profile={profile}
                    currentUrl={currentUrl}
                  />
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position="right">
            <Menu.Item onClick={this.handleSignInAnon}>anon</Menu.Item>
            {authenticated ? (
              <Fragment>
                <Menu.Item>{auth.displayName || auth.email}</Menu.Item>
                <Menu.Item onClick={this.handleSignOut}>Sign Out</Menu.Item>
              </Fragment>
            ) : (
              <Fragment>
                <Menu.Item onClick={this.handleSignIn}>Sign In</Menu.Item>
                <Menu.Item onClick={this.handleRegister}>
                  Register
                </Menu.Item>{" "}
              </Fragment>
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}
const mapStateToProps = state => ({
  finishedPages: state.userScore.finishedPages,
  auth: state.firebase.auth,
  profile: state.firebase.profile
});
const actions = { openModal, signInUserAnon };
export default withRouter(
  withFirestore(
    connect(
      mapStateToProps,
      actions
    )(NavBar)
  )
);
