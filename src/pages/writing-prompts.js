import React, { Fragment, useState } from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

import {
  allBooks,
  allMovies,
  allCharacters,
  allEvents,
  allPlaceSpecifiers,
  allPlaces,
} from "../utils/writingPromptsData"

const WritingPrompts = () => {
  const [prompt, setPrompt] = useState("")

  const displayPrompt = prompt => setPrompt(prompt)

  const getRandomSelection = array =>
    array[Math.round(Math.random() * array.length)]

  const generateXY = () =>
    `${getRandomSelection(allBooks)} meets ${getRandomSelection(allMovies)}`

  const generateXYZ = () =>
    `${getRandomSelection(allCharacters)} ${getRandomSelection(
      allEvents
    )} ${getRandomSelection(allPlaceSpecifiers)} ${getRandomSelection(
      allPlaces
    )}`

  const generatePrompt = () => {
    const chooseTemplate = Math.round(Math.random())
    if (chooseTemplate === 0) {
      displayPrompt(generateXY())
    } else if (chooseTemplate === 1) {
      displayPrompt(generateXYZ())
    }
  }

  return (
    <Layout>
      <header className="heading">
        <h1 className="title">Writing Prompts</h1>
        <p className="lead">Over 6 million different ideas!</p>
      </header>
      <div className="prompts">
        <div className="pompts__text">
          {prompt ? (
            <p>{prompt}</p>
          ) : (
            <Fragment>
              <span>?</span>
              <span>?</span>
              <span>?</span>
            </Fragment>
          )}
        </div>
      </div>
      <div className="actions">
        {prompt && (
          <Link className="friendlyDeskLink" to="/the-friendly-desk">
            Go Write It At The Friendly Desk
          </Link>
        )}
        <button className="generate" onClick={generatePrompt}>
          Tell Me What To Write
        </button>
      </div>
    </Layout>
  )
}

export default WritingPrompts
