import { useState } from "react";

function App() {
  const [value, setValue] = useState<number>(1);

  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => setValue(value + 1)}>Click</button>
    </div>
  );
}

export default App;
