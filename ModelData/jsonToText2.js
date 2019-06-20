let fs = require('fs');

var StressArr = new Array(1800).fill(0);
var ActivityArr = new Array(1800).fill(0);
var AudioArr = new Array(1800).fill(0);
var CallArr = new Array(1800).fill(0);
var LockArr = new Array(1800).fill(0);
var wStream = fs.createWriteStream('finalResult.txt');

for(let i = 0;i<60;i++){
  var StressFileName = 'z_StressResult'+i.toString()+'.txt';
  var ActivityFileName = 'z_ActivityResult'+i.toString()+'.txt';
  var AudioFileName = 'z_AudioResult'+i.toString()+'.txt';
  var CallFileName = 'z_CallResult'+i.toString()+'.txt';
  var LockFileName = 'z_LockResult'+i.toString()+'.txt';

  if(fs.existsSync(StressFileName) && fs.existsSync(ActivityFileName)
&& fs.existsSync(AudioFileName) && fs.existsSync(CallFileName)
&& fs.existsSync(LockFileName)){

    var StressData = fs.readFileSync(StressFileName).toString();
    var ActivityData = fs.readFileSync(ActivityFileName).toString();
    var AudioData = fs.readFileSync(AudioFileName).toString();
    var CallData = fs.readFileSync(CallFileName).toString();
    var LockData = fs.readFileSync(LockFileName).toString();

    var tempStress = StressData.split(" ");
    for(let j=0;j<StressData.length;j++){
      StressArr[30*i+j] = (tempStress[j])*1;
    }
    var tempActivity = ActivityData.split(" ");
    for(let j=0;j<ActivityData.length;j++){
      ActivityArr[30*i+j] = tempActivity[j]*1;
    }
    var tempAudio = AudioData.split(" ");
    for(let j=0;j<AudioData.length;j++){
      AudioArr[30*i+j] = tempAudio[j]*1;
    }
    var tempCall = CallData.split(" ");
    for(let j=0;j<CallData.length;j++){
      CallArr[30*i+j] = tempCall[j]*1;
    }
    var tempLock = LockData.split(" ");
    for(let j=0;j<LockData.length;j++){
      LockArr[30*i+j] = tempLock[j]*1;
    }
  }
}

// data merge
let cnt = 0;
for(let i = 0;i<1800;i++){
  if(StressArr[i]>0 && ActivityArr[i]>0 && AudioArr[i]>0 && CallArr[i]>0 && LockArr[i]>0){
    //console.log("Stress "+StressArr[i]+" Activity "+ActivityArr[i]+" Audio "+AudioArr[i]+" Call "+CallArr[i]+" Lock "+LockArr[i]);
    if(StressArr[i] == 10) StressArr[i] = 2;
    else StressArr[i] = 1;
    wStream.write(ActivityArr[i]+" "+AudioArr[i]+" "+CallArr[i]+" "+LockArr[i]+" "+StressArr[i]+"\n");
    cnt++;
  }
}
wStream.write(cnt+"\n");
wStream.end();
