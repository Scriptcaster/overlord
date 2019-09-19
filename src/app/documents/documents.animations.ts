import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';
export const Animations = {
    fade: trigger('openClose', [
        state('open', style({
            opacity: 1,
        })),
        state('closed', style({
            opacity: 0,
        })),
        transition('open <=> closed', animate(800)),
    ])
}

