import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
function ArtPage() {
  const location = useLocation();
  const id = location.state.objectNumber;
  const [details, setDetails] = useState(Object);
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
    fetch(
      "https://www.rijksmuseum.nl/api/en/collection/" + id + "?key=EgVVVOKi"
    )
      .then((response) => response.json())
      .then((data) => setDetails(data["artObject"]))
      .catch((err) => {
        console.log(err);
        setError("Error, while loading the art page");
      });
  }, []);
  const showPlaceholder = () => {
    return (
      <div className="card desc-card">
        <div className="d-flex flex-column align-items-center">
          <h1 className="card-title placeholder-glow">
            <span className="placeholder col-10"></span>
          </h1>
        </div>
        <div className="ms-5 d-flex flex-row h-75">
          <div className=" mt-5 img-container">
            <img src="..." className="card-img-top" alt="..." />
          </div>
          <div className="d-flex flex-row-reverse w-100">
            <div className="mt-5 d-flex flex-column w-50">
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-7"></span>
                <span className="placeholder col-7"></span>
                <span className="placeholder col-7"></span>
                <span className="placeholder col-10"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="d-flex ms-4 mt-5">
        <div className="button-container">
          <Link to="/" className="shuffle-btn">
            Back to gallery
          </Link>
        </div>
        {details["objectNumber"] == null ? (
          showPlaceholder()
        ) : (
          <div className="card desc-card">
            <div className="d-flex flex-column align-items-center">
              <h1>
                {details["title"] != null ? details["title"] : "No title"}
              </h1>
            </div>
            <div className="ms-5 d-flex flex-row h-75">
              <div className=" mt-5 img-container">
                <img
                  src={
                    details["webImage"] != null
                      ? details["webImage"]["url"]
                      : ""
                  }
                  alt="No image"
                  className="art-desc-image"
                ></img>
              </div>
              <div className="d-flex flex-row-reverse w-100">
                <div className="mt-5 d-flex flex-column w-50 desc-text">
                  <h3>Author: {details["principalMaker"]}</h3>
                  <p>
                    Years of creation:&nbsp;
                    {details["dating"] != null
                      ? details["dating"]["presentingDate"]
                      : "Unknown"}
                  </p>
                  <p>
                    Size:&nbsp;
                    {details["subTitle"] != null
                      ? details["subTitle"]
                      : "Unknown"}
                  </p>
                  <p>
                    Techniques:&nbsp;
                    {details["techniques"] != null &&
                      details["techniques"].map((technique: string) => (
                        <span key={technique}>&nbsp;{technique}</span>
                      ))}
                  </p>
                  <p>
                    Description:&nbsp;
                    {details["label"] != null &&
                    details["label"]["description"] != null
                      ? details["label"]["description"]
                      : "No description"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {error != "" && <h3 className="text-danger text-center mt-4">{error}</h3>}
    </div>
  );
}
export default ArtPage;
