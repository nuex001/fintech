import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./component/page/Home";
import WalletAmount from "./component/page/WalletAmount";
import WalletPin from "./component/page/WalletPin";
import WalletSucess from "./component/page/WalletSucess";

function App() {
  const [accountDetails, setAccountDetails] = useState({
    name: "",
    bankName: "",
    bankNo: "",
    amount: null,
  });
  const [success, setSuccess] = useState(false);
  // useEffect(() => {
  //   console.log(accountDetails);
  // }, [setAccountDetails]);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/:name/:bankName/:bankNo"
            element={<WalletAmount setAccountDetails={setAccountDetails} />}
          />
          <Route
            exact
            path="/verify"
            element={
              <WalletPin
                accountDetails={accountDetails}
                setSuccess={setSuccess}
              />
            }
          />
          <Route
            exact
            path="/success"
            element={
              <WalletSucess accountDetails={accountDetails} success={success} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
