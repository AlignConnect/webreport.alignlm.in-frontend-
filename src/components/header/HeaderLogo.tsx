import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="https://arayurveda.com/img/favicon.png"
          alt="logo"
          height={40}
          width={40}
          loading="lazy"
        />
        {/* <p className="font-semibold text-white text-lg hidden sm:block">
          Web Report
        </p> */}
      </div>
    </Link>
  );
};

export default HeaderLogo;
