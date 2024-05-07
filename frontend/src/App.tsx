import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState<number>(1);

  const [name, setName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setName(result.name);
      });
  }, []);

  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => setValue(value + 1)}>Click</button>

      <h4>{name}</h4>
    </div>
  );
}

export default App;
