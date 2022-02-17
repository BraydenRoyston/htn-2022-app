import styled from 'styled-components';
import { useSpring, animated} from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import RelatedEvent from './RelatedEvent';

const EventModal = (props) => {
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
    return(
        <Wrapper
            onMouseMove={({clientX: x, clientY: y}) => (set({xys: calc(x, y)}))}
            onMouseLeave={() => set({xys:[0,0,1]})}
            style={{
                transform: options.xys.interpolate(trans)
            }}
        >
            <Header>
                <XButton onClick={props.onClose}mode={props.mode}>x</XButton>
            </Header>

            <EventHeader>
                <Title>{props.event.name}</Title>
                <EventDate>{getDay(props.event.start_time)}, {getTime(props.event.start_time)} - {getTime(props.event.end_time)}</EventDate>
            </EventHeader>

            <ExtraDetails>
                <Description>{props.event.description}</Description>

                <HostsAndRelated>
                    { props.event.speakers.length > 0 ? <SpeakersSection>
                        <Subtitle>Hosted by</Subtitle>
                        <Headshots>
                            {props.event.speakers.map((val) => {
                                return(
                                    <Speaker>
                                        {val.profile_pic ? 
                                            <SpeakerHeadshot src={val.profile_pic}/> : 
                                            <FontAwesomeIcon size="xl" icon={faUserCircle} style={
                                                props.mode ?
                                                {
                                                    "color": "black", 
                                                    "transition": "all 1s ease",
                                                    "fontSize": "100px"
                                                }
                                                : {
                                                    "color": "black", 
                                                    "transition": "all 1s ease",
                                                    "fontSize": "100px"
                                                }
                                            }/>
                                        }
                                        <SpeakerName>{val.name}</SpeakerName>
                                    </Speaker>
                                );
                            })}
                        </Headshots>
                    </SpeakersSection>:
                    null }
                    { props.event.related_events.length > 0 ?
                        <RelatedWrapper>
                            <Subtitle>Related Events</Subtitle>
                            <RelatedEvents>
                                {props.event.related_events.map((val) => {
                                    return(
                                        <RelatedEvent 
                                            mode={props.mode}
                                            event_id={val}
                                            events={props.events}
                                            callback={props.onRelatedClick}
                                        />
                                    );
                                })}
                            </RelatedEvents>
                            <JoinWrapper>
                                <Subtitle>Joining Info</Subtitle>
                                <JoinDetails>
                                    {props.event.public_url ? 
                                        <Join mode={props.mode} href={props.event.public_url} target="_blank">Join public event</Join>
                                        : null
                                    }
                                    {props.verified ? 
                                        <Join mode={props.mode} href={props.event.private_url} target="_blank">Join private event</Join>
                                        : null
                                    }
                                </JoinDetails>
                            </JoinWrapper>
                        </RelatedWrapper>
                        : null
                    }
                </HostsAndRelated>
                
                
            </ExtraDetails>
        </Wrapper>
    );
}

const Wrapper = styled(animated.div)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 50vw;
    padding: 25px;
    margin: 25px;    

    border-radius: 25px;

    transition: all 1s ease;

    background: linear-gradient(
        to right bottom,
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.3)
    );

    outline: none;
    box-shadow: 0px 0px 20px var(--white);
`

const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    width: 100%;
`

const XButton = styled.button`
    text-align: center;
    vertical-align: middle;
    cursor: pointer;

    padding: 10px;
    width: 40px;
    height: 40px;
    border: none;
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
    border-radius: 50%;
    
    font-size: var(--fs-subtitle);
    font-weight: var(--fw-title);
    color: white;
`

const EventHeader = styled.div``

const Title = styled.h1`
    font-size: var(--fs-title);
    font-weight: var(--fw-title);

    text-align: center;
`

const Subtitle = styled.h2`
    font-size: var(--fs-subtitle);
    font-weight: var(--fw-title);
    font-style: italic;

    text-align: center;
`

const EventDate = styled.h3`
    font-size: var(--fs-subtitle);
    font-weight: var(--fw-subtitle);
    font-style: italic;

    text-align: center;
`

const Description = styled.div`
    font-size: var(--fs-body);
    font-weight: var(--fw-body);
    
    text-align: center;
    margin: 15px;
`

const ExtraDetails = styled.div`
    margin-bottom: 25px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SpeakersSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-right: 15px;
    padding-left: 15px;
    padding-bottom: 15px;
    border-radius: 15px;
`

const HostsAndRelated = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
`

const Headshots = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

const Speaker = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SpeakerHeadshot = styled.img`
    height: 100px;
    width: 100px;

    border-radius: 50%;
`

const SpeakerName = styled.div`
    font-size: var(--fs-body);
    font-weight: var(--fw-body);
    text-align: center;
`

const JoinDetails = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Join  = styled.a`
    font-size: var(--fs-body);
    font-weight: var(--fw-body);
    color: var(--white);

    text-decoration: none;

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
    cursor: pointer;
    padding: 10px;


    &:hover {
        background: ${props => props.mode ? 
            `linear-gradient(
                to right bottom,
                rgba(79, 147, 126, 1),
                rgba(79, 147, 126, 0.7)
            );`:
            `linear-gradient(
                to right bottom,
                rgba(10, 68, 109, 1),
                rgba(10, 68, 109, 0.7)
        );`}
    }
`

const RelatedWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const RelatedEvents = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const JoinWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default EventModal;

