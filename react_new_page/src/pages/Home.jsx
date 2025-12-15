import MapComponent from "../assets/components/MapComponent";

const Home = () => {
  return (
    <div className="wrap-fluid">
      <div className="container-fluid paper-wrap bevel tlbr">
        {/* MAP SECTION */}
        <MapComponent />
      </div>
    </div>
  );
};

export default Home;
