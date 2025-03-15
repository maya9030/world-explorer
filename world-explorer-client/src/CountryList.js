import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryList = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/countries')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error('データ取得エラー:', error);
            });
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen p-5">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-5">
                世界の国データ
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {countries.map((country) => (
                    <div key={country.Code} className="bg-white p-5 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">{country.Name}</h2>
                        <p className="text-gray-600">{country.Continent}</p>
                        <p className="text-gray-500">{country.Population.toLocaleString()} 人</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountryList;
