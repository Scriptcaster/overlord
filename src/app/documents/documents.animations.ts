import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
export const Animations = {
    fade: trigger('fadeState', [
        state('normal', style({
            opacity: 0,
            transform: 'translateY(-20px)'
        })),
        state('highlighted', style({
            opacity: 1,
            transform: 'translateX(0)'
        })),
        transition('normal <=> highlighted', animate(300)),
    ])
}