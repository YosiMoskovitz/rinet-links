import { React, useState, useEffect } from 'react'
import { HDate, Locale, DafYomi, gematriya } from '@hebcal/core';
import { SwitchTransition, CSSTransition } from "react-transition-group";

import './InfoDivs.css'

var counter = 0;

export const InfoDivs = () => {
    const [nowTime, setNowTime] = useState(getTime());
    const [state, setState] = useState(counter);
    useEffect(() => {
        setInterval(() => setNowTime(getTime()), 1000);
        setInterval(() => setState(getdivId()), 10000)
    }, []);

    const divs = [
        <div>{nowTime}</div>,
        <div>{getHebDate()}</div>,
        <div>{`דף היומי:  ${getDafYomi()}`}</div>
    ]

    return (
        <div>
            <SwitchTransition mode='out-in'>
                <CSSTransition
                    key={state}
                    addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                    }}
                    classNames="fade"
                >
                    <div className="slider-container">
                        <div className="slide">{divs[state]}</div>
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}

const getTime = () => {
    const dateObj = new Date();
    const d = dateObj.toTimeString();
    return d.split(' ')[0];
}

const getHebDate = () => {
    const hebDate = new HDate(new Date());
    const hebDateNoNi = Locale.hebrewStripNikkud(hebDate.renderGematriya())
    return hebDateNoNi;
}

const getDafYomi = () => {
    const dafYomi = new DafYomi(new Date());
    const masecta = dafYomi.render('he').split(' ')[0]
    const daf = gematriya(dafYomi.getBlatt())
    return masecta + ' ' + daf
}

const getdivId = ()=> {
    counter <= 1 ? counter ++ : counter = 0
    return counter
}
