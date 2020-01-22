//create an autofilter and start it's LFO
var autoFilter = new Tone.AutoFilter("2");

autoFilter.baseFrequency = 1500;

//autoFilter.filter.rolloff = -12;

console.log(autoFilter.filter.frequency);

autoFilter.toMaster().start();
//route an oscillator through the filter and start it

var oscillator = new Tone.Oscillator(35, type='sawtooth');

// oscillator.detune.value = -200;

oscillator.connect(autoFilter).start();