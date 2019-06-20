let fs = require('fs');
let csv = require('csv-parser');


//change this i value to 1
for(let i = 0; i<60 ;i++){
  let rawdata; let student;
  let fileName; let activityfileName; let audiofileName;
  let calllogName; let phonelockName;

  // input data(Stress, yvalue)
  if(i<10){
    fileName = 'Stress_u0'+i.toString()+'.json';
    activityfileName = 'activity_u0'+i.toString()+'.csv';
    audiofileName = 'audio_u0'+i.toString()+'.csv';
    calllogName = 'call_log_u0'+i.toString()+'.csv';
    phonelockName = 'phonelock_u0'+i.toString()+'.csv';
  }else{
    fileName = 'Stress_u'+i.toString()+'.json';
    activityfileName = 'activity_u'+i.toString()+'.csv';
    audiofileName = 'audio_u'+i.toString()+'.csv';
    calllogName = 'call_log_u'+i.toString()+'.csv';
    phonelockName = 'phonelock_u'+i.toString()+'.csv';
  }
  // Declare Arrays
  var StressArr = new Array(30).fill(0);
  var StressCount = new Array(30).fill(0);
  var ActivityArr = new Array(30).fill(0);
  var ActivityCount = new Array(30).fill(0);
  var AudioArr = new Array(30).fill(0);
  var AudioCount = new Array(30).fill(0);
  var CallArr = new Array(30).fill(0);
  var CallCount = new Array(30).fill(0);
  var LockArr = new Array(30).fill(0);

  //Stress
  if(fs.existsSync(fileName)){
    rawdata = fs.readFileSync(fileName);
    student = JSON.parse(rawdata);
    // filter stress
    student = student.filter(student => (student.level != null && student.resp_time > 0));
    for(let j = 0; j<student.length;j++){
      student[j].resp_time = Math.round(((student[j].resp_time)/(3600*24)-15790)/3);
    }
    // Store Stress Data into StressArr
    for(let j = 0;j<student.length;j++){
      let time = student[j].resp_time;
      StressArr[time] *= 1; // type casting in javascript
      student[j].level *= 1;
      StressArr[time] = StressArr[time] + student[j].level;
      StressCount[time]  = StressCount[time] + 1;
    }
    for(let j = 0;j<StressArr.length;j++){
      if(StressArr[j]>0){
        StressArr[j] = Math.round(StressArr[j]/StressCount[j]);
        if(StressArr[j] >=3) StressArr[j] = 10;
        else StressArr[j] = 5;
      }
      else StressArr[j] = 0;
    }
    var file = fs.createWriteStream('z_StressResult'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(StressArr.join(' '));
    file.end();

  }
  // input data (activity)
  if(fs.existsSync(activityfileName)){
    var ActivityStream = fs.createReadStream(activityfileName).pipe(csv());
    ActivityStream.on('data', (row) => {
    if(row.timestamp >= 0){
      row.timestamp = Math.round((row.timestamp/(3600*24) - 15790)/3);
      let time = row.timestamp;
      row[" activity inference"] *= 100; // multiply this number for scaling
      ActivityArr[time] = ActivityArr[time] + row[" activity inference"];
      ActivityCount[time] += 1;
    }});
    ActivityStream.on('end',function() {
      for(let j = 0;j<30;j++){
        // if(ActivityCount[j]>0) {ActivityArr[j] = ActivityArr[j]/ActivityCount[j];}
        // else ActivityArr[j] = 0;
        ActivityArr[j] = ActivityCount[j];
        // 어차피 숫자가 클수록 활동적이라는 사실은 변하지 않으므로 가공의 편의를 위해 카운트로 대체
      }
       var file = fs.createWriteStream('z_ActivityResult'+i.toString()+'.txt');
       file.on('error', function(err) { /* error handling */ });
       file.write(ActivityArr.join(' '));
       file.end();
    });
  }
  // input data (audio)
  if(fs.existsSync(audiofileName)){
    fs.createReadStream(audiofileName).pipe(csv())
    .on('data', (row) =>{
      if(row.timestamp >= 0){
        row.timestamp = Math.round((row.timestamp/(3600*24)-15790)/3);
        let time = row.timestamp;
        AudioArr[time]*=1; AudioCount[time]*=1;
        row[" audio inference"] *= 100;
        AudioArr[time] = AudioArr[time] + row[" audio inference"];
        AudioCount[time] += 1;
        //console.log(AudioArr[time]);
      }
    }).on('end',function() {
        for(let j = 0;j<30;j++){
          // if(AudioCount[j]>0) {AudioArr[j] = AudioArr[j]/AudioCount[j];}
          // else AudioArr[j] = 0;
          AudioArr[j] = AudioCount[j];
          //same as Activity
        }
        var file = fs.createWriteStream('z_AudioResult'+i.toString()+'.txt');
        file.on('error', function(err) { /* error handling */ });
        file.write(AudioArr.join(' '));
        file.end();
      });
  }
  // input data (call_log)
  if(fs.existsSync(audiofileName)){
    fs.createReadStream(calllogName).pipe(csv())
    .on('data', (row) =>{
      if(row.timestamp >= 0){
      row.timestamp = Math.round((row.timestamp/(3600*24)-15700)/3-29);
      let time = row.timestamp
      CallArr[time]*=1; CallCount[time]*=1;
      if(row["CALLS_duration"]!= ""){
        row["CALLS_duration"] *= 1;
        CallArr[time] += row["CALLS_duration"];
        CallCount[time] += 1;
      }
      }
    }).on('end',function() {
        for(let j = 0;j<30;j++){
          // if(CallCount[j]>0){CallArr[j] = CallArr[j]/CallCount[j];}
          // else CallArr[j] = 0;
          //only the first member have the duration information
          CallArr[j] = CallCount[j];
        }
        var file = fs.createWriteStream('z_CallResult'+i.toString()+'.txt');
        file.on('error', function(err) { /* error handling */ });
        file.write(CallArr.join(' '));
        file.end();
      });
  }
  // input data (phonelock)
  if(fs.existsSync(phonelockName)){
    fs.createReadStream(phonelockName).pipe(csv())
    .on('data', (row)=>{
      // in here we will make our data
      if(row.start >= 0){row.start = Math.round((row.start)/(3600*24)-15700/3-10558);}
      if(row.end >= 0){row.end = Math.round((row.end)/(3600*24)-15700/3-10558);}
      LockArr[row.start] *= 1;
      LockArr[row.start] += 1;
      }).on('end',function() {
        for(let j=0;j<70;j++){
          if(LockArr[j]>=0) {LockArr[j] *= 1;}
          else LockArr[j] = 0;
        }
        var file = fs.createWriteStream('z_LockResult'+i.toString()+'.txt');
        file.on('error', function(err) { /* error handling */ });
        file.write(LockArr.join(' '));
        file.end();
      });
  }
}
