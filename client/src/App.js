import { BrowserRouter, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminScreen from "./screens/AdminScreen";
import LandingScreen from "./screens/LandingScreen";
import HotelViewScreen from "./screens/HotelViewScreen";
import FinalHome from "./screens/FinalHome";
import HotelsPage from "./screens/HotelsPage";
import HotelView from "./screens/HotelView";
import Footer from "./components/Footer";
import MerchantScreen from "./screens/MerchantAdmin";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={LandingScreen} />
        {/* <Route path="/home" exact component={Homescreen} /> */}
        <Route
          path="/book/:hotelid/:roomid/:fromdate/:todate"
          exact
          component={Bookingscreen}
        />
        <Route path="/register" exact component={RegisterScreen} />
        <Route path="/login" exact component={LoginScreen} />
        <Route path="/profile" exact component={ProfileScreen} />
        <Route path="/bookings" exact component={ProfileScreen} />
        <Route path="/admin" exact component={AdminScreen} />
        <Route path="/hotelview/:id" exact component={HotelView} />
        <Route path="/hotels" exact component={HotelsPage} />
        <Route path="/home" exact component={FinalHome} />
        <Route path="/merchantadmin" exact component={MerchantScreen} />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
