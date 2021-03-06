import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import styled from "styled-components";
import { List, Icon } from "semantic-ui-react";
import { chapters } from "../../utils/chapterIndex";
class UserDashboard extends Component {
  render() {
    const { finishedLessons, profile } = this.props;
    const visitedLessons =
      finishedLessons &&
      finishedLessons.reduce((obj, les) => {
        if (obj[les.slug]) {
          // see if this one is later
          if (obj[les.slug] < les.timestamp.seconds) {
            obj[les.slug] = les.timestamp.seconds;
          }
          return obj;
        } else {
          return { ...obj, [les.slug]: les.timestamp.seconds };
        }
      }, {});
    if (!profile.isLoaded) {
      return <h2>loading. . .</h2>;
    }
    return (
      <List celled>
        {Object.keys(chapters).map(chapter => (
          <List.Item key={chapter}>
            {chapter}
            <List>
              {chapters[chapter].map(lesson => {
                return (
                  <List.Item key={lesson.slug}>
                    <List.Content>
                      <List.Header as={Link} to={"/" + lesson.slug}>
                        <h4>
                          <span>{lesson.title}</span>
                          {visitedLessons &&
                            visitedLessons[lesson.slug] && (
                              <LastVisitedSpan>
                                <Icon name="check circle outline" />
                                <Moment fromNow unix>
                                  {visitedLessons[lesson.slug]}
                                </Moment>
                              </LastVisitedSpan>
                            )}
                        </h4>
                      </List.Header>
                      <List.Description />
                    </List.Content>
                  </List.Item>
                );
              })}
            </List>
          </List.Item>
        ))}
      </List>
    );
  }
}

const LastVisitedSpan = styled.span`
  font-size: 10px;
  font-weight: lighter;
  color: grey;
  margin-left: 0.5rem;
`;

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  finishedLessons: state.firebase.profile.finishedLessons,
  profile: state.firebase.profile
});
const actions = {};

export default connect(
  mapStateToProps,
  actions
)(UserDashboard);
