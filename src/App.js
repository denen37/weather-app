import statesAndCountries from './getCountryAndStates'
import axios from 'axios';
import { useEffect, useState } from 'react'
import logo from './images/weather-logo.svg'
import cloudy from './images/Cloudy.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faDroplet, faMagnifyingGlass, faTemperatureHalf, faWind } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-regular-svg-icons'
import { BarLoader } from 'react-spinners';


export default function App() {
    const INITIAL = 'initial'
    const PENDING = 'pending'
    const SUCCESS = 'success'
    const FAIL = 'fail'

    const [requestState, setRequestState] = useState(INITIAL);
    const [loading, setLoading] = useState(true);
    const [isShowDropdown, setIsShowDropdown] = useState(false)
    const [weatherData, setWeatherData] = useState({})
    const [location, setLocation] = useState('Akure');
    const [searchValue, setSearchValue] = useState(location);
    const [statesAndCountriesList, setStatesAndCountriesList] = useState(statesAndCountries)

    const showDropdown = (e) => {
        let search = e.target.value;
        setSearchValue(search);

        if (search.length > 0) {
            setIsShowDropdown(true)
            let newStatesAndCountriesList = statesAndCountriesList
                .filter((stateAndCountry) => (stateAndCountry.state + stateAndCountry.country)
                    .toLowerCase()
                    .includes(search.toLowerCase()))

            setStatesAndCountriesList(newStatesAndCountriesList);
        }
        else {
            setIsShowDropdown(false)
            setStatesAndCountriesList(statesAndCountries);
        }
    }

    const handleSelectLocation = (location) => {
        setRequestState(INITIAL);
        setSearchValue(location);
        setLocation(location);
        setIsShowDropdown(false);
    }


    useEffect(() => {

        // const options = {
        //     method: 'GET',
        //     url: 'https://yahoo-weather5.p.rapidapi.com/weather',
        //     params: {
        //         location: location,
        //         format: 'json',
        //         u: 'c'
        //     },
        //     headers: {
        //         'x-rapidapi-key': 'd8976d3348mshb22db2c59f1e598p10cd4djsn836de982976a',
        //         'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
        //     }
        // };


        const options = {
            method: 'GET',
            url: 'https://yahoo-weather5.p.rapidapi.com/weather',
            params: {
                location: location,
                format: 'json',
                u: 'c'
            },
            headers: {
                'x-rapidapi-key': 'a17c4225d6msh7cacb3940d900e2p1987a7jsn8a12b3d3cc9c',
                'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
            }
        };


        setRequestState(PENDING);
        console.log(PENDING);
        axios.request(options)
            .then((res) => {
                console.log(res.data);
                setWeatherData(res.data)
                setRequestState(SUCCESS);
                console.log(SUCCESS);
            })
            .catch(err => {
                console.error(err)
                setRequestState(FAIL);
                console.log(FAIL);
            })
            .finally(() => {

            });
    }, [location])

    return (
        <div style={{ backgroundImage: 'url(/images/bg-weather.png)' }} className='md:h-screen bg-cover bg-center bg-no-repeat '>

            {
                requestState === PENDING ?
                    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/50'>
                        <BarLoader color="#d4dce7" loading={loading} />
                    </div>
                    :
                    <div className="md:h-screen grid grid-cols-1 md:grid-cols-[1fr_auto]">
                        <div className="px-10 md:px-20 py-8 flex flex-col justify-between h-[80vh] md:h-screen mb-50">
                            <div className='flex justify-between'>
                                <img src={logo} alt="logo" className="w-[70px]" />

                                <div className='relative block md:hidden'>
                                    <div className='border-b border-b-gray-100 py-1.5 flex items-center'>
                                        <input
                                            placeholder='Search location...'
                                            className='py-1 px-2 bg-transparent outline-none text-white flex-1'
                                            onChange={showDropdown}
                                            value={searchValue}
                                        />
                                        <FontAwesomeIcon icon={faMagnifyingGlass} color='white' size='xl'
                                            className='cursor-pointer active:scale-90'
                                            onClick={() => handleSelectLocation(searchValue)}
                                        />
                                    </div>

                                    {
                                        isShowDropdown && <ul className='text-white absolute left-0 right-0 bg-black/70 backdrop-blur-lg z-10'>
                                            {
                                                statesAndCountriesList.map((state_country, index) => <li
                                                    key={index}
                                                    className='py-2 px-4 hover:bg-gray-400 hover:text-black transition-colors cursor-pointer'
                                                    onClick={() => handleSelectLocation(state_country.state)}
                                                >
                                                    <p>{state_country.state} <span className='opacity-80'>({state_country.country})</span></p>
                                                </li>)
                                            }
                                        </ul>
                                    }
                                </div>
                            </div>

                            <div className='flex items-end gap-4 mb-16'>
                                <h1 className="text-8xl text-white font-normal">{weatherData.current_observation?.condition?.temperature}<sup>o</sup></h1>
                                <div className='text-white'>
                                    <h1 className='text-5xl'>{weatherData.location?.city}</h1>
                                    <p>{new Date().toDateString()}</p>
                                </div>
                                <img src={cloudy} alt='clouds' className='w-[50px]' />
                            </div>
                        </div>

                        <div className='px-8 md:ps-8 lg:pe-32 py-4 backdrop-blur-md bg-white/5 md:overflow-y-auto md:max-h-full flex items-center justify-center'>
                            <div className='max-w-[450px] h-full'>
                                <div className='relative hidden md:block'>
                                    <div className='border-b border-b-gray-100 py-1.5 flex items-center'>
                                        <input
                                            placeholder='Search location...'
                                            className='py-1 px-2 bg-transparent outline-none text-white flex-1'
                                            onChange={showDropdown}
                                            value={searchValue}
                                        />
                                        <FontAwesomeIcon icon={faMagnifyingGlass} color='white' size='xl'
                                            className='cursor-pointer active:scale-90'
                                            onClick={() => handleSelectLocation(searchValue)}
                                        />
                                    </div>

                                    {
                                        isShowDropdown && <ul className='text-white absolute left-0 right-0 bg-black/70 backdrop-blur-lg z-10'>
                                            {
                                                statesAndCountriesList.map((state_country, index) => <li
                                                    key={index}
                                                    className='py-2 px-4 hover:bg-gray-400 hover:text-black transition-colors cursor-pointer'
                                                    onClick={() => handleSelectLocation(state_country.state)}
                                                >
                                                    <p>{state_country.state} <span className='opacity-80'>({state_country.country})</span></p>
                                                </li>)
                                            }
                                        </ul>
                                    }
                                </div>


                                <p className='my-10 text-gray-100 text-center md:text-left'>Weather Details...</p>

                                <div className=''>
                                    <h1 className='text-gray-100 uppercase'>Thunder Storm with light drizzle</h1>

                                    <ul className='flex flex-col gap-3 py-4'>
                                        <li className='flex items-center gap-2 text-white'>
                                            <p className='flex-1 opacity-70'>Temp max</p>
                                            <p>{weatherData?.forecasts?.[0].high}<sup>o</sup></p>
                                            <FontAwesomeIcon icon={faTemperatureHalf} className='text-red-300' size='x1' />
                                        </li>

                                        <li className='flex items-center gap-2 text-white'>
                                            <p className='flex-1 opacity-70'>Temp min</p>
                                            <p>{weatherData?.forecasts?.[0].low}<sup>o</sup></p>
                                            <FontAwesomeIcon icon={faTemperatureHalf} className='text-blue-400' size='x1' />
                                        </li>

                                        <li className='flex items-center gap-2 text-white'>
                                            <p className='flex-1 opacity-70'>Humidity</p>
                                            <p>{weatherData?.current_observation?.atmosphere.humidity}%</p>
                                            <FontAwesomeIcon icon={faDroplet} className='text-white' size='x1' />
                                        </li>

                                        <li className='flex items-center gap-2 text-white'>
                                            <p className='flex-1 opacity-70'>Visibility</p>
                                            <p>{weatherData?.current_observation?.atmosphere.visibility}%</p>
                                            <FontAwesomeIcon icon={faCloud} className='text-white' size='x1' />
                                        </li>

                                        <li className='flex items-center gap-2 text-white'>
                                            <p className='flex-1 opacity-70'>Wind</p>
                                            <p>{weatherData?.current_observation?.wind.speed}km/h</p>
                                            <FontAwesomeIcon icon={faWind} className='text-white' size='x1' />
                                        </li>
                                    </ul>

                                    <div className='h-[1px] bg-white bg-opacity-80 mt-8'></div>

                                    <div className='mt-10'>
                                        <p className='text-white text-lg'>Next {weatherData.forecasts?.length - 1} Day's Weather Forecast...</p>

                                        <ul className='pt-4 flex flex-col gap-6'>
                                            {
                                                weatherData.forecasts?.map((data, index) => {
                                                    if (index > 0) {
                                                        return <li className='flex items-center gap-10'>
                                                            <FontAwesomeIcon icon={
                                                                weatherData.forecasts[index]?.text.includes('Cloudy') ? faCloud : faSnowflake
                                                            } className='text-white text-5xl opacity-90' />
                                                            <div className='text-lg text-white flex-1'>
                                                                <p className=''>{weatherData.forecasts[index]?.day}</p>
                                                                <p className='opacity-80'>{weatherData.forecasts[index]?.text}</p>
                                                            </div>

                                                            <p className='text-white text-xl opacity-80'>{weatherData.forecasts[index]?.high}<sup>o</sup></p>
                                                        </li>
                                                    }
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}