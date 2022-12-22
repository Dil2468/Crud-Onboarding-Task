import React from "react";

const Footer = () => {
  const date1 = new Date().getFullYear();

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        textAlign: "left",
        paddingLeft: 7,
      }}
    >
      <hr></hr>

      <p> &copy; {date1} <b>-Dileep Kumar</b></p>
    </div>
  );
};

export default Footer;
