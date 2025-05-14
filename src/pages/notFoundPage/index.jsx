import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import nt from "./notFound.module.scss";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      className={nt["not-found-container"]}
      role="alert"
      aria-live="assertive"
    >
      <h2 className={nt["error-text"]}>404</h2>
      <p className={nt["subtext"]}>
        Oops! The page you're looking for doesn't exist.
      </p>

      <div className={nt["image-container"]}>
        <img
          src="https://res.cloudinary.com/dntcdrfiq/image/upload/w_400,f_auto,q_auto/v1744640996/Apricat_2_gkxrcn.svg"
          className={nt["animated-img"]}
          alt="Illustration of a lost cat"
          onError={(e) => {
            e.target.src = "/fallback-image.png";
          }}
        />
      </div>

      <Button
        variant="primary"
        className={nt["home-button"]}
        onClick={() => navigate("/")}
        aria-label="Return to homepage"
      >
        Go Back Home
      </Button>
    </div>
  );
}

export default NotFound;
