// import React from "react";

// function Home() {
//   const redirectToCrash = () => {
//     window.location.href = "/crash";
//   };

//   const redirectToRaffle = () => {
//     window.location.href = "/raffle";
//   };

//   const redirectRoulette = () => {
//     window.location.href = "/roulette";
//   };

//   return (
//     <div>
//       <div className="pagesGame">
//         <div className="poza1" onClick={redirectToCrash}></div>
//         <div className="poza2" onClick={redirectRoulette}></div>
//         <div className="poza3" onClick={redirectToRaffle}></div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import { Link } from "react-router-dom";

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
