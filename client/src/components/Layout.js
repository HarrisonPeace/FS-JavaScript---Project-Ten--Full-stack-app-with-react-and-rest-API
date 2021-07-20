import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <main>
        <div className="wrap">{children}</div>
      </main>
    </>
  );
};

export default Layout;
