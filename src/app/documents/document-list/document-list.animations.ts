import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
export const Animations = {
    fade: trigger('fadeState', [
        state('normal', style({
            'background-color': 'red',
            transform: 'translateX(0)'
        })),
        state('highlighted', style({
            'background-color': 'green',
            transform: 'translateX(100px)'
        })),
        transition('normal <=> highlighted', animate(300)),
    ])
}