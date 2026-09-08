import "./Home.css";
import Hero from "../../components/hero/Hero"
import Features from "../features/Features"
function Home() {
  
  return (
    <div className="home">
      <Hero/>
      <Features/>
    </div>
  )
}

export default Home