import React, { useState } from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import boards from "../images/boards.jpg"
import devices from "../utils/devices"
import styled from "styled-components"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

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
  @media ${devices.tablet} {
    font-size: 6rem;
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
  font-size: 2rem;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
`

const SaveButton = styled.button`
  position: absolute;
  bottom: 7rem;
  right: 5rem;
  padding: 0.5rem 5rem;
  cursor: pointer;
  min-width: 18rem;
  font-size: 2rem;
  @media ${devices.laptopL} {
    bottom: 4rem;
    right: 0;
    min-width: 15rem;
  }
`

const DeleteButton = styled.button`
  position: absolute;
  bottom: 12rem;
  right: 5rem;
  padding: 0.5rem 5rem;
  cursor: pointer;
  min-width: 18rem;
  font-size: 2rem;
  @media ${devices.laptopL} {
    bottom: 9rem;
    right: 0;
    min-width: 15rem;
  }
`

const StyledModal = styled(Modal)`
  font-size: 2rem;
`

const StyledModalButton = styled(Button)`
  font-size: 2rem;
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
  background-color: rgba(188, 151, 210, 0.8);
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
  @media ${devices.laptopL} {
    bottom: 4rem;
    left: 1rem;
    padding: 1.4rem;
    font-size: 1.8rem;
    width: 14%;
  }
`

const DesktopWrapper = styled.div`
  @media ${devices.tablet} {
    display: none;
  }
`

const MobileWrapper = styled.div`
  @media ${devices.tablet} {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }
`

const MobileHeader = styled.div`
  flex: 1;
  background-color: #354355;
  color: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const MobileTitle = styled.h1`
  font-size: 5vw;
  align-self: center;
  animation: slideInOut ${HINT_TRANSITION_SECONDS}s infinite;
  @keyframes slideInOut {
    0% {
      transform: translateY(-10%);
      opacity: 0;
    }
    2% {
      transform: translateY(-10%);
      opacity: 0;
    }
    4% {
      transform: translateY(0);
      opacity: 1;
    }
    96% {
      transform: translateY(0);
      opacity: 1;
    }
    98% {
      transform: translateY(-10%);
      opacity: 0;
    }
    100% {
      transform: translateY(-10%);
      opacity: 0;
    }
  }
`

const MobileBody = styled.div`
  flex: 8;
  background-color: #221b19;
`

const MobileTextArea = styled.textarea`
  background-color: #221b19;
  height: 100%;
  width: 100%;
  color: #fff;
  padding: 3rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  overflow-y: scroll;
  font-size: 4rem;
`

const windowGlobal = typeof window !== "undefined" && window

const saveToLocalStorage = deskContent =>
  windowGlobal.localStorage.setItem("friendlyDesk", deskContent)

const deleteLocalStorage = () =>
  windowGlobal.localStorage.removeItem("friendlyDesk")

const getInitialDeskContent = () =>
  windowGlobal.localStorage.getItem("friendlyDesk") || ""

const setNextHint = (currentHintIndex, setCurrentHintIndex, helpfulHintsData) =>
  currentHintIndex !== helpfulHintsData.length - 1
    ? setCurrentHintIndex(currentHintIndex + 1)
    : setCurrentHintIndex(0)

const FriendlyDesk = ({
  data: {
    contentfulDeskMotivation: {
      data: { data: helpfulHintsData },
    },
  },
}) => {
  const [currentHintIndex, setCurrentHintIndex] = useState(0)
  const [deskContent, setDeskContent] = useState(getInitialDeskContent)
  const [modal, setModal] = useState(false)
  const [clearModal, setClearModal] = useState(false)
  const toggle = () => setModal(!modal)
  const toggleClear = () => setClearModal(!clearModal)
  setInterval(
    () => setNextHint(currentHintIndex, setCurrentHintIndex, helpfulHintsData),
    HINT_TRANSITION_SECONDS * 1000
  )

  const mobileHelpfulHints = [...helpfulHintsData]
  mobileHelpfulHints.unshift("The Friendly Desk")

  return (
    <>
      <DesktopWrapper>
        <Layout backgroundImage={boards} darkOverlay>
          <StyledModal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h1">
              Save your work?
            </ModalHeader>
            <ModalBody>
              Saving your work will overwrite whatever you had saved previously.
              Are you sure?
            </ModalBody>
            <ModalFooter>
              <StyledModalButton
                color="primary"
                onClick={() => {
                  toggle()
                  saveToLocalStorage(deskContent)
                }}
              >
                Yes
              </StyledModalButton>{" "}
              <StyledModalButton color="secondary" onClick={toggle}>
                No
              </StyledModalButton>
            </ModalFooter>
          </StyledModal>
          <StyledModal isOpen={clearModal} toggle={toggleClear}>
            <ModalHeader toggle={toggleClear} tag="h1">
              Clear your work?
            </ModalHeader>
            <ModalBody>
              Clearing your work will discard your current changes. Are you
              sure?
            </ModalBody>
            <ModalFooter>
              <StyledModalButton
                color="primary"
                onClick={() => {
                  toggleClear()
                  setDeskContent("")
                  deleteLocalStorage()
                }}
              >
                Yes
              </StyledModalButton>{" "}
              <StyledModalButton color="secondary" onClick={toggleClear}>
                No
              </StyledModalButton>
            </ModalFooter>
          </StyledModal>
          <HelpfulHint>{helpfulHintsData[currentHintIndex]}</HelpfulHint>
          <Wrapper>
            <HeadingTitle>The Friendly Desk</HeadingTitle>
            <TextArea
              onChange={e => {
                setDeskContent(e.target.value)
              }}
              value={deskContent}
            ></TextArea>
          </Wrapper>
          <SaveButton className="btn btn-primary" onClick={toggle}>
            Save
          </SaveButton>
          <DeleteButton className="btn btn-danger" onClick={toggleClear}>
            Clear
          </DeleteButton>
        </Layout>
      </DesktopWrapper>
      <Layout>
        <MobileWrapper>
          <MobileHeader>
            <MobileTitle>{mobileHelpfulHints[currentHintIndex]}</MobileTitle>
          </MobileHeader>
          <MobileBody>
            <MobileTextArea
              onChange={e => {
                setDeskContent(e.target.value)
                saveToLocalStorage(deskContent)
              }}
              value={deskContent}
            ></MobileTextArea>
          </MobileBody>
        </MobileWrapper>
      </Layout>
    </>
  )
}

export const query = graphql`
  query DeskQuery {
    contentfulDeskMotivation {
      data {
        data
      }
    }
  }
`

export default FriendlyDesk
