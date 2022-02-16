import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const EventCard = (props) => {
    // state ***************************************
    const [options, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: {
            mass: 50,
            tension: 50,
            friction: 100
        },
    }));
    // *********************************************

    // helper functions ****************************
    const handleClick = () => {
        props.callback(props.event);
    }

    const getDay = (unixDate) => {
        return Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit' })
            .format(unixDate).toString();
    }

    const getTime = (unixDate) => {
        return Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric'
        }).format(unixDate)
    }

    const calc = (x, y) => {
        return [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1];
    }
    const trans = (x, y, s) => {
        return `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
    }
    // *********************************************

    // jsx *****************************************
    return(
        <Event 
            key={props.event.id} 
            onMouseMove={({clientX: x, clientY: y}) => (set({xys: calc(x, y)}))}
            onMouseLeave={() => set({xys:[0,0,1]})}
            style={{
                transform: options.xys.interpolate(trans)
            }}
            mode={props.mode}
            onClick={handleClick}
        >
            <EventHeader>
                <Title>{props.event.name}</Title>
                <EventDate>{getDay(props.event.start_time)}, {getTime(props.event.start_time)} - {getTime(props.event.end_time)}</EventDate>
                <EventType>{props.event.event_type == 'workshop' ? "Workshop" : props.event.event_type == 'tech_talk' ? "Tech Talk" : "Activity"}</EventType>
            </EventHeader>
        </Event>
    );
    // *********************************************
}

const Event = styled(animated.div)`
    cursor: pointer;

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

const EventHeader = styled.div``

const Title = styled.h1`
    font-size: var(--fs-title);
    font-weight: var(--fw-title);

    text-align: center;
`

const EventDate = styled.h3`
    font-size: var(--fs-subtitle);
    font-weight: var(--fw-subtitle);
    font-style: italic;

    text-align: center;
`

const EventType = styled.div`
    font-size: var(--fs-subtitle);
    font-weight: var(--fw-title);
    font-style: italic;

    text-align: center;
`
export default EventCard;