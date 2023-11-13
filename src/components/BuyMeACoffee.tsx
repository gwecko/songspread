import { useEffect } from "react";

const BuyMeACoffeeWidget = () => {
  useEffect(() => {
    // Add the script tag to the DOM
    const script = document.createElement("script");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
    script.setAttribute("data-name", "BMC-Widget");
    script.setAttribute("data-cfasync", "false");
    script.setAttribute("data-id", "grantwecker");
    script.setAttribute("data-description", "Support me on Buy me a coffee!");
    script.setAttribute(
      "data-message",
      "Much of this was built in coffee shops—your support is appreciated!"
    );
    script.setAttribute("data-color", "#E9D8FD");
    script.setAttribute("data-position", "Right");
    script.setAttribute("data-x_margin", "18");
    script.setAttribute("data-y_margin", "18");
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Clean up on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return <></>
};

export default BuyMeACoffeeWidget;


