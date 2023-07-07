import { PASSWORD } from "../../passwordGenerator";
import { ERROR } from "../../types";
import { useEffect } from "react";
import { TbCopy, TbCopyOff } from "react-icons/tb";
import "./PasswordDisplay.css";

const isNotError = (password: PASSWORD) => password.password !== "";

type PasswordDisplayProps = {
  password: PASSWORD;
  error: ERROR;
  isFirst: boolean;
  copyPressed: boolean;
  setCopyPressed: (copyPressed: boolean) => void;
};

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({
  password,
  error,
  isFirst,
  copyPressed,
  setCopyPressed,
}) => {
  const copyHandler = async () => {
    await navigator.clipboard.writeText(password.password);
    setCopyPressed(true);
  };
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

  return (
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
      <div style={{ fontSize: "5px" }}>
        {isNotError(password) ? `Strength - ${password.strength}` : ""}
      </div>
    </div>
  );
};

export default PasswordDisplay;
