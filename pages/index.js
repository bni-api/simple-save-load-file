import { useState } from "react";

const App = () => {
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [customers, setCustomers] = useState([])

  const loadData = async () => {
    const response = await fetch("/api/read")

    if (!response.ok) alert("Failed to load data")
    else setCustomers(await response.json())
  }

  const addData = e => {
    e.preventDefault()

    setCustomers(previousData => [...previousData, {
      name, age
    }])

    setName("")
    setAge(0)

  }

  const saveData = async e => {
    e.preventDefault()

    const response = await fetch("/api/save", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(customers)
    })

    if (!response.ok) alert("Error saving")
    else alert("Customer data has been saved successfully")

  }

  useState(() => {
    loadData()
  }, [])

  return (<>
    <form
      style={{
        padding: 10
      }}
    >
      <input type="text" value={name} placeholder="name" onChange={e => setName(e.target.value)} style={{ margin: 10 }} />
      <br />
      <input type="text" value={age} placeholder="age" onChange={e => setAge(e.target.value)} style={{ margin: 10 }} />
      <br />
      <button type="submit" onClick={addData} style={{ margin: 10 }}>Add customer</button>
      <br />
      <button type="button" onClick={saveData} style={{ margin: 10 }}>Save</button>
    </form>

    <ul style={{ margin: 30 }}>
      {
        customers.map((customer, index) => {
          return (
            <li key={index}>{customer.name} | {customer.age}</li>
          )
        })
      }
    </ul>

  </>);
}

export default App;