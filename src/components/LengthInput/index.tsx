import { ERROR } from "../../types";
import "./LengthInput.css";

type LengthInputProps = {
  length: number;
  setLength: (length: number) => void;
  isFirst: boolean;
  error: ERROR;
};

const LengthInput: React.FC<LengthInputProps> = ({
  length,
  setLength,
  isFirst,
  error,
}) => {
  return (
    <div className="number-input">
      <label>Length</label>
      <input
        className={`length-input${
          error.message !== "" && !isFirst ? " length-input-error" : ""
        }`}
        maxLength={3}
        placeholder="123"
        value={Number.isNaN(length) ? 0 : length}
        onChange={(e) => {
          setLength(parseInt(e.target.value, 10));
        }}
      />
    </div>
  );
};

export default LengthInput;
