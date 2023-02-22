import React, { useEffect } from "react";
import "../../css/wallet-success.css";
import { AiFillCheckCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function WalletSucess({ setSuccess, success }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!success) {
      navigate("/");
    }
  }, []);

  return (
    <div class="successcontainer">
      <AiFillCheckCircle className="icon" />
      <h2>Payment Complete</h2>
      <p>
        Click on the button below to download app,
        <br /> add money and continue making payments
      </p>
      <div class="links">
        <a href="#">
          <img src="/app store.svg" alt="" />
        </a>
        <a href="#">
          <img src="/app store.svg" alt="" />
        </a>
      </div>
    </div>
  );
}

export default WalletSucess;
