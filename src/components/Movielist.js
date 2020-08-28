import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Grow, Grid, FormControl, NativeSelect } from '@material-ui/core'
import useStyles from './styleMovielist'
import { ResultCard } from './ResultCard'

export const Movielist = () => {

    const years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
    const classes = useStyles()

    const [movies, setMovies] = useState([])
    const [error, setError] = useState()

    const handleYearChange = (year) => {
        if (year) {
            fetchMovie(year)
        }
    }

    const fetchMovie = async (year) => {
        if (!year) {
            const res = await Axios.get("https://www.omdbapi.com/?apikey=32395055&type=movie&s=bad")
        }  

        const res = await Axios.get(`https://www.omdbapi.com/?apikey=32395055&type=movie&s=bad&y=${year}`)
        
        if (res.data.Response) {
            setMovies(res.data.Search)
            setError(false)
        }
        else {
            setError(res.data.Error)
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [error])

    return (
        <div>
            <FormControl className ={classes.dropdown} >
                <NativeSelect defaultValue="" onChange={(e) => handleYearChange(e.target.value)}>
                    <option className = {classes.dropdow} key = "1" value={false}>Select a Year to filter movies</option>
                    {years.map((year, i) => <option className={classes.dropdown} key={i} value={year}>{year}</option>)}
                </NativeSelect>
            </FormControl>
            <Grow in>
                <Grid className={classes.container} container alignItems="stretch" spacing={4}>
                    {movies.map((movie, i) => (
                        <Grid item xs={12} md={6}  style={{ display: 'flex' }}>
                            <ResultCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        </div>
    )
}
