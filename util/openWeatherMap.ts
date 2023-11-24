import { WeatherData } from '../pages/api/weather';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export function transform(weatherData: WeatherData) {
  if ('message' in weatherData) {
    return {
      error: {
        code: weatherData.cod,
        message: weatherData.message,
      },
    };
  }

  return {
    data: {
      city: weatherData.name,
      country: regionNames.of(weatherData.sys.country)!,
      icon: weatherData.weather[0]!.icon,
      temp: weatherData.main.temp,
      conditions: weatherData.weather[0]!.main,
      conditionsDescription: weatherData.weather[0]!.description,
    },
  };
}
