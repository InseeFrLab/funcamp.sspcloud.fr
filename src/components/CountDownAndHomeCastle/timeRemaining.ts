
import type { StatefulReadonlyEvt } from "evt";
import moment from "moment-timezone";
import { Evt } from "evt";
import memoizee from "memoizee";

export type CountdownTargetDate = {
    endtimeYear: number;
    endtimeMonth: number;
    endtimeDate: number;
    endtimeHours: number;
};

export type timeRemaining = {
    total: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const getEvtTimeRemaining =
    memoizee(
        (countdownTargetDate: CountdownTargetDate): StatefulReadonlyEvt<timeRemaining> => {

            const evt = Evt.create<timeRemaining>({
                "days": NaN,
                "hours": NaN,
                "minutes": NaN,
                "seconds": NaN,
                "total": NaN
            });

            //var timeNow = new Date();

            var tZ = "Europe/Paris";

            var endYear = countdownTargetDate.endtimeYear;
            var endMonth = countdownTargetDate.endtimeMonth;
            var endDate = countdownTargetDate.endtimeDate;
            var endHours = countdownTargetDate.endtimeHours;
            var endMinutes = 0;
            var endSeconds = 0;

            var deadline: any;

            if (tZ === "") {
                deadline = new Date(endYear, endMonth - 1, endDate, endHours, endMinutes, endSeconds);
            }
            else {
               deadline = moment.tz([endYear, endMonth - 1, endDate, endHours, endMinutes, endSeconds], tZ).format();
            }

            /*
            if (Date.parse(deadline) < Date.parse(timeNow as any)) {
                deadline = new Date(Date.parse(new Date() as any) + endDate * 24 * 60 * 60 * 1000 + endHours * 60 * 60 * 1000);
            }
            */

            var timeinterval = NaN as any as ReturnType<typeof setInterval>;

            function updateClock() {


                evt.state = ((endtime) => {

                    //@ts-ignore
                    var t = Date.parse(endtime) - Date.parse(new Date());

                    var seconds = Math.floor((t / 1000) % 60);
                    var minutes = Math.floor((t / 1000 / 60) % 60);
                    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                    var days = Math.floor(t / (1000 * 60 * 60 * 24));

                    return {
                        'total': t,
                        'days': days,
                        'hours': hours,
                        'minutes': minutes,
                        'seconds': seconds
                    };

                })(deadline);

                if (evt.state.total < 0) {
                    clearInterval(timeinterval);
                }

            }

            updateClock();

            //TODO: We absolutely need to update EVT to handle this use case
            Evt.merge([
                evt.evtAttach,
                evt.evtChange.evtAttach,
                evt.evtChangeDiff.evtAttach,
                evt.evtDiff.evtAttach
            ]).attach(
                () => evt.getHandlers().length +
                    evt.evtChange.getHandlers().length +
                    evt.evtChangeDiff.getHandlers().length +
                    evt.evtDiff.getHandlers().length === 1,
                () => {

                    updateClock();
                    timeinterval = setInterval(updateClock, 1000)

                }
            );

            Evt.merge([
                evt.evtDetach,
                evt.evtChange.evtDetach,
                evt.evtChangeDiff.evtDetach,
                evt.evtDiff.evtDetach
            ]).attach(
                () => evt.getHandlers().length +
                    evt.evtChange.getHandlers().length +
                    evt.evtChangeDiff.getHandlers().length +
                    evt.evtDiff.getHandlers().length === 0,
                () => clearInterval(timeinterval)
            );

            return evt;

        }
    );