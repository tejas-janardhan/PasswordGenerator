import PasswordGenerator from "./components/PaswordGenerator";

function App() {
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
      <PasswordGenerator />
    </div>
  );
}

export default App;
