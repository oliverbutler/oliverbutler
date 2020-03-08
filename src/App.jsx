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
            Say Hello{" "}
            <span role="img" aria-label="wave">
              👋
            </span>
          </button>
        </nav>
        <header className="App-header">
          <Title></Title>
          <h1 id="typewriter">
            <RotatingText
              items={[
                "Web Design",
                "Back-end Development",
                "React Native App Development"
              ]}
            />
          </h1>
        </header>
        <div className="content">
          <h1>Hi, I'm Oliver. It's nice to meet you.</h1>
          <p>I am an Undergraduate Student studying at Newcastle University</p>
        </div>
        <div className="content" id="skills">
          <div>
            <h1>Web Development</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
              obcaecati eos inventore, similique nostrum modi neque provident
              aut itaque? Incidunt nemo fugit quasi temporibus debitis numquam
              laboriosam, quae ipsam aut.
            </p>
          </div>
          <div>
            <h1>Server</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              ad accusamus praesentium aliquam cupiditate eos saepe suscipit
              error accusantium commodi enim ipsa, quae qui incidunt consectetur
              debitis? Rem, autem neque?
            </p>
          </div>
          <div>
            <h1>App Development</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero
              cupiditate tenetur eligendi numquam nemo voluptatibus, iure nobis
              voluptatem provident, excepturi eveniet dicta aspernatur ad! Quos
              aperiam voluptatem excepturi modi quibusdam.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
