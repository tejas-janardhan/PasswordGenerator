import { useMemo, useState } from "react";
import {
  defaultConfig,
  passwordGeneratorFactory,
  PASSWORD,
  CONFIG,
} from "./passwordGenerator";
import "./App.css";

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
          <div className="checkbox-wrapper-24">
            <input
              type="checkbox"
              className="checkbox"
              id="number-checkbox"
              checked={config.isNumbersAllowed}
              onChange={(e) => {
                setConfig({
                  ...config,
                  isNumbersAllowed: !config.isNumbersAllowed,
                });
              }}
            />
            <label className="checkbox" htmlFor="number-checkbox">
              <span></span>Allow Numbers
            </label>
          </div>
          <div className="checkbox-wrapper-24">
            <input
              type="checkbox"
              className="checkbox"
              id="caps-checkbox"
              checked={config.isCapsAllowed}
              onChange={(e) => {
                setConfig({ ...config, isCapsAllowed: !config.isCapsAllowed });
              }}
            />
            <label className="checkbox" htmlFor="caps-checkbox">
              <span></span>Allow Caps
            </label>
          </div>
          <div className="checkbox-wrapper-24">
            <input
              type="checkbox"
              className="checkbox"
              id="special-checkbox"
              checked={config.isSpecialAllowed}
              onChange={(e) => {
                setConfig({
                  ...config,
                  isSpecialAllowed: !config.isSpecialAllowed,
                });
              }}
            />
            <label className="checkbox" htmlFor="special-checkbox">
              <span></span>Allow Special Characters
            </label>
          </div>
        </div>
        <div className="number-input">
          <label>Enter Length</label>
          <input
            className={`length-input${
              error.message !== "" ? " length-input-error" : ""
            }`}
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
