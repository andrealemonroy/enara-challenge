import { useEffect, useState } from "react";
import { Tile } from "./components/Tile";
import Title from "./components/Title";
import Text from "./components/Text";
import Input from "./components/Input";
import Button from "./components/Button";
function App() {
  const [file, setFile] = useState(null);
  const [counter, setCounter] = useState(0);
  const [data, setData] = useState([]);
  const [word, setWord] = useState("");
  const [dictionary, setDictionary] = useState(
    window.localStorage.getItem("dictionary") || null
  );
  const [red, setRed] = useState(false);
  const [found, setFound] = useState(null);
  const validElements = [];
  const [selected, setSelected] = useState([])

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
        setData(...data, reorganize);
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
    setFile("test-board-1.json")
    setFile("test-board-2.json");
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
        i % 4 === 0 &&
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
          selected: false,
        });
      } else if (
        (i === 3 || i === 7 || i === 11 || i === 15) &&
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
          selected: false,
        });
      } else if (
        i % 4 !== 0 &&
        (i === 1 ||
          i === 2 ||
          i === 5 ||
          i === 6 ||
          i === 9 ||
          i === 10 ||
          i === 13 ||
          i === 14) &&
        (index === i ||
          index === i - 4 ||
          index === i + 4 ||
          index === i - 1 ||
          index === i + 1 ||
          index === i - 3 ||
          index === i + 3 ||
          index === i - 5 ||
          index === i + 5)
      ) {
        validElements.push({
          value: element.value,
          valid: true,
          selected: false,
        });
      } else {
        validElements.push({
          value: element.value,
          valid: false,
          selected: false,
        });
      }
    });
    selected.push(event.target.id)
    if (selected.length > 0) {
      selected.map((item) => {
        validElements[item].selected = true;
      });
    }

    setData(validElements);
    setWord(word + event.target.outerText);
  };

  const clear = () => {
    counter === 0 ? setCounter(1) : setCounter(0);
    setWord("");
    setFound(null);
    setSelected([])
    setData([])
  };

  return (
    <div className="flex flex-row flex-center h-screen xs-block container xs-pt-10 xs-h-full">
      <div className="wrapper">
        {data?.map((element, i) => (
          <Tile
            id={i}
            handleClick={(e) => handleClick(e, i)}
            text={element.value}
            disabled={!element.valid}
            selected={element.selected}
            found={found}
          />
        ))}
      </div>
      <div className="flex flex-col flex-align-end gap-96 xs-gap-0 ml-1 xs-m-0">
        <div
          onClick={clear}
          className="text-gray cursor-pointer xs-clear xs-absolute xs-mt-1"
        >
          clear word{" "}
          <span className="p-1 rounded-xl bg-gray text-white text-bold">X</span>
        </div>
        <div className="w-80 xs-w-full">
          <Input value={word} disabled valid={found} />
        </div>
      </div>
    </div>
  );
}

export default App;
