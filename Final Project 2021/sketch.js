//may not work on safari
// Declare a "SerialPort" object
var serial;

let mySound;
let loopStart = 0.5;
let loopDuration = 0.2;
// fill in the name of your serial port here: 
var portName = "/dev/tty.usbmodem141101";


var inMessage = [0, 0];
let img;

function preload() {
   soundFormats('mp3', 'ogg');
    mySound = loadSound('DBZ Spirit Bomb Sound Effect.mp3');
  imgbg = loadImage("Images/bg.png");
  imgG = loadImage("Images/Goku.png");
  imgs = loadImage("Images/spiritbomb.png");
}


function setup() {
  createCanvas(400,400);

  // make an instance of the SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results. See gotList, below:
  serial.list();

  // Assuming our Arduino is connected,  open the connection to it
  serial.open(portName);

  // When you get a list of serial ports that are available
  serial.on('list', gotList);

  // When you some data from the serial port
  serial.on('data', gotData);
  imageMode(CENTER);
  mySound.play();
  mySound.loop();
  
}


// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    console.log(i + " " + thelist[i]);
  }
}

// Called when there is data available from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming data
  trim(currentString);                    // trim off trailing whitespace
  if (!currentString) return;             // if the incoming string is empty, do no more
  console.log(currentString);
      inMessage = split(currentString, '&');   // save the currentString to use for the text
}

function draw() {
  image(imgbg,width/2,height/2,width,height);
  fill(0,0,0);
    if (inMessage[1] == 1){
        fill(0,255,255 );
    }
  image(imgs,width/2.05, height/6, map(inMessage[0], 0, 1023, 0, width), map(inMessage[0], 0, 1023, 0, height));
  translate(0,150,imgG)
  image(imgG,width/2.05,height/2,width/3.5,250) ;
}

function mousePressed(){
  serial.write("1");
}
function mouseReleased(){
  serial.write("0");
}


