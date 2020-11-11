import { trigger, state, style, transition, animate } from '@angular/animations';



export const BoxAnimation = trigger('boxAnimation', [
    state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
    })),
    state(
        '*',
        style({
            opacity: 1,
            transform: 'rotate( 0deg )'
        })
    ),
    transition(
        'void => * , * => void',
        [
            animate('500ms ease-in-out')
        ]
    )
]);
