import { useEffect, useState } from "react";

/***
  @description
  Imperfect hook for checking device orientation. 
  Attempts to exclude laptops from the check but 
  difficult if window is resized extremely small.

  @returns 
  true if mobile device is vertical
 */

const useOrientation = () => {
  const [isLaptop, setIsLaptop] = useState(false);
  const [isVertical, setIsVertical] = useState(true);

  useEffect(() => {
    const handleOrientationChange = () => {
      // Check if the device is a laptop
      setIsLaptop(window.innerWidth > 900);

      // Check if the device is in a vertical orientation
      // 2.165 is 19.5:9 aspect ratio (iPhone aspect ratio)
      setIsVertical(window.innerWidth < window.innerHeight * 2.164);
    };

    // Initial check
    handleOrientationChange();

    // Listen for window resize and orientation change events
    window.addEventListener("resize", handleOrientationChange);
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      // Remove the event listeners when the component unmounts
      window.removeEventListener("resize", handleOrientationChange);
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  // If it's a laptop or a phone in vertical orientation, return true; otherwise, return false
  return isLaptop || isVertical;
};

export default useOrientation;
