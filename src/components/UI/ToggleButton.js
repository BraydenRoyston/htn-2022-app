import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ToggleButton = (props) => {
    return (
        <SwitchWrapper>
            <FontAwesomeIcon size="xl" icon={faSun} style={
                props.mode ?
                {"color": "black", "transition": "all 1s ease"}
                : {"color": "black", "transition": "all 1s ease"}
            }/>
            <Switch>
                <Checkbox type="checkbox" onClick={props.callback}/>
                <Slider className="slider"/>
            </Switch>
            <FontAwesomeIcon size="xl" icon={faMoon} style={
                props.mode ?
                {"color": "black", "transition": "all 1s ease"}
                : {"color": "black" , "transition": "all 1s ease"}
            }/>
        </SwitchWrapper>
        
    );
}

const SwitchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    // padding: 10px;
    // border-radius: 15px;

    // background: linear-gradient(
    //     to right bottom,
    //     rgba(10, 68, 109, 0.7),
    //     rgba(10, 68, 109, 0.3)
    // );
`

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin-left: 10px;
    margin-right: 10px;
`

const Checkbox = styled.input`
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
        background-color: var(--dark-green);
    }

    &:focus + .slider {
        box-shadow: 0 0 1px var(--dark-green);
    }

    :checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }
`

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--dark-blue);
    -webkit-transition: .4s;
    transition: .4s;

    border-radius: 34px;

    &:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }
`

export default ToggleButton;