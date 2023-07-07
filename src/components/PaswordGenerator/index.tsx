import { useMemo, useState } from "react";
import {
  defaultConfig,
  passwordGeneratorFactory,
  PASSWORD,
  CONFIG,
} from "../../passwordGenerator";
import { ERROR } from "../../types";
import Checkbox from "../Checkbox";

import LengthInput from "../LengthInput";
import PasswordDisplay from "../PasswordDisplay";
import "./PasswordGenerator.css";

const EMPTY_PASSWORD: PASSWORD = {
  password: "",
  strength: "low",
};

export const PasswordGenerator: React.FC = () => {
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
      return [EMPTY_PASSWORD, { message: "Enter a number" }];
    }
    if (length < 0) {
      if (isFirst) setIsFirst(false);
      return [EMPTY_PASSWORD, { message: "Enter number greater than zero" }];
    }
    return [EMPTY_PASSWORD, { message: "Enter number less than 128" }];
  }, [generatePassword, isFirst, length]);
  return (
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
      <LengthInput
        length={length}
        setLength={setLength}
        isFirst={isFirst}
        error={error}
      />
      <PasswordDisplay
        password={password}
        error={error}
        isFirst={isFirst}
        copyPressed={copyPressed}
        setCopyPressed={setCopyPressed}
      />
    </div>
  );
};

export default PasswordGenerator;
