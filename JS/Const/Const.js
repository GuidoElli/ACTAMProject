//constants and parameters
const MAX_FREQUENCY = 20000;

const TOTAL_TRACKS = 80;
const MIN_VISIBLE_TRACKS = 7;
const MAX_TRACKS_TO_SHOW_BUTTON_LABELS = 30;

//Zoom
const ZOOM_CENTER_RELATIVE_INCREMENT = 0.05;
const ZOOM_WIDTH_RELATIVE_INCREMENT = 0.12;

//Knobs
const KNOB_MAX_PIXEL = 300;
const KNOB_MAX_PIXEL_FINE = 4000;

//editors
const MAX_VE_AMOUNT = 50;
const MAX_FE_AMOUNT = 200;

//dadj
const MAX_DADJ_FREQ_RANGE = 200; //cents
const MAX_DADJ_VOL_RANGE = 200; //cents
const MAX_MIN_DADJ_VOL_AMOUNT = 50; //dB


//Audio
const MAX_DB = 0;
const MIN_DB = -80;

const MAX_MIN_CENTS = 100;



var CTRL_DOWN = false;
var SHIFT_DOWN = false;



const EDITOR_SHAPE = {
   FLAT: "flat",
   CURVE: "curve",
   TRIANGLE: "triangle"
}
const SELECTION_MODE = {
   ADD: "add",
   REMOVE: "remove",
   TOGGLE: "toggle"
}
const LAYOUT_LEFT = {
   HOME: "home",
   VOL: "vol",
   FREQ: "freq",
   DADJ: "dadj",
   SETTINGS: "settings",
   SELECTION: "selection",
   HELP: "help"
}
const LAYOUT_RIGHT = {
   DEFAULT: "DEFAULT",
   FREQ_ONLY: "FREQ_ONLY",
   VOL_ONLY: "VOL_ONLY"
}


//functions for .every()
const is_true = (elem) => {return elem};
const is_false = (elem) => {return !elem};


