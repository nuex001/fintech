import React, { useState, useEffect, useRef } from "react";
import "../../css/wallet-pin.css";
import { AiOutlineClear } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function WalletPin({ accountDetails, setSuccess }) {
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const [displayInput, setDisplayInputs] = useState([0, 1, 2, 3, 4]);
  const { name, bankName, bankNo, amount } = accountDetails;
  let focused = document.activeElement;
  //clear inputs
  const clearInputs = (e) => {
    focused.value = "";
  };

  //Assing Focused
  useEffect(() => {
    inputRef.current[0].focus();
    focused = inputRef.current[0];
    // checking if accountDetails is assigned
    if (name == "" && bankName == "" && bankNo == "" && amount == null) {
      navigate(-1);
    }
  }, []);

  // WORKING FOR NEXT ELEMENT FOCUS
  const onKeyDown = (idx) => (e) => {
    e.target.value = "";
    if (e.key >= 0 && e.key <= 9) {
      if (e.target.getAttribute("data-index") != 4) {
        setTimeout(() => {
          inputRef.current[idx + 1].focus();
          focused = document.activeElement;
        }, 10);
      }
    }
  };

  // WORKING FOR ONCLICK EVENT
  const onClick = (idx) => (e) => {
    inputRef.current[idx].focus();
    focused = inputRef.current[idx];
  };

  // ADDING NUMBER
  const addNo = (e) => {
    // console.log(focused.tagName);
    if (e.target.className === "box") {
      if (focused.tagName === "INPUT") {
        focused.value = "";
        focused.value = e.target.innerHTML;
        if (focused.getAttribute("data-index") != 4) {
          setTimeout(() => {
            focused.nextElementSibling.focus();
            focused = document.activeElement;
          }, 10);
        }
      }
    }
  };

  // PREV
  const prev = () => {
    console.log(focused);
    if (focused.getAttribute("data-index") != 0) {
      focused.previousElementSibling.focus();
      focused = focused.previousElementSibling;
    } else {
      inputRef.current[4].focus();
      focused = inputRef.current[4];
    }
  };

  //ONSUBMIT FUNCTION
  const onSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    navigate("/success");
  };

  return (
    <form className="walletContainer" onSubmit={onSubmit}>
      <h1>Enter Wallet Pin</h1>
      <h1>Amount: &#8358;{amount}</h1>
      <h2>Verify your pin to approve transaction</h2>

      <div className="display">
        {displayInput.map((key) => (
          <input
            key={key}
            data-index={key}
            type="number"
            className="code first"
            min="0"
            max="9"
            placeholder="0"
            inputMode="none"
            required
            onKeyDown={onKeyDown(key)}
            onClick={onClick(key)}
            ref={(el) => (inputRef.current[key] = el)}
          />
        ))}
      </div>

      <div className="child" onClick={addNo}>
        <div className="box">1</div>
        <div className="box">2</div>
        <div className="box">3</div>
        <div className="box">4</div>
        <div className="box">5</div>
        <div className="box">6</div>
        <div className="box">7</div>
        <div className="box">8</div>
        <div className="box">9</div>
        <div className="box" id="clear">
          <AiOutlineClear onClick={clearInputs} />
        </div>
        <div className="box">0</div>
        <div className="box" id="prev" style={{ transform: "rotate(180deg)" }}>
          <FaSignOutAlt onClick={prev} />
        </div>
        <button>PAY</button>
      </div>
    </form>
  );
}

export default WalletPin;
