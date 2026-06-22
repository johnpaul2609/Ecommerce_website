import { useState } from "react"

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const loginUser = () => {

    const formData = new FormData()

    formData.append("username", email)
    formData.append("password", password)

    fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {

  console.log(data)

  if (data.access_token) {

    localStorage.setItem(
      "token",
      data.access_token
    )

    setIsLoggedIn(true)

    alert("Login Successful")

  } else {

    alert(data.message)

  }

})
  }

 return (
  <div>

    {!isLoggedIn ? (

      <div>

        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button onClick={loginUser}>
          Login
        </button>

      </div>

    ) : (

      <div>
        <h1>Welcome to Ecommerce Store</h1>

        <h2>Login Successful ✅</h2>
      </div>

    )}

  </div>
)
}
export default App