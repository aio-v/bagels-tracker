import React from 'react';

export default class TimerCard extends React.Component {
    
    constructor(props) {
        super(props);
        let weekEndDates = this.findWeekEndDates(props.cutoff);
        this.state = {
            cutoffDate: weekEndDates[0],
            resetDate: weekEndDates[1],
            daysLeft: 0,
            hoursLeft: 0,
            minutesLeft: 0,
            secondsLeft: 0,
            reminderText: props.reminder
        };
    }
   
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    findWeekEndDates(cutoff) {
        let currDate, currDay, nextCutoffDay, nextCutoffMilli, nextResetMilli;

        currDate = new Date();
        currDate.setUTCHours(0, 0, 0, 0);

        currDay = currDate.getUTCDay();
        
        nextCutoffDay = (cutoff.day + 7 - currDay) % 7;
        nextCutoffMilli = (nextCutoffDay * 24 * 60 * 60 * 1000) + (cutoff.hour * 60 * 60 * 1000) + (cutoff.minute * 60 * 1000);
        
        nextResetMilli = nextCutoffMilli + (1 * 60 * 60 * 1000);

        return [new Date(currDate.getTime() + nextCutoffMilli), new Date(currDate.getTime() + nextResetMilli)];
    }

    tick() {
        let currDate = new Date();
        if(currDate.getTime() >= this.state.cutoffDate.getTime() && currDate.getTime() < this.state.resetDate.getTime()) {
            this.setState({
                daysLeft: 0,
                hoursLeft: '00',
                minutesLeft: '00',
                secondsLeft: '00'
            });
            return;
        }

        let timeLeftInMs, timeOffset, daysLeft, hoursLeft, minsLeft, secsLeft,
            pad = function(n) {
                return n < 10 ? '0' + n : n;
            };
        
        timeLeftInMs = this.state.cutoffDate.getTime() - (currDate).getTime();
        daysLeft =  Math.floor(timeLeftInMs / (24*60*60*1000));
        timeOffset = daysLeft * 24*60*60*1000;
        hoursLeft = Math.floor((timeLeftInMs - timeOffset) / (60*60*1000));
        timeOffset += (hoursLeft * 60*60*1000);
        minsLeft = Math.floor((timeLeftInMs - timeOffset) / (60*1000));
        timeOffset += (minsLeft * 60*1000);
        secsLeft = Math.floor((timeLeftInMs - timeOffset) / 1000);

        this.setState({
            daysLeft: daysLeft,
            hoursLeft: pad(hoursLeft),
            minutesLeft: pad(minsLeft),
            secondsLeft: pad(secsLeft)
        });
    }

    render() {
        return (
            <div>Time Left to Complete: {this.state.daysLeft}D {this.state.hoursLeft}hr {this.state.minutesLeft}min {this.state.secondsLeft}sec </div>
        );
    }
}