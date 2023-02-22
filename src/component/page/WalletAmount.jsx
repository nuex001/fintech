import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../css/wallet-pin.css";
import { AiOutlineClear } from "react-icons/ai";
// import { FaSignOutAlt } from "react-icons/fa";
function WalletAmount({ setAccountDetails }) {
  const navigate = useNavigate();
  let { name, bankName, bankNo } = useParams();
  const inputRef = useRef();
  useEffect(() => {
    if (!name && !bankName && !bankNo) {
      navigate(-1);
    }
  }, []);

  //
  const onSubmit = (e) => {
    e.preventDefault();
    setAccountDetails({
      name,
      bankName,
      bankNo,
      amount: inputRef.current.value,
    });
    navigate("/verify");
  };

  //Add Inputs
  const addNo = (e) => {
    if (e.target.className === "box") {
      inputRef.current.value += e.target.innerHTML;
    }
  };

  //   clear input
  const clear = () => {
    inputRef.current.value = "";
  };

  return (
    <form className="walletContainer" onSubmit={onSubmit}>
      <h3>
        <span>Name:</span>
        {name}
      </h3>
      <h3>
        <span>Bank Account:</span>
        {bankName}
      </h3>
      <h3>
        <span>Bank Name:</span>
        {bankNo}
      </h3>
      <h1 style={{ marginTop: "20px" }}>Enter Amount</h1>
      <label htmlFor="number">
        <span>&#8358;</span>
        <input
          required
          type="number"
          id="number"
          inputMode="none"
          ref={inputRef}
          placeholder={0}
        />
      </label>

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
          <AiOutlineClear onClick={clear} />
        </div>
        <div className="box">0</div>
        <div className="box" id="prev"></div>
        <button style={{ marginTop: "0px" }}>Continue</button>
      </div>
    </form>
  );
}

export default WalletAmount;
/**
 *    // setAccountDetails
      setAccountDetails({
        name,
        bankName,
        acctNo,
        ammount: 0,
      });
 */
