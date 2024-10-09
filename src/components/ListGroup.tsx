import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
interface Props {
  heading: string;
}
function ListGroup({ heading }: Props) {
  const [paintings, setPaintings] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(Math.floor(Math.random() * 3334));
  const handleShuffle = () => {
    setPage(Math.floor(Math.random() * 3334));
  };
  useEffect(() => {
    setError("");
    setPaintings([]);
    fetch(
      "https://www.rijksmuseum.nl/api/en/collection?key=EgVVVOKi&ps=3&p=" + page
    )
      .then((response) => response.json())
      .then((data) => setPaintings(data["artObjects"]))
      .catch((err) => {
        console.log(err.message);
        setError("Error, while loading the art gallery");
      });
  }, [page]);
  const newPlaceholder = () => {
    return (
      <div className="col">
        <div className="card art-card" aria-hidden="true">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body  h-100 d-flex flex-column-reverse">
            <h4 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h4>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
          </div>
        </div>
      </div>
    );
  };
  const showPlaceholders = () => {
    return (
      <>
        {newPlaceholder()}
        {newPlaceholder()}
        {newPlaceholder()}
      </>
    );
  };
  return (
    <>
      <div className="d-flex flex-column d-flex align-items-center">
        <h1>{heading}</h1>
        <div className="mx-auto p-2 w-75 row row-cols-1 row-cols-md-3 g-5">
          {paintings.length === 0 && showPlaceholders()}
          {paintings.map((painting) => (
            <Link key={painting["id"]} to="/art" state={painting}>
              <div className="col flip">
                <div className="card art-card">
                  <img
                    src={
                      "webImage" in painting && painting["webImage"] != null
                        ? painting["webImage"]["url"]
                        : ""
                    }
                    className="card-img-top"
                    alt="No image"
                  />
                  <div className="card-body h-100 d-flex flex-column-reverse">
                    <h4 className="card-title ">{painting["title"]}</h4>
                    <p className="card-text">
                      {painting["principalOrFirstMaker"]}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-4">
          <button type="button" className="shuffle-btn" onClick={handleShuffle}>
            Shuffle
          </button>
        </div>
        {error != "" && (
          <h3 className="text-danger text-center mt-4">{error}</h3>
        )}
      </div>
    </>
  );
}

export default ListGroup;
