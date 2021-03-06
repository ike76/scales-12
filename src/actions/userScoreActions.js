import { db } from "../utils/firebase";
import firebase from "../utils/firebase";
import {
  openModal,
  closeModal
} from "../components/uiElements/modals/modalActions.jsx";

export const COMPLETE_CHAPTER_QUIZ = "COMPLETE_CHAPTER_QUIZ";
export const completeChapterQuiz = ({ quizId, displayName, city }) => (
  dispatch,
  getState,
  { getFirestore, getFirebase }
) => {
  // const firebase = getFirebase();
  const firestore = getFirestore();
  const authenticated =
    firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous;
  if (!authenticated) {
    return dispatch(openModal("HistoryInterrupt", { quizId }));
  }
  const uid = authenticated && firebase.auth().currentUser.uid;
  if (authenticated) {
    if (displayName.trim().length && city.trim().length) {
      const timestamp = firestore.Timestamp.now();
      const updateObj = { displayName, city, timestamp, uid };
      firestore
        .collection("completedQuizzes")
        .doc(quizId)
        .update({
          completions: firestore.FieldValue.arrayUnion(updateObj)
        })
        .then(() => dispatch(closeModal()))
        .catch(err => console.error("firebase err", err));
    } else {
      return dispatch(openModal("NameCity", { quizId }));
    }
  }

  dispatch({
    type: COMPLETE_CHAPTER_QUIZ,
    quizId
  });
};

export const START_CHAPTER_QUIZ = "START_CHAPTER_QUIZ";
export const startChapterQuiz = chapterId => ({
  type: START_CHAPTER_QUIZ,
  chapterId
});

export const COMPLETE_KEYBOARD_CHALLENGE = "COMPLETE_KEYBOARD_CHALLENGE";
export const completeKeyboardChallenge = keyboardId => ({
  type: COMPLETE_KEYBOARD_CHALLENGE,
  keyboardId
});

export const FINISH_PAGE = "FINISH_PAGE";
export const finishPage = ({ pageUrl, chapter, slug }) => async (
  dispatch,
  getStore,
  { getFirestore, getFirebase }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();

  const timestamp = firestore.Timestamp.now();
  const action = {
    type: FINISH_PAGE,
    pageUrl,
    chapter,
    timestamp,
    slug
  };
  if (firebase.auth().currentUser) {
    console.log("firebase.auth.currentuser", firebase.auth().currentUser);
    const userId = firebase.auth().currentUser.uid;
    firestore
      .collection("users")
      .doc(userId)
      .set(
        {
          finishedLessons: firestore.FieldValue.arrayUnion({ slug, timestamp })
        },
        { merge: true }
      )
      .catch(err => console.log("update error", err));
  }

  dispatch(action);
};

export const firebaseThunk = userId => dispatch => {
  console.log("trying to get user with id:", userId);
  db.collection("users")
    .doc(userId)
    .get()
    .then(user => console.log("user data", user.data()));
};
