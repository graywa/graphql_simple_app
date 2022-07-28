import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import './App.css'
import { CREATE_USER } from './mutation/user'
import { GET_ALL_USERS, GET_ONE_USER } from './query/user'

function App() {
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [salary, setSalary] = useState(0)

  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const { data: userData, loading: loadingUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 2
    }
  })
  const [newUser] = useMutation(CREATE_USER)

  console.log(userData)

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  const getAll = () => {
    refetch()
  }

  const addUser = () => {
    newUser({
      variables: {
        input: {
          name, salary
        }
      }
    }).then(data => {
      setName('')
      setSalary(0)
    })    
  }

  if (loading) return <h3>Loading...</h3>

  if (error) return <h3>Error...</h3>

  return (
    <div className='app'>
      <form>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='number'
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value))}
        />
        <button onClick={addUser} type='button'>Create</button>
        <button onClick={getAll} type='button'>Get</button>
      </form>
      {users.map((user) => (
        <div key={user.id} className='user'>
          {user.id.slice(-3)}. {user.name} {user.salary}
        </div>
      ))}
    </div>
  )
}

export default App
