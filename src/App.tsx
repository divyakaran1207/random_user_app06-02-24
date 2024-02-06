import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

interface UserData {
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: string;
}

function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://randomuser.me/api");
      const { name, email, picture } = response.data.results[0];
      const userData: UserData = { name: name, email, picture: picture.large };
      setUserData(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const cachedUserData = localStorage.getItem("userData");
    if (cachedUserData) {
      setUserData(JSON.parse(cachedUserData));
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.setProperty("--glowColor", "#f57432");
    } else {
      document.documentElement.style.setProperty("--glowColor", "#3286f5");
    }
  }, [isLoading]);

  return (
    <div className="container main">
      {userData && (
        <div className="center-box">
          {/* <!-- START Box --> */}
          <div className="animated-border-box-glow"></div>
          <div className={"animated-border-box"}>
            {/* <!-- Inside the Box --> */}
            <div className="container padding20">
              <div className="container">
                <img src={userData.picture} />
                <p>
                  Full Name:{" "}
                  {`${userData.name.title} ${userData.name.first} ${userData.name.last}`}
                </p>
                <p>Email: {userData.email}</p>
              </div>
              <div className="btn" onClick={fetchData}>
                {isLoading ? "Loading..." : "Refresh"}
              </div>
            </div>
          </div>
          {/* <!-- END --> */}
        </div>
      )}
    </div>
  );
}

export default App;
