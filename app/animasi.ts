import { trigger, state, style, transition, animate, query, animateChild, group } from '@angular/animations';

export const animasi =
    trigger('masuklist',[
      state('in',style(
        {
          opacity:0.1,
         //transform : 'translateX(0)',
          backgroundColor: 'green'
        }
      )),
      transition('void=>*',[
        style(
          {
            //transform : 'translateX(-100%)',
            opacity:0.1,
            backgroundColor: 'yellow'
          }
        ),
        animate('1s ease-out')
      ]),
      transition('*=>void',[animate('1s'), style({
        opacity:0.1,
        //transform : 'translateX(100%)',
        backgroundColor: 'green'
      })])
    ]);


export const animasiSlide =  trigger('animasiRouting', [
  transition('*=>*',[
    style(
      {
        transform : 'translateX(20%)',
        
      }
    ),
    animate('500ms ease-out')
  ]),
  transition('formobat=>*',[
    style(
      {
        backgroundColor: 'green'
      }
    ),
    animate('1s ease-out')
  ])
]);