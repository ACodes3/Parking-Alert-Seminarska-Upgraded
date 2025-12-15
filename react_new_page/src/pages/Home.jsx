import Breadcrub from "../assets/components/Breadcrub";
import MapComponent from "../assets/components/MapComponent";

const Home = () => {
  return (
    <div className="wrap-fluid">
      <div className="container-fluid paper-wrap bevel tlbr">
        {/* BREADCRUMB NAVIGATION */}
        <Breadcrub />
        
        {/* MAP SECTION */}
        <MapComponent />
      </div>
    </div>
  );
};

export default Home;
