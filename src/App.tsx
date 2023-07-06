import { useEffect, useMemo, useState } from "react";
import {
  defaultConfig,
  passwordGeneratorFactory,
  PASSWORD,
  CONFIG,
} from "./passwordGenerator";
import "./App.css";
import Checkbox from "./components/Checkbox";
import { TbCopy, TbCopyOff } from "react-icons/tb";

type ERROR = {
  message: string;
};

const emptyPassword: PASSWORD = {
  password: "",
  strength: "low",
};

const isNotError = (password: PASSWORD) => password.password !== "";

function App() {
  const [config, setConfig] = useState<CONFIG>(defaultConfig);
  const [length, setLength] = useState<number>(0);
  const generatePassword = useMemo(
    () => passwordGeneratorFactory(config),
    [config]
  );
  const [isFirst, setIsFirst] = useState(true);
  const [copyPressed, setCopyPressed] = useState(false);
  const [password, error] = useMemo<[PASSWORD, ERROR]>(() => {
    if (length > 0 && length < 128) {
      if (isFirst) setIsFirst(false);
      setCopyPressed(false);
      return [generatePassword(length), { message: "" }];
    }
    if (Number.isNaN(length)) {
      if (isFirst) setIsFirst(false);
      return [emptyPassword, { message: "Enter a number" }];
    }
    if (length < 0) {
      if (isFirst) setIsFirst(false);
      return [emptyPassword, { message: "Enter number greater than zero" }];
    }
    return [emptyPassword, { message: "Enter number less than 128" }];
  }, [generatePassword, isFirst, length]);

  useEffect(() => {
    if (copyPressed) {
      const timeout = setTimeout(() => {
        setCopyPressed(false);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copyPressed]);

  const copyHandler = async () => {
    await navigator.clipboard.writeText(password.password);
    setCopyPressed(true);
  };

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
          <label>Length</label>
          <input
            className={`length-input${
              error.message !== "" && !isFirst ? " length-input-error" : ""
            }`}
            maxLength={3}
            placeholder="123"
            onChange={(e) => {
              setLength(parseInt(e.target.value, 10));
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
            marginBottom: "20px",
            height: "fit-content",
          }}
        >
          <div
            style={{
              width: "fit-content",
              maxWidth: "60%",
              wordWrap: "break-word",
            }}
            className={isFirst ? "message" : password.strength}
          >
            {isNotError(password)
              ? password.password
              : isFirst
              ? "Enter a length to get started."
              : error.message}
          </div>
          <div style={{ marginLeft: "5px", fontSize: "25px" }}>
            {isNotError(password) ? (
              <TbCopy
                className={`${copyPressed ? "copy-pressed" : "clickable"}`}
                onClick={() => {
                  if (!copyPressed) copyHandler();
                }}
              />
            ) : (
              <TbCopyOff />
            )}
          </div>
        </div>

        <div style={{ fontSize: "5px" }}>
          {isNotError(password) ? `Strength - ${password.strength}` : ""}
        </div>
      </div>
    </div>
  );
}

export default App;
