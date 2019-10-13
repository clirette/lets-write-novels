import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import chalkboard from "../images/chalkboard.jpeg"
import styled from "styled-components"
import devices from "../utils/devices"

const generatePrompt = (setPrompt, data) =>
  Math.round(Math.random()) === 0
    ? displayPrompt(generateXY(data), setPrompt)
    : displayPrompt(generateXYZ(data), setPrompt)

const displayPrompt = (prompt, setPrompt) => setPrompt(prompt)

const generateXY = ({ allBooks, allMovies }) => ({
  x: getRandomSelection(allBooks),
  y: getRandomSelection(allMovies),
})

const generateXYZ = ({
  allCharacters,
  allEvents,
  allPlaceSpecifiers,
  allPlaces,
}) => ({
  x: getRandomSelection(allCharacters),
  y: getRandomSelection(allEvents),
  z: `${getRandomSelection(allPlaceSpecifiers)} ${getRandomSelection(
    allPlaces
  )}`,
})

const getRandomSelection = array =>
  array[Math.round(Math.random() * (array.length - 1))]

const formatPrompt = prompt => {
  const isTwoPrompt = Object.keys(prompt).length === 2
  if (isTwoPrompt) {
    return (
      <QuestionBlockContainer>
        <QuestionBlock color="#3fc6ee">{prompt.x}</QuestionBlock>
        <QuestionBlock color="#ff4d7d"> meets </QuestionBlock>
        <QuestionBlock color="#ffde59">{prompt.y}</QuestionBlock>
      </QuestionBlockContainer>
    )
  } else {
    return (
      <QuestionBlockContainer>
        <QuestionBlock color="#3fc6ee">{prompt.x}</QuestionBlock>
        <QuestionBlock color="#ff4d7d">{prompt.y}</QuestionBlock>
        <QuestionBlock color="#ffde59">{prompt.z}</QuestionBlock>
      </QuestionBlockContainer>
    )
  }
}

const PromptsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: white;
  text-align: center;

  @media ${devices.mobileL} {
    padding-top: 5rem;
    padding-bottom: 10rem;
  }
`

const HeadingTitle = styled.h1`
  font-size: 6.5rem;
  font-family: serif;
  font-style: italic;
  letter-spacing: 0.2rem;
  margin-bottom: 3rem;

  @media ${devices.mobileL} {
    margin-bottom: 1rem;
  }
`

const HeadingSubtitle = styled.h3`
  font-size: 2.5rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  letter-spacing: 0.2rem;
  color: #dfdfdf;
`

const QuestionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60%;
  margin: auto;
`

const QuestionBlockContainer = styled.div`
  display: flex;
  justify-content: space-around;
  min-height: 20.5rem;
`

const Question = styled.span`
  color: ${props => props.color};
  font-size: 8rem;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
`

const QuestionBlock = styled.p`
  color: ${props => props.color};
  font-size: 5rem;
  font-weight: 700;
  font-family: "Montserrat", sans-serif;
  width: 33%;
  margin: auto;

  @media ${devices.mobileL} {
    word-break: break-word;
    font-size: 2.5rem;
  }
`

const GenerateButton = styled.div`
  font-style: italic;
  background-color: #3da488;
  width: 25%;
  margin: 2rem auto;
  padding: 1.6rem;
  font-size: 2rem;
  font-weight: 700;
  clip-path: polygon(0% 0%, 100% 0%, 95% 50%, 100% 100%, 0% 100%, 5% 50%);
  text-align: center;
  cursor: pointer;

  @media ${devices.mobileL} {
    width: 90%;
    margin: 0.5rem auto;
  }
`

const DeskLink = styled(Link)`
  background-color: #504a6e;
  color: white;
  line-height: 4.5rem;
  padding: 1rem;
  text-decoration: none;
  font-weight: 700;
`

const WritingPrompts = ({
  data: {
    contentfulWritingPrompts: {
      data: { data },
    },
  },
}) => {
  const [prompt, setPrompt] = useState({})

  return (
    <Layout backgroundImage={chalkboard}>
      <PromptsContainer>
        <header className="heading">
          <HeadingTitle>Writing Prompts</HeadingTitle>
          <HeadingSubtitle>Over 6 million different ideas!</HeadingSubtitle>
        </header>
        <div className="prompts">
          {Object.keys(prompt).length > 0 ? (
            formatPrompt(prompt)
          ) : (
            <QuestionContainer>
              <Question color="#3fc6ee">?</Question>
              <Question color="#ff4d7d">?</Question>
              <Question color="#ffde59">?</Question>
            </QuestionContainer>
          )}
        </div>
        <div className="actions">
          {prompt && (
            <DeskLink to="/the-friendly-desk">
              Go Write It At The Friendly Desk
            </DeskLink>
          )}
          <GenerateButton
            className="generate"
            onClick={() => generatePrompt(setPrompt, data)}
          >
            Tell Me What To Write
          </GenerateButton>
        </div>
      </PromptsContainer>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    contentfulWritingPrompts(name: { eq: "Writing Prompts" }) {
      data {
        data {
          allBooks
          allCharacters
          allEvents
          allMovies
          allPlaceSpecifiers
          allPlaces
        }
      }
    }
  }
`

export default WritingPrompts
