import React, { useState } from 'react'
import Axios from 'axios';
import { ResultCard } from './ResultCard';
import { FormControl, NativeSelect } from '@material-ui/core';

export const Add = () => {

    const years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [year , setYear] = useState("")

    const handleYearChange = (year) => {
        if (year) {
            setYear(year)
            fetchMovie(query,year)
        }
    }

   const fetchMovie = async(search,year) => {
        await Axios.get(`https://www.omdbapi.com/?apikey=32395055&type=movie&s=${search?search:""}&y=${year?year:""}`)
            .then((res) => {
                if (res.data.Response) {
                    setResults(res.data.Search);
                } else {
                   setResults([]);
                   console.log(res.data.Error)
                }
            });
    }

    const onChange = async (e) => {
        e.preventDefault();

        setQuery(e.target.value);
        fetchMovie(e.target.value,year)

        
    };


    return (
        <div className="add-page">
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Search for a movie"
                            value={query}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <FormControl  >
                            <NativeSelect defaultValue="" onChange={(e) => handleYearChange(e.target.value)}>
                                <option  key="1" value={false}>Select a Year to filter movies</option>
                                {years.map((year, i) => <option  key={i} value={year}>{year}</option>)}
                            </NativeSelect>
                        </FormControl>
                    </div>

                    <ul className="results">
                        {results ? results.map((movie) => (
                            <li key={movie.imdbID}>
                                <h5>{movie.Title}</h5>
                                <ResultCard movie={movie} />
                            </li>
                        )) : <h2>Some Error...try something different</h2>}
                    </ul>
                </div>
            </div>
        </div>
    )
}
