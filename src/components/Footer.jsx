import React from "react";
import "../css/Lottery.css";
function FooterComponent() {
    return (
        <div className="footer">
            <div className="bubbles">
                {Array.from({ length: 230 }).map((_, i) => (
                    <div
                        className="bubble"
                        style={{
                            "--size": `${2 + Math.random() * 4}rem`,
                            "--distance": `${6 + Math.random() * 4}rem`,
                            "--position": `${-5 + Math.random() * 110}%`,
                            "--time": `${2 + Math.random() * 2}s`,
                            "--delay": `${-1 * (2 + Math.random() * 2)}s`,
                        }}
                        key={i}
                    ></div>
                ))}
            </div>
            <svg style={{position: "fixed", top: "100vh"}}>
                <defs>
                    <filter id="blob">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"/>
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob"/>
                    </filter>
                </defs>
            </svg>
        </div>
    );
}

const Footer = React.memo(FooterComponent);
  
export default Footer;
