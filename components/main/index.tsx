import useSWR, { Key } from 'swr'
import { ApodType } from '../pictureTile'
import Pictures from '../pictures'
import axios from 'axios'

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)

function Main() {
    //TODO: add inifinite scroll starting with the most recent dates, for now dates are hardcoded
    const apiURL: Key = `https://api.nasa.gov/planetary/apod?start_date=${'2022-01-12'}&end_date=${'2022-01-26'}&thumbs=true&api_key=${
        process.env.NEXT_PUBLIC_NASA_API_KEY
    }`
    const { data: apods, error } = useSWR<ApodType[], boolean>(apiURL, fetcher)
    if (error) return <div>Sorry, we have encountered an error.</div>
    return <Pictures apods={apods} />
}

export default Main
