import { TimepickerUI } from '../src/node_modules/timepicker-ui/dist/timepicker-ui.esm.js';

const element = document.querySelector(".example2");
const myTimePicker = new TimepickerUI(element);

const element2 = document.querySelector(".example3");
const myTimePicker2 = new TimepickerUI(element2);
myTimePicker.create();
myTimePicker2.create();