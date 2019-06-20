let fs = require('fs');
let csv = require('csv-parser');


//change this i value to 1
for(let i = 0; i<60 ;i++){
  console.log('i = '+i);
  let rawdata, student, fileName, activityFileName,
  socialFileName, sleepFileName, exerciseFileName,
  productivityFileName, classFileName, class2FileName

  // input data(Stress, yvalue)
  if(i<10){
    fileName = 'Stress_u0'+i.toString()+'.json';
    activityFileName = 'Activity_u0'+i.toString()+'.json';
    socialFileName = 'Social_u0'+i.toString()+'.json';
    sleepFileName = 'Sleep_u0'+i.toString()+'.json';
    exerciseFileName = 'Exercise_u0'+i.toString()+'.json';
    productivityFileName = 'Study Spaces_u0'+i.toString()+'.json';
    classFileName = 'Class_u0'+i.toString()+'.json';
    class2FileName = 'Class 2_u0'+i.toString()+'.json';
  }else{
    fileName = 'Stress_u'+i.toString()+'.json';
    activityFileName = 'Activity_u'+i.toString()+'.json';
    socialFileName = 'Social_u'+i.toString()+'.json';
    sleepFileName = 'Sleep_u'+i.toString()+'.json';
    exerciseFileName = 'Exercise_u'+i.toString()+'.json';
    productivityFileName = 'Study Spaces_u'+i.toString()+'.json';
    classFileName = 'Class_u'+i.toString()+'.json';
    class2FileName = 'Class 2_u'+i.toString()+'.json';
  }
  // Declare Arrays
  var StressArr = new Array(30).fill(0);
  var StressCount = new Array(30).fill(0);
  var Activity_OR = new Array(60).fill(0);
  var Activity_OW = new Array(60).fill(0);
  var Activity_R = new Array(60).fill(0);
  var Activity_W = new Array(60).fill(0);
  var Activity_Count = new Array(60).fill(0);
  var SocialArr = new Array(60).fill(0);
  var SocialCount = new Array(60).fill(0);
  var SleepArr = new Array(60).fill(0);
  var SleepCount = new Array(60).fill(0);
  var ExerciseArr = new Array(60).fill(0);
  var ExerciseCount = new Array(60).fill(0);
  var ProductivityArr = new Array(60).fill(0);
  var ProductivityCount = new Array(60).fill(0);
  var GradeArr = new Array(60).fill(0);
  var GradeCount = new Array(60).fill(0);
  var TestArr = new Array(60).fill(0);
  var TestCount = new Array(60).fill(0);
  var ChallengeArr = new Array(60).fill(0);
  var ChallengeCount = new Array(60).fill(0);



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
        if(StressArr[j] > 3) StressArr[j] = 10;
        else if(StressArr[j] < 3) StressArr[j] = 5;
      }
      else StressArr[j] = 0;
    }
    var file = fs.createWriteStream('z_StressResult'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(StressArr.join(' '));
    file.end();
  }
  // input data (activity)
  if(fs.existsSync(activityFileName)){
    rawdata = fs.readFileSync(activityFileName);
    student = JSON.parse(rawdata);
    // filter stress
    student = student.filter(student =>
      (student.other_relaxing != null && student.other_working != null
        && student.relaxing != null && student.working != null
        && student.resp_time > 0));
    for(let j = 0; j<student.length;j++){
      student[j].resp_time = Math.round(((student[j].resp_time)/(3600*24)-15790)/3);
    }
    // Store Stress Data into StressArr
    for(let j = 0;j<student.length;j++){
      let time = student[j].resp_time;
      Activity_R[time] += student[j].relaxing * 1;
      Activity_W[time] += student[j].working * 1;
      Activity_OR[time] += student[j].other_relaxing * 1;
      Activity_OW[time] += student[j].other_working * 1;
      Activity_Count[time] += 1 * 1;
    }
    for (let time = 0; time<60;time++){
      if( Activity_Count[time] > 0){
        Activity_R[time]  = Math.round(Activity_R[time]/Activity_Count[time]);
        Activity_W[time]  = Math.round(Activity_W[time]/Activity_Count[time]);
        Activity_OR[time]  = Math.round(Activity_OR[time]/Activity_Count[time]);
        Activity_OW[time]  = Math.round(Activity_OW[time]/Activity_Count[time]);
      }
    }
    var file = fs.createWriteStream('z_Activity_R_Result'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(Activity_R.join(' '));
    file.end();
    var file = fs.createWriteStream('z_Activity_W_Result'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(Activity_W.join(' '));
    file.end();
    var file = fs.createWriteStream('z_Activity_OR_Result'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(Activity_OR.join(' '));
    file.end();
    var file = fs.createWriteStream('z_Activity_OW_Result'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(Activity_OW.join(' '));
    file.end();

  }
  // input data (social)
  if(fs.existsSync(socialFileName)){
    rawdata = fs.readFileSync(socialFileName);
    student = JSON.parse(rawdata);
    // filter stress
    student = student.filter(student => (student.number != null && student.resp_time > 0));
    for(let j = 0; j<student.length;j++){
      student[j].resp_time = Math.round(((student[j].resp_time)/(3600*24)-15790)/3);
    }
    // Store Stress Data into StressArr
    for(let j = 0;j<student.length;j++){
      let time = student[j].resp_time;
      SocialArr[time] *= 1;
      SocialArr[time] += student[j].number*1;
      SocialCount[time] += 1*1;
    }
    for(let j = 0;j<SocialArr.length;j++){
      if(SocialArr[j]>0){
        SocialArr[j] = Math.round(SocialArr[j]/SocialCount[j]);
      }

    }
    var file = fs.createWriteStream('z_SocialResult'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(SocialArr.join(' '));
    file.end();
  }

  // input data (sleep)
  if(fs.existsSync(sleepFileName)){
    rawdata = fs.readFileSync(sleepFileName);
    student = JSON.parse(rawdata);
    // filter stress
    student = student.filter(student => (student.hour != null && student.resp_time > 0));
    for(let j = 0; j<student.length;j++){
      student[j].resp_time = Math.round(((student[j].resp_time)/(3600*24)-15790)/3);
    }
    // Store Stress Data into StressArr
    for(let j = 0;j<student.length;j++){
      let time = student[j].resp_time;
      SleepArr[time] *= 1; // type casting in javascript
      SleepArr[time] += student[j].hour * 1;
      SleepCount[time] += 1 * 1;
    }
    for(let j = 0;j<SleepArr.length;j++){
      if(SleepArr[j]>0){
        SleepArr[j] = Math.round(SleepArr[j]/SleepCount[j]);
      }
    }
    var file = fs.createWriteStream('z_SleepResult'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(SleepArr.join(' '));
    file.end();
  }

  // input data (exercise)
  if(fs.existsSync(exerciseFileName)){
    rawdata = fs.readFileSync(exerciseFileName);
    student = JSON.parse(rawdata);
    // filter stress
    student = student.filter(student => (student.exercise != null && student.have != null && student.resp_time > 0));
    for(let j = 0; j<student.length;j++){
      student[j].resp_time = Math.round(((student[j].resp_time)/(3600*24)-15790)/3);
    }
    // Store Stress Data into StressArr
    for(let j = 0;j<student.length;j++){
      let time = student[j].resp_time;
      ExerciseArr[time] *= 1; // type casting in javascript
      ExerciseArr[time] += ((student[j].have - 2)* -1)*(student[j].exercise*1); // if exercise! then 1, if not, then 0
      ExerciseCount[time] += 1 * 1;
    }
    for(let j = 0;j<ExerciseArr.length;j++){
      if(ExerciseArr[j]>0){
        ExerciseArr[j] = Math.round(ExerciseArr[j]/ExerciseCount[j]);
      }
    }
    var file = fs.createWriteStream('z_ExerciseResult'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(ExerciseArr.join(' '));
    file.end();
  }
  // input data (productivity)
  if(fs.existsSync(productivityFileName)){
    rawdata = fs.readFileSync(productivityFileName);
    student = JSON.parse(rawdata);
    // filter stress
    student = student.filter(student => (student.productivity != null && student.resp_time > 0));
    for(let j = 0; j<student.length;j++){
      student[j].resp_time = Math.round(((student[j].resp_time)/(3600*24)-15790)/3);
    }
    // Store Stress Data into StressArr
    for(let j = 0;j<student.length;j++){
      let time = student[j].resp_time;
      ProductivityArr[time] *= 1; // type casting in javascript
      ProductivityArr[time] += (student[j].productivity ); // if exercise! then 1, if not, then 0
      ProductivityCount[time] += 1 * 1;
    }
    for(let j = 0;j<ProductivityArr.length;j++){
      if(ProductivityArr[j]>0){
        ProductivityArr[j] = Math.round(ProductivityArr[j]/ProductivityCount[j]);
      }
    }
    var file = fs.createWriteStream('z_ProductivityResult'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(ProductivityArr.join(' '));
    file.end();
  }

    // input data (quiz)
    if(fs.existsSync(classFileName)){
      rawdata = fs.readFileSync(classFileName);
      student = JSON.parse(rawdata);
      // filter stress
      student = student.filter(student => (student.due != null && student.resp_time > 0));
      for(let j = 0; j<student.length;j++){
        student[j].resp_time = Math.round(((student[j].resp_time)/(3600*24)-15790)/3);
      }
      // Store Stress Data into StressArr
      for(let j = 0;j<student.length;j++){
        let time = student[j].resp_time;
        TestArr[time] *= 1; // type casting in javascript
        TestArr[time] += (student[j].due - 2)*-1; // if exercise! then 1, if not, then 0
        TestCount[time] += 1 * 1;
      }
      for(let j = 0;j<TestArr.length;j++){
        if(TestArr[j]>0){
          TestArr[j] = Math.round(TestArr[j]/TestCount[j]);
        }
      }
      var file = fs.createWriteStream('z_TestResult'+i.toString()+'.txt');
      file.on('error', function(err) { /* error handling */ });
      file.write(TestArr.join(' '));
      file.end();
  }
  // input data (grade, challenge)
  if(fs.existsSync(class2FileName)){
    rawdata = fs.readFileSync(class2FileName);
    student = JSON.parse(rawdata);
    // filter stress
    student = student.filter(student => (student.grade != null && student.challenge != null && student.resp_time > 0));
    for(let j = 0; j<student.length;j++){
      student[j].resp_time = Math.round(((student[j].resp_time)/(3600*24)-15790)/3);
    }
    // Store Stress Data into StressArr
    for(let j = 0;j<student.length;j++){
      let time = student[j].resp_time;
      GradeArr[time] *= 1; // type casting in javascript
      GradeArr[time] += (student[j].grade - 9)*-1; // if exercise! then 1, if not, then 0
      GradeCount[time] += 1 * 1;
    }
    for(let j = 0;j<GradeArr.length;j++){
      if(GradeArr[j]>0){
        GradeArr[j] = Math.round(GradeArr[j]/GradeCount[j]);
      }
    }
    var file = fs.createWriteStream('z_GradeResult'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(GradeArr.join(' '));
    file.end();


    for(let j = 0;j<student.length;j++){
      let time = student[j].resp_time;
      ChallengeArr[time] *= 1; // type casting in javascript
      ChallengeArr[time] += (student[j].challenge - 2)*-1; // if exercise! then 1, if not, then 0
      ChallengeCount[time] += 1 * 1;
    }
    for(let j = 0;j<ChallengeArr.length;j++){
      if(ChallengeArr[j]>0){
        ChallengeArr[j] = Math.round(ChallengeArr[j]/ChallengeCount[j]);
      }
    }
    var file = fs.createWriteStream('z_ChallengeResult'+i.toString()+'.txt');
    file.on('error', function(err) { /* error handling */ });
    file.write(ChallengeArr.join(' '));
    file.end();
}
}
