import { useMemo, useState } from "react";
import {
  defaultConfig,
  passwordGeneratorFactory,
  PASSWORD,
  CONFIG,
} from "./passwordGenerator";
import "./App.css";
import Checkbox from "./components/Checkbox";

type ERROR = {
  message: string;
};

const emptyPassword: PASSWORD = {
  password: "",
  strength: "low",
};

const isError = (password: PASSWORD) => password.password !== "";

function App() {
  const [config, setConfig] = useState<CONFIG>(defaultConfig);
  const [length, setLength] = useState<number>(0);
  const generatePassword = useMemo(
    () => passwordGeneratorFactory(config),
    [config]
  );
  const [password, error] = useMemo<[PASSWORD, ERROR]>(() => {
    if (length > 0 && length < 128) {
      return [generatePassword(length), { message: "" }];
    }
    if (Number.isNaN(length)) {
      return [emptyPassword, { message: "Enter a number" }];
    }
    if (length < 0) {
      return [emptyPassword, { message: "Enter number greater than zero" }];
    }
    return [emptyPassword, { message: "Enter number less than 128" }];
  }, [generatePassword, length]);

  // Add Error Message

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E8E8E8",
      }}
    >
      <div className="card">
        <p className="heading">Password Generator</p>
        <div>
          <Checkbox
            id="number-checkbox"
            text="Allow Numbers"
            checked={config.isNumbersAllowed}
            toggleChecked={() =>
              setConfig({
                ...config,
                isNumbersAllowed: !config.isNumbersAllowed,
              })
            }
          />
          <Checkbox
            id="caps-checkbox"
            text="Allow Caps"
            checked={config.isCapsAllowed}
            toggleChecked={() =>
              setConfig({
                ...config,
                isCapsAllowed: !config.isCapsAllowed,
              })
            }
          />
          <Checkbox
            id="special-checkbox"
            text="Allow Special Characters"
            checked={config.isSpecialAllowed}
            toggleChecked={() =>
              setConfig({
                ...config,
                isSpecialAllowed: !config.isSpecialAllowed,
              })
            }
          />
        </div>
        <div className="number-input">
          <label>Enter Length</label>
          <input
            className={`length-input${
              error.message !== "" ? " length-input-error" : ""
            }`}
            maxLength={3}
            placeholder="123"
            onChange={(e) => {
              setLength(parseInt(e.target.value, 10));
            }}
          />
        </div>
        <div className={password.strength}>
          {isError(password) ? password.password : error.message}
        </div>
        <div>{isError(password) ? password.strength : ""}</div>
      </div>
    </div>
  );
}

export default App;
