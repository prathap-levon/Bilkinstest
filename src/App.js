import "./App.css";
import 'animate.css';

import ScrollToTopButton from "./Components/ScrollTop/ScrollToTopButton";
import AppRoutes from "./Router";
import Tawk from "./Components/Tawk/Tawk";

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <ScrollToTopButton />
      {/* <Tawk /> */}
    </div>
  );
}

export default App;
