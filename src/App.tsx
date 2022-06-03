import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/map";
import "./App.css";
const { KEY_API } = require("./secrets.json");

const App: React.FC = () => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: KEY_API,
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
};

export default App;
