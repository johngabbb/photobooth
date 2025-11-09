import { useNavigate } from "react-router-dom";
import PamkinLogo from "./../../assets/Photobee.png";

type Props = {};

const Header = (props: Props) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#e2aa31] px-8 h-20 shadow-sm flex items-center">
      <div className="flex items-center cursor-pointer w-fit" onClick={handleLogoClick}>
        <img src={PamkinLogo} className="h-25 w-auto" alt="Photobee Logo" />
        <span className="text-2xl font-semibold text-gray-800">Pamkin Photo Bee</span>
      </div>
    </div>
  );
};

export default Header;
