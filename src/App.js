import statesAndCountries from './getCountryAndStates'
import { useEffect, useState } from 'react'
import logo from './images/weather-logo.svg'
import cloudy from './images/Cloudy.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faDroplet, faMagnifyingGlass, faTemperatureHalf, faWind } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-regular-svg-icons'


export default function App() {
    const [isShowDropdown, setIsShowDropdown] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [statesAndCountriesList, setStatesAndCountriesList] = useState(statesAndCountries)

    const showDropdown = (e) => {
        console.log(e.target.value);

        let search = e.target.value;
        setSearchValue(search)

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
        setSearchValue(location);
        setIsShowDropdown(false);
    }


    // useEffect(() => {
    //     import axios from 'axios';

    //     const options = {
    //         method: 'GET',
    //         url: 'https://yahoo-weather5.p.rapidapi.com/weather',
    //         params: {
    //             location: 'Akure',
    //             format: 'json',
    //             u: 'c'
    //         },
    //         headers: {
    //             'x-rapidapi-key': 'd8976d3348mshb22db2c59f1e598p10cd4djsn836de982976a',
    //             'x-rapidapi-host': 'yahoo-weather5.p.rapidapi.com'
    //         }
    //     };

    //     try {
    //         const response = await axios.request(options);
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // })

    return (
        <div style={{ backgroundImage: 'url(/images/bg-weather.png)' }} className="h-screen bg-cover bg-center bg-no-repeat grid grid-cols-[1fr_auto]">
            <div className="px-20 py-8 flex flex-col justify-between mb-50">
                <div>
                    <img src={logo} alt="logo" className="w-[70px]" />
                </div>

                <div className='flex items-end gap-4 mb-16'>
                    <h1 className="text-8xl text-white font-normal">16<sup>o</sup></h1>
                    <div className='text-white'>
                        <h1 className='text-5xl'>London</h1>
                        <p>06:09 Monday, Sep '23</p>
                    </div>
                    <img src={cloudy} alt='clouds' className='w-[50px]' />
                </div>
            </div>

            <div className='ps-8 pe-32 py-4 backdrop-blur-md bg-white/5 overflow-y-auto max-h-full'>
                <div className='relative'>
                    <div className='border-b border-b-gray-100 py-1.5 flex items-center'>
                        <input
                            placeholder='Search location...'
                            className='py-1 px-2 bg-transparent outline-none text-white flex-1'
                            onChange={showDropdown}
                            value={searchValue}
                        />
                        <FontAwesomeIcon icon={faMagnifyingGlass} color='white' size='xl' />
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


                <p className='my-10 text-gray-100'>Weather Details...</p>

                <div className=''>
                    <h1 className='text-gray-100 uppercase'>Thunder Storm with light drizzle</h1>

                    <ul className='flex flex-col gap-3 py-4'>
                        <li className='flex items-center gap-2 text-white'>
                            <p className='flex-1 opacity-70'>Temp max</p>
                            <p>19<sup>o</sup></p>
                            <FontAwesomeIcon icon={faTemperatureHalf} className='text-red-300' size='x1' />
                        </li>

                        <li className='flex items-center gap-2 text-white'>
                            <p className='flex-1 opacity-70'>Temp min</p>
                            <p>15<sup>o</sup></p>
                            <FontAwesomeIcon icon={faTemperatureHalf} className='text-blue-400' size='x1' />
                        </li>

                        <li className='flex items-center gap-2 text-white'>
                            <p className='flex-1 opacity-70'>Humidity</p>
                            <p>58%</p>
                            <FontAwesomeIcon icon={faDroplet} className='text-white' size='x1' />
                        </li>

                        <li className='flex items-center gap-2 text-white'>
                            <p className='flex-1 opacity-70'>Cloudy</p>
                            <p>86%</p>
                            <FontAwesomeIcon icon={faCloud} className='text-white' size='x1' />
                        </li>

                        <li className='flex items-center gap-2 text-white'>
                            <p className='flex-1 opacity-70'>Wind</p>
                            <p>5km/h</p>
                            <FontAwesomeIcon icon={faWind} className='text-white' size='x1' />
                        </li>
                    </ul>

                    <div className='h-[1px] bg-white bg-opacity-80 mt-8'></div>

                    <div className='mt-10'>
                        <p className='text-white text-lg'>Today's Weather Forecast...</p>

                        <ul className='pt-4 flex flex-col gap-6'>
                            <li className='flex items-center gap-10'>
                                <FontAwesomeIcon icon={faSnowflake} className='text-white text-5xl opacity-90' />
                                <div className='text-lg text-white flex-1'>
                                    <p className=''>09:00</p>
                                    <p className='opacity-80'>Snow</p>
                                </div>

                                <p className='text-white text-xl opacity-80'>19<sup>o</sup></p>
                            </li>

                            <li className='flex items-center gap-10'>
                                <FontAwesomeIcon icon={faSnowflake} className='text-white text-5xl opacity-90' />
                                <div className='text-lg text-white flex-1'>
                                    <p className=''>09:00</p>
                                    <p className='opacity-80'>Snow</p>
                                </div>

                                <p className='text-white text-xl opacity-80'>19<sup>o</sup></p>
                            </li>

                            <li className='flex items-center gap-10'>
                                <FontAwesomeIcon icon={faSnowflake} className='text-white text-5xl opacity-90' />
                                <div className='text-lg text-white flex-1'>
                                    <p className=''>09:00</p>
                                    <p className='opacity-80'>Snow</p>
                                </div>

                                <p className='text-white text-xl opacity-80'>19<sup>o</sup></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}