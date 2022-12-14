// pages/BookCreate.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import weatherJson from "../static/weather.json";

export const BookCreate = () => {
    const [loading, setLoading] = useState(true);
    const[books, setBooks] = useState([]);
    const [book, setBook] = useState([]);
    const [geoLocation, setGeoLocation] = useState(null);
    const [place, setPlace] = useState("");
    const [weather, setWeather] = useState("");
    const [restaurant, setRestaurant] = useState("");

    const getBooks = async (keyword) => {
        const url = "https://www.googleapis.com/books/v1/volumes?q=intitle:";
        const result = await axios.get(`${url}${keyword}`);
        console.log(result.data);
        setBooks(result.data.items ?? []);
    };

    const selectBook = (book) => {
        setBook(book.volumeInfo.title);
    };

    const success = async (position) => {
        const { latitude, longitude } = position.coords;
        setGeoLocation({ latitude, longitude });
        const placeData = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        console.log(placeData.data);
        setPlace(placeData.data.display_name);
        const weatherData = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Asia%2FTokyo`);
        console.log(weatherData.data);
        setWeather(weatherJson[weatherData.data.daily.weathercode[0]]);
        const restaurantData = await axios.get("http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=&lat=34.67&lng=135.52&range=5&order=4");
        console.log(restaurantData.data);
        setLoading(false);
    };

    const fail = (error) => console.log(error);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, fail);
    }, []);

    if (loading) {
        return <p>now loading...</p>;
    }

    return (
      <>
        <table>
            <tbody>
                <tr>
                    <td>??????</td>
                    <td>{place}</td>
                </tr>
                <tr>
                    <td>??????</td>
                    <td>{weather}</td>
                </tr>
                <tr>
                    <td>????????????</td>
                    <td>{book}</td>
                </tr>
            </tbody>
        </table>
        <p>??????????????????????????????</p>
        <input type="text" onChange={(e) => getBooks(e.target.value)} />
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>?????????</th>
                    <th>?????????</th>
                    <th>?????????</th>
                    <th>?????????</th>
                </tr>
            </thead>
            <tbody>
                {books.map((x, i) => (
                    <tr key={i}>
                        <td>
                            <button type="button" onClick={() => selectBook(x)}>??????</button>
                        </td>
                        <td>{x.volumeInfo.title}</td>
                        <td>{x.volumeInfo.publisher}</td>
                        <td>{x.volumeInfo.publishedDate}</td>
                        <td>
                            <a href={x.volumeInfo.infoLink} target="_blank" rel="noreferrer">Link</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </>
    );
  };

