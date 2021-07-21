import { NextApiRequest, NextApiResponse } from 'next';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

/**
 * Weather data from the OpenWeatherMap API
 *
 * Example:
 *
 * ```json
 * {
 *   "coord": {
 *     "lon": 16.3721,
 *     "lat": 48.2085
 *   },
 *   "weather": [
 *     {
 *       "id": 801,
 *       "main": "Clouds",
 *       "description": "few clouds",
 *       "icon": "02d"
 *     }
 *   ],
 *   "base": "stations",
 *   "main": {
 *     "temp": 298.01,
 *     "feels_like": 297.7,
 *     "temp_min": 295.54,
 *     "temp_max": 300.71,
 *     "pressure": 1021,
 *     "humidity": 44
 *   },
 *   "visibility": 10000,
 *   "wind": {
 *     "speed": 0.89,
 *     "deg": 270,
 *     "gust": 0.89
 *   },
 *   "clouds": {
 *     "all": 20
 *   },
 *   "dt": 1626878310,
 *   "sys": {
 *     "type": 2,
 *     "id": 2037452,
 *     "country": "AT",
 *     "sunrise": 1626837377,
 *     "sunset": 1626893112
 *   },
 *   "timezone": 7200,
 *   "id": 2761369,
 *   "name": "Vienna",
 *   "cod": 200
 * }
 * ```
 */
type WeatherData =
  | {
      coord: {
        lon: number;
        lat: number;
      };
      weather: [
        {
          id: number;
          main: string;
          description: string;
          icon: string;
        },
      ];
      base: string;
      main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
      };
      visibility: number;
      wind: {
        speed: number;
        deg: number;
        gust: number;
      };
      clouds: {
        all: number;
      };
      dt: number;
      sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
      };
      timezone: number;
      id: number;
      name: string;
      cod: number;
    }
  | { cod: number; message: string };

export type WeatherApiResponse =
  | {
      city: string;
      country: string;
      icon: string;
      temp: number;
      conditions: string;
      conditionsDescription: string;
    }
  | {
      error: {
        message: string;
      };
    };

export default async function weatherHandler(
  req: NextApiRequest,
  res: NextApiResponse<WeatherApiResponse>,
) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&units=metric&appId=${process.env.OPENWEATHERMAP_API_KEY}`,
  );
  const json = (await response.json()) as WeatherData;

  if ('message' in json) {
    return res.status(json.cod).json({ error: { message: json.message } });
  }

  res.status(200).json({
    city: json.name,
    country: regionNames.of(json.sys.country),
    icon: json.weather[0].icon,
    temp: json.main.temp,
    conditions: json.weather[0].main,
    conditionsDescription: json.weather[0].description,
  });
}
