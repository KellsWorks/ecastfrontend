import { Transition } from "@headlessui/react"

import { 
    DotsHorizontal, 
    ExclamationCircleOutline, 
    PencilAlt, 
    Plus, 
    ViewList
} from "heroicons-react"

import { 
    useState, 
    useRef, 
    useEffect 
} from "react"

import { Link } from "react-router-dom"

import SerieModal from "../../../components/episodes/SerieModal"

import DashboardMain from "../../../components/layouts/DashboardMain"

import EpisodeModal from '.././../../components/episodes/EpisodeModal.jsx'

import Skeleton from "react-loading-skeleton"

import UrlService from "../../../services/UrlService"

const Episodes = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [serieDropdownOpen, setSerieDropdownOpen] = useState(false);

    const [episodeDropdownOpen, setEpisodeDropdownOpen] = useState(false);

    const trigger = useRef(null);

    const dropdown = useRef(null);

    const [episodes, setEpisodes] = useState<any[]>([])

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        const formData = new FormData();

        formData.append("channels_id", localStorage.getItem('channel_id')!!.toString())

        fetch(UrlService.getSeries(), {
            method: 'POST',
            body: formData,
            redirect: 'follow'
            }
        ).then(async (response) => {
            return response.json()
        }).then((data) => {
            setIsLoading(false)
            setEpisodes(data.series)
            console.log(data.series);
            
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
        })
    }, [])

    return(
        <div className="dark:bg-gray-800">
            <DashboardMain>
                <div className="w-full h-full">
                    
                    <div className="sm:flex">
                        <div className="sm:w-3/5 mr-3 dark:bg-gray-900 bg-white shadow-sm rounded-sm hover:shadow-md">
                            <div className="p-3 flex justify-between">
                                <h3 className="text-md font-medium dark:text-gray-200">All Episodes</h3>
                                <Link to="#" onClick={() => setEpisodeDropdownOpen(!episodeDropdownOpen)}
                                        aria-expanded={episodeDropdownOpen} ref={trigger} className="bg-gray-100 dark:bg-gray-800 p-1 rounded-sm">
                                        <DotsHorizontal className="h-4 w-4 dark:text-gray-200"/>
                                        <Transition
                                        className="z-10 mr-20 absolute min-w-44 dark:bg-gray-800 bg-white py-1.5 rounded-sm shadow-lg overflow-hidden mt-1"
                                        show={episodeDropdownOpen}
                                    >
                                        <div
                                        ref={dropdown}
                                        onFocus={() => setEpisodeDropdownOpen(true)}
                                        onBlur={() => setEpisodeDropdownOpen(false)}
                                        >
                                        <ul>
                                            <li>
                                            <Link
                                                className="font-medium text-sm dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-50 flex items-center py-1 px-3"
                                                to="/dashboard/new-episode"
                                                onClick={() => setEpisodeDropdownOpen(!episodeDropdownOpen)}
                                            >
                                                <PencilAlt className="text-gray-600 dark:text-gray-300 w-5 h-5"/> Create an episode
                                            </Link>
                                            </li>
                                        </ul>
                                        </div>
                                    </Transition>
                                    </Link>
                            </div> 

                            <div className="p-3">
                                {!isLoading ?
                                    
                                    (episodes.length !== 0 ? episodes.map((value) => (
                                        value.podcast_episodes.map((item: { 
                                            id: any, title: string,
                                            created_at: string, season: string, 
                                            episode_number: string, audio_file: string,
                                            clip_art: string,
                                            listens: []
                                         }) => (
                                        <EpisodeModal key={item.id}
                                            name={'S'+item.season+'E'+item.episode_number} 
                                            title={item.title} 
                                            published={item.created_at} 
                                            time={item.created_at}
                                            description={value.description}
                                            audio_file={item.audio_file}
                                            seriesCoverArt={item.clip_art}
                                            seriesEpisode={value.title+' [S'+item.season+'E'+item.episode_number+']'}
                                            seriesName={item.title}
                                            seriesPublishedDate={value.created_at}
                                            listens={item.listens.length}
                                            />
                                        ))
                                    )) : 
                                    <div className="sm:px-24 py-20 flex flex-col items-center">
                                        <p className="dark:text-gray-300 text-gray-500 text-sm font-semibold mt-2 flex items-center space-x-2">
                                        <ExclamationCircleOutline className="w-5 h-5 mr-3"/>
                                        You have no podcast episodes, <span className="text-blue-400 underline">create</span>
                                        </p>
                                    </div>
                                    ) : Array(9)
                                    .fill(5)
                                    .map((index) => (
                                        <div
                                        key={index}
                                            className="flex justify-between dark:hover:bg-gray-800 hover:bg-gray-100 transition duration-150 border-b border-gray-200 dark:border-gray-700 p-3">
                                                <div className="flex">
                                                    <Skeleton height={10} width={30}/>
                                                    <div className="ml-3 flex flex-col">
                                                        <Skeleton height={20} width={200}/>
                                                        <Skeleton height={10} width={100}/>
                                                    </div>
                                                </div>
                                                <Skeleton height={10} width={30}/>
                                            </div>
                                    ))
                                }
                            </div>
                            <Link to="/dashboard/new-episode" className="bg-gray-400 dark:bg-gray-700 hover:bg-gray-600 transition duration-150 rounded-full p-3 bottom-0 fixed right-0 mb-10 mr-10 sm:mr-20">
                                <Plus className="text-white"/>
                            </Link>
                        </div>
                        <div className="sm:w-2/5 sm:mt-0 mt-5 mr-3 dark:bg-gray-900 bg-white shadow-sm hover:shadow-md">
                            <div className="bg-white dark:bg-gray-900">
                            <div className="p-3 flex justify-between">
                                <h3 className="text-md font-medium dark:text-gray-200">Series</h3>
                                <Link to="#" onClick={() => setSerieDropdownOpen(!serieDropdownOpen)}
                                        aria-expanded={serieDropdownOpen} ref={trigger} className="bg-gray-100 dark:bg-gray-800 p-1 rounded-sm">
                                        <DotsHorizontal className="h-4 w-4 dark:text-gray-200"/>
                                        <Transition
                                        className="z-10 absolute right-14 min-w-44 dark:bg-gray-800 bg-white py-1.5 rounded-sm shadow-lg overflow-hidden mt-1"
                                        show={serieDropdownOpen}
                                    >
                                        <div
                                        ref={dropdown}
                                        onFocus={() => setSerieDropdownOpen(true)}
                                        onBlur={() => setSerieDropdownOpen(false)}
                                        >
                                        <ul>
                                            <li>
                                            <Link
                                                className="font-medium text-sm dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-50 flex items-center py-1 px-3"
                                                to="/dashboard/new-serie"
                                                onClick={() => setSerieDropdownOpen(!serieDropdownOpen)}
                                            >
                                                <PencilAlt className="text-gray-600 dark:text-gray-300 w-5 h-5"/> Create a serie
                                            </Link>
                                            </li>
                                        </ul>
                                        </div>
                                    </Transition>
                                    </Link>
                            
                            </div>

                            <div className="p-3">
                                {!isLoading ?
                                (episodes.length !== 0 ?
                                 episodes.map((value) => (
                                <div key={value.id}>
                                    <SerieModal 
                                    serieId={value.id}
                                    title={value.title} 
                                    published={value.created_at} 
                                    description={value.description} 
                                    seriesPublishedDate={value.created_at} 
                                    seasons={value.seasons} 
                                    subscription={value.subscription_type}
                                    seriesCoverArt={value.cover_art}
                                    />
                                </div>
                                )) : 
                                <div className="sm:px-14 py-20 flex flex-col items-center">
                                        <p className="dark:text-gray-300 text-gray-500 text-sm font-semibold mt-2 flex items-center space-x-2">
                                        <ExclamationCircleOutline className="w-5 h-5 mr-3"/>
                                        You have no podcast series, <Link to="/dashboard/new-serie" className="text-blue-400 underline">create</Link>
                                        </p>
                                    </div>
                                ) : <div
                                    className="flex justify-between p-3 border-b dark:border-gray-700 dark:hover:bg-gray-800 border-gray-200 hover:bg-gray-100 transition duration-150">
                                        <div className="flex flex-col">
                                            <Skeleton height={20} width={100}/>
                                            <Skeleton className="mt-2" height={10} width={30}/>
                                        </div>
                                        <Skeleton height={10} width={30}/>
                                    </div>}
                            </div>
                            </div>

                            <div className="bg-blue-400 rounded-sm sm:mt-0 sm:mb-0 mb-5 mt-5 p-3">
                                <div className="flex justify-between">
                                    <h3 className="text-md font-semibold text-white">Upcoming events</h3>
                                    <Link to="#" onClick={() => setDropdownOpen(!dropdownOpen)}
                                        aria-expanded={dropdownOpen} ref={trigger} className="bg-gray-100 dark:bg-gray-800 p-1 rounded-sm">
                                        <DotsHorizontal className="h-4 w-4 dark:text-gray-200"/>
                                        <Transition
                                        className="z-10 absolute right-14 min-w-44 bg-white dark:bg-gray-800 py-1.5 rounded-sm shadow-lg overflow-hidden mt-1"
                                        show={dropdownOpen}
                                    >
                                        <div
                                        ref={dropdown}
                                        onFocus={() => setDropdownOpen(true)}
                                        onBlur={() => setDropdownOpen(false)}
                                        >
                                        <ul>
                                            <li>
                                            <Link
                                                className="font-medium dark:text-gray-300 text-sm hover:bg-gray-50 flex items-center py-1 px-3"
                                                to="#"
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                            >
                                                <PencilAlt className="dark:text-gray-300 text-gray-600 w-5 h-5"/> Create event
                                            </Link>
                                            </li>
                                            <li>
                                            <Link
                                                className="font-medium text-sm dark:text-gray-300 hover:bg-gray-50 flex items-center py-1 px-3"
                                                to="/dashboard/events"
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                            >
                                                <ViewList className="dark:text-gray-300 text-gray-600 w-5 h-5"/> View events
                                            </Link>
                                            </li>
                                        </ul>
                                        </div>
                                    </Transition>
                                    </Link>

                                    
                                </div>
                                <h3 className="mt-3 text-white text-lg">
                                    Share upcoming episodes and series to keep people expectant and notified
                                </h3>
                                <p className="text-sm text-center mt-3 text-white">
                                    Be able to share upcoming episodes and series, even events on your profile's feed so that people are kept expectant of the coming event. Be able to also make your updates reach thousands in no time! This right here is the filling of the gap podcasting has been missing... so sign up now.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Alert
                 icon={"🚀"}
                 message={"Podcast created successfully!"}
                 /> */}
            </DashboardMain>
        </div>
    )
}

export default Episodes