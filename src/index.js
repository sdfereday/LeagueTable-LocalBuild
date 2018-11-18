import React from "react";
import ReactDOM from "react-dom";
import App from "./modules/App";
import jsonStub from "./jsonStub";

import "./styles.scss";

/* We assume we've already imported some form of raw data here, you'll more
than likely grab these from an API somewhere. */
const rootElement = document.getElementById("app");
ReactDOM.render(<App inputData={jsonStub} />, rootElement);
