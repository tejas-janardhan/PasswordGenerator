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

function App() {
  const [config, setConfig] = useState<CONFIG>(defaultConfig);
  const [length, setLength] = useState<number>(0);
  const generatePassword = useMemo(
    () => passwordGeneratorFactory(config),
    [config]
  );
  const [password, error] = useMemo<[PASSWORD, ERROR]>(() => {
    if (length > 0 && length < 129) {
      return [generatePassword(length), { message: "" }];
    }
    if (length < 0) {
      return [emptyPassword, { message: "Enter number greater than zero" }];
    }
    return [emptyPassword, { message: "Enter number less than 129" }];
  }, [generatePassword, length]);

  const color = useMemo(() => {
    if (password.strength === "low") {
      return "red";
    } else if (password.strength === "medium") {
      return "yellow";
    }
    return "green";
  }, [password]);

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
        <div>
          <input
            type="number"
            placeholder="Enter Length"
            onChange={(e) => {
              setLength(parseInt(e.target.value, 10));
            }}
          />
          <label>Enter Password Length</label>
        </div>
        <div style={{ color }}>{password.password}</div>
        <div>{password.password !== "" ? password.strength : ""}</div>
      </div>
    </div>
  );
}

export default App;
