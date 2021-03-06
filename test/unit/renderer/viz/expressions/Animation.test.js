import * as s from '../../../../../src/renderer/viz/expressions';
import { validateTypeErrors, validateStaticType, validateFeatureDependentErrors } from './utils';

describe('src/renderer/viz/expressions/Animation', () => {
    describe('error control', () => {
        validateFeatureDependentErrors('animation', [0.5, 'dependent']);
        validateTypeErrors('animation', ['category', 10]);
        validateTypeErrors('animation', ['number', 10, 'color']);
        validateTypeErrors('animation', ['color', 10]);
        validateTypeErrors('animation', ['number', 'color']);
    });

    describe('type', () => {
        validateStaticType('animation', ['number'], 'number');
        validateStaticType('animation', ['number', 10], 'number');
    });

    describe('.eval', () => {
        it('should eval to 0 when the input is 1', () => {
            expect(s.animation(1).eval()).toEqual(0);
        });

        it('should eval close to 1 when the input is 0 and the fading is high', () => {
            const t = s.animation(0, 10, s.fade(10));
            t._setTimestamp(0);
            expect(t.eval()).toEqual(1);
        });

        it('should eval close to 0.75 when the input is 0 and we have wait a quarter of the animation', () => {
            const t = s.animation(0, 1, s.fade(1));
            t._setTimestamp(0);
            t._setTimestamp(0.25);
            expect(t.eval()).toEqual(0.75);
        });
    });

    describe('.pause', () => {
        it('should pause the simulation when playing', () => {
            const t = s.animation(1, 10, s.fade(1));
            t._setTimestamp(0);
            t.pause();
            t._setTimestamp(1);
            expect(t.getProgressPct()).toEqual(0);
        });
    });

    describe('.play', () => {
        it('should start the simulation when paused/stopped', () => {
            const t = s.animation(1, 10, s.fade(1));
            t._setTimestamp(0);
            t.pause();
            t.play();
            t._setTimestamp(1);
            expect(t.getProgressPct()).toEqual(0.1);
        });
    });

    describe('.stop', () => {
        it('should stop the simulation when playing', () => {
            const t = s.animation(1, 10, s.fade(1));
            t._setTimestamp(0);
            t.stop();
            t._setTimestamp(1);

            expect(t.getProgressPct()).toEqual(0);
        });

        it('should reset the simulation time', () => {
            const t = s.animation(1, 10, s.fade(1));
            t._setTimestamp(0);
            t._setTimestamp(1);
            expect(t.getProgressPct()).toEqual(0.1);

            t.stop();
            expect(t.getProgressPct()).toEqual(0);
        });
    });

    describe('.setProgressPct', () => {
        it('should update the simulation progress percentage', () => {
            const t = s.animation(1, 10, s.fade(1));
            t._setTimestamp(0);
            t._setTimestamp(5);
            expect(t.getProgressPct()).toEqual(0.5);
            t.setProgressPct(0.4);
            t._setTimestamp(6);
            expect(t.getProgressPct()).toEqual(0.5);
        });
    });

    describe('.setTimestamp', () => {
        let t;
        beforeEach(() => {
            t = s.animation(s.linear(s.time('2018-06-13T00:00:00.070Z'), s.time('2018-06-10T00:00:00.070Z'), s.time('2018-06-15T00:00:00.070Z')), 10, s.fade(1));
            t._setTimestamp(0);
        });

        it('should throw an Range Error when date is below the lower limit ', () => {
            expect(() => {
                t.setTimestamp(new Date('2017-06-13T00:00:00.070Z'));
            }).toThrowError(RangeError, 'animation.setTimestamp requires the date parameter to be higher than the lower limit');
        });

        it('should throw an Range Error when date is over the higher limit ', () => {
            expect(() => {
                t.setTimestamp(new Date('2019-06-13T00:00:00.070Z'));
            }).toThrowError(RangeError, 'animation.setTimestamp requires the date parameter to be lower than the higher limit');
        });

        it('should update the simulation time when the date is valid', () => {
            const date = new Date('2018-06-14T00:00:00.070Z');
            t.setTimestamp(date);
            expect(t.getProgressValue().getTime()).toEqual(date.getTime());
            expect(t.getProgressPct()).toEqual(0.8);
        });
    });

    describe('.stop and .play', () => {
        it('should reset the simulation time', () => {
            const t = s.animation(1, 10, s.fade(1));
            t._setTimestamp(0);
            t._setTimestamp(1);
            expect(t.getProgressPct()).toEqual(0.1);
            t.stop();
            expect(t.getProgressPct()).toEqual(0);
            t.play();
            expect(t.getProgressPct()).toEqual(0);
            t._setTimestamp(2);
            expect(t.getProgressPct()).toEqual(0.1);
        });
    });
});
