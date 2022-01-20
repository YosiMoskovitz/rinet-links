import { React, useState, useEffect, /*useRef*/ } from 'react'
import { HDate, Locale, DafYomi, gematriya, Sedra } from '@hebcal/core';
import { SwitchTransition, CSSTransition } from "react-transition-group";

import './InfoDivs.css'


const today = new Date();
const hebDate = new HDate(today);

var counter = 0;
var infoItems = [];

export const InfoDivs = () => {
    const [nowTime, setNowTime] = useState(getTime());
    const [state, setState] = useState(counter);

    // const nodeRef = useRef(null);


    useEffect(() => {
        setInterval(() => setNowTime(getTime()), 1000);
        setInterval(() => setState(getdivId()), 10000);
    }, []);

    infoItems = [
        nowTime,
        getParash(),
        getHebDate(),
        getFormattedDate(Date),
        `דף היומי:  ${getDafYomi()}`,
    ]
    const getdivId = ()=> {
        counter < infoItems.length-1 ? counter ++ : counter = 0
        return counter
    }

    return (
        <div>
            <SwitchTransition mode='out-in'>
                <CSSTransition
                    key={state}
                    // nodeRef={nodeRef}
                    addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                    }}
                    classNames="fade"
                >
                    <div className="slider-container">
                        <div className="slide">{infoItems[state]}</div>
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}

const getTime = () => {
    let today = new Date();
    const time = today.toTimeString();
    return time.split(' ')[0];
}

const getFormattedDate = () => {
    return today.toLocaleDateString("en-GB")
}

const getHebDate = () => {
    return Locale.hebrewStripNikkud(hebDate.renderGematriya());
}

const getDafYomi = () => {
    const dafYomi = new DafYomi(today);
    const masecta = dafYomi.render('he').split(/[0-9]/)[0];
    const daf = gematriya(dafYomi.getBlatt())
    return masecta + ' ' + daf
}

const getParash = () => {
    const thisYear = hebDate.getFullYear(); 
    const sedre = new Sedra(thisYear, 'il');
    const weekDate = today.toLocaleDateString('he', { weekday: 'long' });
    return weekDate+ ' ' + Locale.hebrewStripNikkud(sedre.getString(hebDate,'he'))
}

