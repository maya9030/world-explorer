import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CountryList = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        console.log('🟡 APIを呼び出し開始...');

        axios.get('http://localhost:3000/countries')
            .then(response => {
                console.log('🟢 APIレスポンス:', response.data);
                setCountries(response.data);
            })
            .catch(error => {
                console.error('🔴 APIエラー:', error);
                if (error.response) {
                    console.error('🔴 サーバーエラー:', error.response.status, error.response.data);
                } else if (error.request) {
                    console.error('🔴 ネットワークエラー（サーバーに届いていない）:', error.request);
                } else {
                    console.error('🔴 予期しないエラー:', error.message);
                }
            });
    }, []);

    return (
        <div>
            <h1>🌍 世界の国データ</h1>
            <ul>
                {countries.length > 0 ? (
                    countries.map((country) => (
                        <li key={country.Code}>
                            {country.Name} - {country.Continent} - {country.Population.toLocaleString()}人
                        </li>
                    ))
                ) : (
                    <p>データを読み込み中...</p>
                )}
            </ul>
        </div>
    );
};

export default CountryList;
