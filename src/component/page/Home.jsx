import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiFillCloseCircle, AiFillPrinter } from "react-icons/ai";
import QRCode from "qrcode";

function Home({ setAccountDetails }) {
  const overlay = useRef();
  const location = useLocation();
  const [imageUrl, serImageUrl] = useState("");
  const [formVal, setFormVal] = useState({
    name: "",
    bankName: "",
    acctNo: "",
  });

  //  GENERATE QRCODE
  const generateQrCode = async (name, bankName, acctNo) => {
    try {
      const host = window.location.hostname; //get host name
      const response = await QRCode.toDataURL(
        `https://${host}:5173/${name}/${bankName}/${acctNo}`
      );
      serImageUrl(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // RUN USEFFECT
  useEffect(() => {
    const data = localStorage.qrGenerator;
    if (data) {
      //check if user has already inputted his details
      setFormVal(JSON.parse(data));
    }
  }, []);

  //   WORKING ON FORM INPUT
  const onChange = (e) => {
    setFormVal({ ...formVal, [e.target.name]: e.target.value }); //UPDATING MY STATE
  };

  // ONSUBMIT
  const onSubmit = (e) => {
    e.preventDefault(); //PREVENT THE ORM FROM SUBMITTING
    const { name, bankName, acctNo } = formVal;
    if (name !== "" && bankName !== "" && acctNo != "") {
      generateQrCode(name, bankName, acctNo);
      //   Working with Local Storage
      localStorage.setItem(
        "qrGenerator",
        JSON.stringify({ name, bankName, acctNo })
      );
    }
  };

  //print function
  const printOut = () => {
    window.print();
  };

  //
  const switchDisplay = () => {
    overlay.current.classList.toggle("active");
  };

  return (
    <>
      <div className="overlay" ref={overlay}>
        <AiFillPrinter className="icon left" onClick={printOut} />
        <AiFillCloseCircle className="icon right" onClick={switchDisplay} />
        <div className="display">
          <img src={imageUrl} alt="" />
        </div>
      </div>
      <form className="form1" onSubmit={onSubmit}>
        <img
          src={imageUrl ? imageUrl : "/vite.svg"}
          alt=""
          className="logo"
          onClick={imageUrl ? switchDisplay : null}
        />
        <h1>Sign Up</h1>
        <p>
          We need an email an email for notification and password for login
          purpose
        </p>
        <div className="row">
          <label htmlFor="name">Account Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formVal.name}
            onChange={onChange}
          />
        </div>
        <div className="row">
          <label htmlFor="bankName">Account Bank</label>
          <input
            type="text"
            name="bankName"
            id="bankName"
            value={formVal.bankName}
            onChange={onChange}
          />
        </div>
        <div className="row">
          <label htmlFor="acctNo">
            Set a Account Number{" "}
            <span>
              <span>*</span>Min 8 characters
            </span>
          </label>
          <input
            type="tel"
            name="acctNo"
            id="acctNo"
            value={formVal.acctNo}
            onChange={onChange}
          />
        </div>
        <div className="row agree">
          <input type="checkbox" name="" id="" required checked />
          <span>
            I agree to the <a href="#">Terms of services</a> and{" "}
            <a href="#">Privacy Policy</a>
          </span>
        </div>
        <button>Generate</button>
      </form>
    </>
  );
}

export default Home;
