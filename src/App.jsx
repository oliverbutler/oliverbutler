import React from "react";
import Title from "./components/Title";
import RotatingText from "react-rotating-text";

import "./App.scss";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <nav className="App-nav">
          <h1>OB</h1>
          <button>
            Say Hello <span role="img">👋</span>
          </button>
        </nav>
        <header className="App-header">
          <Title></Title>
          <h1>
            <RotatingText
              items={[
                "Web Design",
                "Back-end Development",
                "React Native App Development"
              ]}
            />
          </h1>
        </header>
        <div className="intro">
          <h1>Hi, I'm Oliver. It's nice to meet you.</h1>
          <p>I am an Undergraduate Student studying at Newcastle University</p>
        </div>
      </div>
    );
  }
}

export default App;
