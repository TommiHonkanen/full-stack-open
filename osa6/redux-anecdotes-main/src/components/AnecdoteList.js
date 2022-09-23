
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
        <div>{anecdote.content}</div>
        {anecdote.votes} votes
        <button onClick={handleClick}>vote</button>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    return (
        <div>
            {anecdotes.map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => {
                dispatch(vote(anecdote.id))
                dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
            }} />
            )}
        </div>
    )
}

export default AnecdoteList