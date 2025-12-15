import Breadcrub from "../assets/components/Breadcrub";
import MapComponent from "../assets/components/MapComponent";
import HistoryTable from "../assets/components/HistoryTable";

const Home = () => {
  return (
    <div className="wrap-fluid">
      <div className="container-fluid paper-wrap bevel tlbr">
        {/* BREADCRUMB NAVIGATION */}
        <Breadcrub />
        
        {/* MAP SECTION */}
        <MapComponent />
        {/* HISTORY TABLE*/}
        <HistoryTable />
      </div>
    </div>
  );
};

export default Home;
