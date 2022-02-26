import { useEffect, useState } from "react";
import { Tile } from "./components/Tile";
import Title from "./components/Title";
import Image from "./components/Image";
import Text from "./components/Text";
import Input from "./components/Input";
import EnaraLogo from "./assets/images/enara-log-web.png";
import Button from "./components/Button";
function App() {
  const [file, setFile] = useState(null);
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [word, setWord] = useState("");
  const [valid, setValid] = useState([]);
  const [dictionary, setDictionary] = useState(
    window.localStorage.getItem("dictionary") || null
  );
  const [found, setFound] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const validElements = [];
  const getLetters = (file) => {
    fetch(file)
      .then(function (res) {
        return res.json();
      })
      .then((res) => {
        const reorganize = res.board.map((element) => {
          return {
            value: element,
            valid: true,
          };
        });
        console.log(reorganize)
        setData(reorganize);
      });
  };

  useEffect(() => {
    fetch("dictionary.json")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        window.localStorage.setItem("dictionary", res.words);
        setDictionary(res.words);
      });
  }, []);

  useEffect(() => {
    counter === 0 ? setFile("test-board-1.json") : setFile("test-board-2.json");
    getLetters(file);
  }, [counter, file]);

  useEffect(() => {
    if (word.length > 0) {
      const same = dictionary?.filter(
        (item) => item === word.toLocaleLowerCase()
      );
      if (same.length > 0) {
        setFound(true);
      } else {
        setFound(false);
      }
    }
  }, [word, dictionary]);

  const handleClick = (event, i) => {
    data.map((element, index) => {
      if (
        (i % 4 === 0) &
        (index === i ||
          index === i - 4 ||
          index === i + 4 ||
          index === i + 1 ||
          index === i + 5 ||
          index === i - 3)
      ) {
        validElements.push({
          value: element.value,
          valid: true,
        });
      } else if (
        (i === 3 || i === 7 || i === 11 || i === 15) &
        (index === i ||
          index === i - 4 ||
          index === i + 4 ||
          index === i - 1 ||
          index === i + 3 ||
          index === i - 5)
      ) {
        validElements.push({
          value: element.value,
          valid: true,
        });
      } else if (
        (i % 4 !== 0) &
        (i !== 3 || i !== 7 || i !== 11 || i !== 15) &
        (index === i ||
          index === i - 4 ||
          index === i + 4 ||
          index === i - 1 ||
          index === i + 1 ||
          index === i + 3 ||
          index === i - 3 ||
          index === i - 5 ||
          index === i + 5)
      ) {
        validElements.push({
          value: element.value,
          valid: true,
        });
      } else {
        validElements.push({
          value: element.value,
          valid: false,
        });
      }
    });
    console.log(validElements)
    setData(validElements);
    setWord(word + event.target.outerText);
  };

  const clear = () => {
    counter === 0 ? setCounter(1) : setCounter(0);
    setWord("");
  };

  return (
    <div className="flex flex-col flex-center">
      <Title text="Bienvenido a la sala de espera de Enara" />
      <Text text="Mientras tanto... ¿adivinarías las palabras ocultas?" />
      <Button text="Volver a empezar" onClick={clear} />
      <div className="wrapper">
        {data?.map((element, i) => (
          <Tile
            index={i}
            handleClick={(e) => handleClick(e, i)}
            text={element.value}
            disabled={element.valid}
          />
        ))}
      </div>
      <div className="w-72">
        <Input value={word} disabled />
      </div>
      <div className="w-72">
        {found ? (
          <Text text="¡Acertaste! Ganaste 10% de descuento en una consulta médica " />
        ) : word.length > 0 ? (
          <Text text="Aún no aciertas" />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
