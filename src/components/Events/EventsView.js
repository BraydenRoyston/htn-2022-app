import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';
import LogIn from './LogIn';
import EventModal from './EventModal';
import EventCard from './EventCard';
import SearchInput from '../UI/TextInput';
import FilterButton from '../UI/FilterButton';

const EventsView = (props) => {
    // state ***************************************
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [filterInput, setFilterInput] = useState("");
    const [filters, setFilters] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [logInError, setLogInError] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    // *********************************************

    // useEffects **********************************
    useEffect(() => {
        // initial fetch
        fetchEvents();
    }, []);

    useEffect(() => {
        // sets filtered events after inital fetch
        filterEvents();
    }, [events]);

    useEffect(() => {
    }, [filteredEvents]);
    
    useEffect(() => {
        // when filter input changes, update filtered events
        filterEvents();
    }, [filterInput]);

    useEffect(() => {
        // when selected filters change, update filtered events
        filterSelectedEvents();
    }, [filters]);

    useEffect(() => {
        console.log('logged in use effect: ', loggedIn);
    }, [loggedIn])
    // *********************************************

    // helper Functions ****************************
    const fetchEvents = async () => {
        // fetches events from endpoint
        try {
            let res = await axios.get('https://api.hackthenorth.com/v3/events');
            await setEvents(orderByDate(res.data));
            
        } catch (e) {
            console.log(e);
        }
    }

    const orderByDate = (newEvents) => {
        // sorts an array of events by start date in ascending order
        let sorted = newEvents.sort((event1, event2) => {
            return (event1.start_time - event2.start_time);
        });
        return sorted;
    }

    const filterEvents = () => {
        // filters events (based on input)
        if (filterInput === "") {
            setFilteredEvents(events);
            return;
        };

        let filteredResults = events.filter((event) => {
            return event.name.toLowerCase().startsWith(filterInput.toLowerCase());
        });
        setFilteredEvents(filteredResults);
    }

    const filterSelectedEvents = () => {
        // filters events (based on selected filters)
        if (!filters.length) {
            setFilteredEvents(events);
            return;
        }

        let filteredResults = events.filter((event) => {
            return filters.includes(event.event_type);
        });
        setFilteredEvents(filteredResults);
    }

    const filterFromButtons = async (mode, filter) => {
        // wrapper to control selected filters state
        if (mode === "add") {
            // add mode
            await setFilters([...filters, filter]);
        } else {
            // remove mode
            await setFilters(filters.filter((fil) => {
                return (fil != filter);
            }));
        }
    }

    const onLogin = async (email, password) => {
        // "authenticates" the user and logs them in
        if (email != "" && password != "") {
            if (email.includes("hackthenorth.com")) {
                props.toggleVerify(true);
                setFilteredEvents(events);
                setEmail(email);
                setLoggedIn(true);
                return;
            } else {
                props.toggleVerify(false);
                let filteredResults = events.filter((event) => {
                    return event.permission === "public";
                });
                setEvents(filteredResults);
                setFilteredEvents(filteredResults);
                setEmail(email);
                setLoggedIn(true);
                return;
            }
        } else {
            setLogInError(true);
        }
    }

    const onCardClick = (event) => {
        setCurrentEvent(event);
    }

    const onModalClose = () => {
        setCurrentEvent(null);
    }

    const switchModals = (newEvent) => {
        setCurrentEvent(newEvent);
    }
    // *********************************************

    // jsx *****************************************
    return(
        <Events mode={props.mode}>
            {!loggedIn ?
                <LogIn callback={onLogin} error={logInError} mode={props.mode}/> :
                currentEvent === null ?
                <Content>
                    <Controls>
                        <EventsTitle>Filter by event name...</EventsTitle>
                        <SearchInput 
                            callback={(e) => setFilterInput(e.target.value)}
                            placeholder="Enter name here..."
                        />
                        <EventsTitle>Filter by event type...</EventsTitle>
                        <FiltersWrapper>
                            <FilterButton callback={filterFromButtons} name={"Tech Talks"} eventType={"tech_talk"}/>
                            <FilterButton callback={filterFromButtons} name={"Workshops"} eventType={"workshop"}/>
                            <FilterButton callback={filterFromButtons} name={"Activities"} eventType={"activity"}/>
                        </FiltersWrapper>
                        {props.verified ? 
                            <Subtitle>Heads up! Since you logged in with {email}, you're a verified VIP and can check out private events 😎</Subtitle>
                            : <Subtitle>Heads up! Since you logged in with {email}, you can't see private events. Refresh and use an "@hackthenorth.com" email to change that!</Subtitle>
                        }
                    </Controls>
                    <EventsWrapper>
                        <Inner>
                            {!filteredEvents.length ? <NullCard >No events found that start with "{filterInput}"</NullCard> :
                            filteredEvents.map((val) => {
                                return(
                                    <EventCard 
                                        key={val.id} 
                                        callback={onCardClick}
                                        mode={props.mode} 
                                        event={val} 
                                        verified={props.verified}
                                    />
                                );
                            })}
                        </Inner>
                    </EventsWrapper>
                </Content> :   
                <EventModal
                    event={currentEvent}
                    onClose={onModalClose}
                    mode={props.mode}
                    verified={props.verified}
                    events={events}
                    onRelatedClick={switchModals}
                />
            }
        </Events>
    );
    
    // *********************************************
}

const Events = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 85vh;
    width: 70vw;

    transition: all 1s ease;

    background: ${props => props.mode ? 
        `linear-gradient(
            to right bottom,
            rgba(79, 147, 126, 0.7),
            rgba(79, 147, 126, 0.3)
        );`:
        `linear-gradient(
            to right bottom,
            rgba(10, 68, 109, 0.7),
            rgba(10, 68, 109, 0.3)
        );`}

    border-radius: 25px;
    margin: 25px;
`

const Subtitle = styled.h2`
    font-size: var(--fs-subtitle);
    font-weight: var(--fw-subtitle);
    // font-style: italic;
    color: var(--white);

    text-align: center;
`

const Content = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    @media (max-width: 1435px) {
        flex-direction: column;
    }
`

const FiltersWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const EventsTitle = styled.h4`
    font-size: var(--fs-subtitle);
    font-weight: var(--fw-subtitle);
    color: var(--white);

    margin-bottom: -10px;
`

const EventsWrapper = styled.div`    
    height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 1435px) {
        height: 30vh;
    }
`

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NullCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 40vw;
    padding: 25px;
    margin: 25px;    

    border-radius: 25px;

    transition: all 1s ease;

    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.3)
    );

    transition: all 1s ease;
    transition: height 1s linear;

    box-shadow: ${(props) => props.details ? "0px 0px 20px var(--white);" : "none"}
`

const Controls = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    margin-top: 25px;
    width: 20vw;
    // height: 50%; // testing

    // background: linear-gradient(
    //     to right bottom,
    //     rgba(255, 255, 255, 0.7),
    //     rgba(255, 255, 255, 0.3)
    // );

    // z-index: -1;
`


export default EventsView;