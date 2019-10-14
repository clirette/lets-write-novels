import React, { useState } from "react"
import Layout from "../components/Layout"
import boards from "../images/boards.jpg"
import devices from "../utils/devices"
import styled from "styled-components"

const HeadingTitle = styled.h1`
  font-size: 9rem;
  font-family: serif;
  font-style: italic;
  letter-spacing: 0.2rem;
  margin-top: 5rem;
  margin-bottom: 3rem;
  color: #fff;
  @media ${devices.mobileL} {
    margin-bottom: 1rem;
  }
`

const Wrapper = styled.div`
  width: 70%;
  text-align: center;
  margin: auto;
  display: flex;
  flex-direction: column;
`

const TextArea = styled.textarea`
  height: 85vh;
  width: 100%;
  padding: 3rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  overflow-y: scroll;
`

const SaveButton = styled.button`
  position: absolute;
  bottom: 7rem;
  right: 7rem;
  padding: 0.5rem 5rem;
  cursor: pointer;
  min-width: 18rem;
`

const DeleteButton = styled.button`
  position: absolute;
  bottom: 12rem;
  right: 7rem;
  padding: 0.5rem 5rem;
  cursor: pointer;
  min-width: 18rem;
`

const HINT_TRANSITION_SECONDS = 60

const HelpfulHint = styled.div`
  position: absolute;
  bottom: 7rem;
  left: 2rem;
  color: #fff;
  padding: 3rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  border-radius: 0.3rem;
  font-size: 2.4rem;
  width: 13%;
  background-color: rgba(188, 151, 210, 0.7);
  animation: slideInOut ${HINT_TRANSITION_SECONDS}s infinite;
  @keyframes slideInOut {
    0% {
      transform: translateY(-10%);
      opacity: 0;
    }
    2% {
      transform: translateY(0);
      opacity: 1;
    }
    98% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(-10%);
      opacity: 0;
    }
  }
`

const saveToLocalStorage = deskContent =>
  window.localStorage.setItem("friendlyDesk", deskContent)

const deleteLocalStorage = () => window.localStorage.removeItem("friendlyDesk")

const getInitialDeskContent = () =>
  window.localStorage.getItem("friendlyDesk") || ""

const helpfulHints = [
  "Taking time to write is the most important thing! You're doing great!",
  "Even the worst first draft is better than a blank page. Keep going!",
  '"You miss 100% of the shots you don\'t take" - Wayne Gretzky -- Michael Scott',
]

const setNextHint = (currentHintIndex, setCurrentHintIndex) =>
  currentHintIndex !== helpfulHints.length - 1
    ? setCurrentHintIndex(currentHintIndex + 1)
    : setCurrentHintIndex(0)

const FriendlyDesk = () => {
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [deskContent, setDeskContent] = useState(getInitialDeskContent)
  setInterval(
    () => setNextHint(currentHintIndex, setCurrentHintIndex),
    HINT_TRANSITION_SECONDS * 1000
  )
  return (
    <Layout backgroundImage={boards} darkOverlay>
      <HelpfulHint>{helpfulHints[currentHintIndex]}</HelpfulHint>
      <Wrapper>
        <HeadingTitle>The Friendly Desk</HeadingTitle>
        <TextArea
          onChange={e => {
            setDeskContent(e.target.value)
          }}
          value={deskContent}
        ></TextArea>
      </Wrapper>
      <SaveButton onClick={() => saveToLocalStorage(deskContent)}>
        Save
      </SaveButton>
      <DeleteButton
        onClick={() => {
          setDeskContent("")
          deleteLocalStorage()
        }}
      >
        Clear
      </DeleteButton>
    </Layout>
  )
}

export default FriendlyDesk
