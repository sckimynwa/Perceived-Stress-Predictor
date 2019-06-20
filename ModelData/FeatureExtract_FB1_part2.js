let fs = require('fs');

var StressArr = new Array(1800).fill(0);
var ActivityArr_OR = new Array(1800).fill(0);
var ActivityArr_OW = new Array(1800).fill(0);
var ActivityArr_R = new Array(1800).fill(0);
var ActivityArr_W = new Array(1800).fill(0);
var SocialArr = new Array(1800).fill(0);
var SleepArr = new Array(1800).fill(0);
var ExerciseArr = new Array(1800).fill(0);
var ProductivityArr = new Array(1800).fill(0);
var GradeArr = new Array(1800).fill(0);
var TestArr = new Array(1800).fill(0);
var ChallengeArr = new Array(1800).fill(0);

var wStream = fs.createWriteStream('FeatureResult_FB1.txt');

for(let i = 0;i<60;i++){
  var StressFileName = 'z_StressResult'+i.toString()+'.txt';
  var ActivityFileName_OR = 'z_Activity_OR_Result'+i.toString()+'.txt';
  var ActivityFileName_OW = 'z_Activity_OW_Result'+i.toString()+'.txt';
  var ActivityFileName_R = 'z_Activity_R_Result'+i.toString()+'.txt';
  var ActivityFileName_W = 'z_Activity_W_Result'+i.toString()+'.txt';
  var SocialFileName = 'z_SocialResult'+i.toString()+'.txt';
  var SleepFileName = 'z_SleepResult'+i.toString()+'.txt';
  var ExerciseFileName = 'z_ExerciseResult'+i.toString()+'.txt';
  var ProductivityFileName = 'z_ProductivityResult'+i.toString()+'.txt';
  var GradeFileName = 'z_GradeResult'+i.toString()+'.txt';
  var TestFileName = 'z_TestResult'+i.toString()+'.txt';
  var ChallengeFileName = 'z_ChallengeResult'+i.toString()+'.txt';

  if(fs.existsSync(StressFileName) && fs.existsSync(ActivityFileName_OR)
&& fs.existsSync(ActivityFileName_OW) && fs.existsSync(ActivityFileName_R)
&& fs.existsSync(ActivityFileName_W) && fs.existsSync(SocialFileName)
&& fs.existsSync(SleepFileName)&& fs.existsSync(ExerciseFileName)
&& fs.existsSync(ProductivityFileName)&& fs.existsSync(GradeFileName)
&& fs.existsSync(TestFileName)&& fs.existsSync(ChallengeFileName)){

    var StressData = fs.readFileSync(StressFileName).toString();
    var ActivityData_OW = fs.readFileSync(ActivityFileName_OW).toString();
    var ActivityData_OR = fs.readFileSync(ActivityFileName_OR).toString();
    var ActivityData_W = fs.readFileSync(ActivityFileName_W).toString();
    var ActivityData_R = fs.readFileSync(ActivityFileName_R).toString();
    var SocialData = fs.readFileSync(SocialFileName).toString();
    var SleepData = fs.readFileSync(SleepFileName).toString();
    var ExerciseData = fs.readFileSync(ExerciseFileName).toString();
    var ProductivityData = fs.readFileSync(ProductivityFileName).toString();
    var GradeData = fs.readFileSync(GradeFileName).toString();
    var TestData = fs.readFileSync(TestFileName).toString();
    var ChallengeData = fs.readFileSync(ChallengeFileName).toString();

    var tempStress = StressData.split(" ");
    for(let j=0;j<StressData.length;j++){
      StressArr[30*i+j] = (tempStress[j])*1;
    }
    var tempActivity_OW = ActivityData_OW.split(" ");
    for(let j=0;j<ActivityData_OW.length;j++){
      ActivityArr_OW[30*i+j] = tempActivity_OW[j]*1;
    }
    var tempActivity_OR = ActivityData_OR.split(" ");
    for(let j=0;j<ActivityData_OR.length;j++){
      ActivityArr_OR[30*i+j] = tempActivity_OR[j]*1;
    }
    var tempActivity_W = ActivityData_W.split(" ");
    for(let j=0;j<ActivityData_W.length;j++){
      ActivityArr_W[30*i+j] = tempActivity_W[j]*1;
    }
    var tempActivity_R = ActivityData_R.split(" ");
    for(let j=0;j<ActivityData_R.length;j++){
      ActivityArr_R[30*i+j] = tempActivity_R[j]*1;
    }
    var tempAudio = AudioData.split(" ");
    for(let j=0;j<AudioData.length;j++){
      AudioArr[30*i+j] = tempAudio[j]*1;
    }
    var tempSocial = SocialData.split(" ");
    for(let j=0;j<SocialData.length;j++){
      SocialArr[30*i+j] = tempSocial[j]*1;
    }
    var tempExercise = ExerciseData.split(" ");
    for(let j=0;j<ExerciseData.length;j++){
      ExerciseArr[30*i+j] = tempExercise[j]*1;
    }
    var tempProductivity = ProductivityData.split(" ");
    for(let j=0;j<ProductivityData.length;j++){
      ProductivityArr[30*i+j] = tempProductivity[j]*1;
    }
    var tempGrade = GradeData.split(" ");
    for(let j=0;j<GradeData.length;j++){
      GradeArr[30*i+j] = tempGrade[j]*1;
    }
    var tempTest = TestData.split(" ");
    for(let j=0;j<TestData.length;j++){
      TestArr[30*i+j] = tempTest[j]*1;
    }
    var tempChallenge = ChallengeData.split(" ");
    for(let j=0;j<ChallengeData.length;j++){
      ChallengeArr[30*i+j] = tempChallenge[j]*1;
    }
  }
}

// data merge
let cnt = 0;
for(let i = 0;i<1800;i++){
  if(StressArr[i]>0
  ){
    //console.log("Stress "+StressArr[i]+" Activity "+ActivityArr[i]+" Audio "+AudioArr[i]+" Call "+CallArr[i]+" Lock "+LockArr[i]);
    if(StressArr[i] == 10) StressArr[i] = 2;
    else if(StressArr[i] == 5) StressArr[i] = 1;
    else StressArr[i] = 0;

    if(StressArr[i] > 0){
      wStream.write(ActivityArr_R[i]+" "+ActivityArr_W[i]+" "+ActivityArr_OR[i]+" "+ActivityArr_OW[i]+" "
      +SleepArr[i]+" "+SocialArr[i]+" "+ExerciseArr[i]+" "+ProductivityArr[i]+" "
      +TestArr[i]+" "+ChallengeArr[i]+" "+StressArr[i]+"\n");
      cnt++;
    }else{
    }
  }
}
//wStream.write(cnt+"\n");
wStream.end();
