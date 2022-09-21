import React from 'react';
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  if (store.getState().good === 0 && store.getState().ok === 0 && store.getState().bad === 0) {
    return (
      <div>
        <h1>Give feedback</h1>
        <button onClick={good}>good</button>
        <button onClick={ok}>ok</button>
        <button onClick={bad}>bad</button>
        <button onClick={zero}>reset stats</button>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
      return (
      <div>
        <h1>Give feedback</h1>
        <button onClick={good}>good</button>
        <button onClick={ok}>ok</button>
        <button onClick={bad}>bad</button>
        <button onClick={zero}>reset stats</button>
        <h1>Statistics</h1>
        <div>good {store.getState().good}</div>
        <div>ok {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
        <div>all {store.getState().good + store.getState().ok + store.getState().bad}</div>
        <div>average {((store.getState().good * 1) + (store.getState().ok * 0) + (store.getState().bad * (-1))) / (store.getState().good + store.getState().ok + store.getState().bad)}</div>
        <div>positive {`${store.getState().good / (store.getState().good + store.getState().ok + store.getState().bad) * 100.0} %`}</div>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
