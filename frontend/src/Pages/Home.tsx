import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button"

const Home = () => {

    const navigate = useNavigate();

  return (
  <div>
      <div>Home</div>
      <div className="my-4">
        <Button text={"go to signup"} variant="primary" onClick={() => navigate("/signup")}/>
      </div>
      <div>
        <Button text={"go to dashboard"} variant="primary" onClick={() => navigate("/dashboard")}/>
      </div>
  </div>
  )
}

export default Home