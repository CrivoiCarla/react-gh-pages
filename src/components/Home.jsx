


import { Link } from "react-router-dom";

import '../css/Index.css';


function Home() {
  return (
    <div>
      <div className="pagesGame">
        <Link to="/crash" className="poza1"></Link>
        <Link to="/roulette" className="poza2"></Link>
        <Link to="/raffle" className="poza3"></Link>
      </div>
    </div>
  );
}

export default Home;
