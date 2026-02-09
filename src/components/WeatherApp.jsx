import { useState, useEffect} from 'react';
import { getBackgroundImage, getWeatherIcon, getStatIcon } from './Weather';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    fetchWeather();
  };

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8e12e292532af6fb16ac160dcc73b863&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);

      fetchForecast();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
/*Sunrise and Sunset Time*/
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([],{
        hour: '2-digit',
        minute: '2-digit',
    });
  };



  const fetchForecast = async () => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8e12e292532af6fb16ac160dcc73b863&units=metric`
        );

        const data = await response.json();
        setForecast(data.list || [] );
    }
    catch(err){
        console.error(err);
    }
  };

  const dailyForecast = forecast.filter(item =>
    item.dt_txt.includes('12:00:00')
  );

  /*Background Mapping*/
  const backgroundImage = weather ? getBackgroundImage(weather.weather[0].description) : null;

  useEffect(() => {
  if (!navigator.geolocation) {
    console.warn("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherByCoords(latitude, longitude);
    },
    (error) => {
      console.warn("Location permission denied");
    }
    );
    }, []);

    const fetchForecastByCoords = async (lat, lon) => {
        try {
            const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8e12e292532af6fb16ac160dcc73b863&units=metric`
            );

            const data = await response.json();
            setForecast(data.list || []);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchWeatherByCoords = async (lat, lon) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8e12e292532af6fb16ac160dcc73b863&units=metric`
            );

            if (!response.ok) {
            throw new Error("Unable to fetch location weather");
            }

            const data = await response.json();
            setWeather(data);
            setCity(data.name);

            fetchForecastByCoords(lat, lon);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const pageStyle = {
  backgroundImage: backgroundImage
    ? `linear-gradient(
        90deg,
        rgba(15, 23, 42, 0.55) 0%,
        rgba(15, 23, 42, 0.35) 35%,
        rgba(15, 23, 42, 0.15) 60%,
        rgba(15, 23, 42, 0.05) 100%
      ), url(${backgroundImage})`
    : `linear-gradient(135deg, #0f172a, #1e293b)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  minHeight: "100vh",
};


  return (
  <div className="page-wrapper" style={pageStyle}>
    
    <div className="app-container">

      {/* Header */}
      <h2>Weather App</h2>

      {/* Search */}
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="container-fluid mt-4">
            <div className="row g-4 align-items-start">

            {/* LEFT SIDE → CURRENT WEATHER */}
            <div className="col-12 col-lg-8">
                <div className="weather-info">
                    {getWeatherIcon(weather.weather[0].description, 36)}
                <h3 className="city-name">{weather.name}</h3>
                <p className="condition">{weather.weather[0].description}</p>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className = "stat-icon"> {getStatIcon("temp")}</div> 
                        <div>
                            <p className="stat-label">Temperature</p>
                            <p className="stat-value">{weather.main.temp}°C</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className = "stat-icon"> {getStatIcon("humidity")}</div> 
                        <div>
                            <p className="stat-label">Humidity</p>
                            <p className="stat-value">{weather.main.humidity}%</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className = "stat-icon"> {getStatIcon("pressure")}</div> 
                        <div>
                            <p className="stat-label">Pressure</p>
                            <p className="stat-value">{weather.main.pressure} mb</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className = "stat-icon"> {getStatIcon("wind")}</div> 
                        <div>
                            <p className="stat-label">Wind Speed</p>
                            <p className="stat-value">{weather.wind.speed} m/s</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className = "stat-icon"> {getStatIcon("visibility")}</div> 
                        <div>
                            <p className="stat-label">Visibility</p>
                            <p className="stat-value">{weather.visibility / 1000} km</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className = "stat-icon"> {getStatIcon("sunrise")}</div> 
                        <div>
                            <p className="stat-label">Sunrise</p>
                            <p className="stat-value">
                            {formatTime(weather.sys.sunrise)}
                    </p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className = "stat-icon"> {getStatIcon("sunset")}</div> 
                        <div>
                            <p className="stat-label">Sunset</p>
                            <p className="stat-value">
                                {formatTime(weather.sys.sunset)}
                            </p>
                        </div>    
                    </div>
                </div>
                </div>
            </div>

            {/* RIGHT SIDE → 5 DAY FORECAST */}
            <div className="col-12 col-lg-4">
                <div className="forecast-panel">
                <h4 className="forecast-title">5-Day Forecast</h4>

                <div className="forecast-list">
                    {dailyForecast.slice(0, 5).map((day, index) => (
                    <div key={index} className="forecast-card">
                        <div className="forecast-icon">
                            {getWeatherIcon(day.weather[0].description, 36)}
                        </div>

                        <p className="forecast-date">
                            {new Date(day.dt_txt).toDateString()}
                        </p>

                        <p className="forecast-desc">
                            {day.weather[0].description}
                        </p>

                        <p className="forecast-temp">
                            {day.main.temp}°C
                        </p>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            </div>
        </div>
        )}


    </div>
  </div>
);

};

export default WeatherApp;
