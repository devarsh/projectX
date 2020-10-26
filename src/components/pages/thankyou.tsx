import { useNavigate, useLocation } from "react-router-dom";
export const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const handleClick = () => {
    navigate("/forms");
  };
  return (
    <div>
      <span>Thank you</span>
      <button onClick={handleClick}>Go to Forms</button>
    </div>
  );
};
