const words = [+
"apple","river","mountain","sky","ocean","tree","cloud","stone","fire","wind",
"earth","light","shadow","dream","night","day","sun","moon","star","planet",
"forest","field","flower","grass","leaf","branch","root","seed","fruit","water",
"storm","rain","snow","ice","thunder","lightning","breeze","wave","sand","desert",
"hill","valley","lake","island","coast","beach","cliff","cave","path","road",
"bridge","city","village","town","house","home","room","door","window","wall",
"floor","roof","garden","park","school","office","market","shop","store","bank",
"hotel","restaurant","cafe","library","museum","hospital","station","airport","port","factory",
"farm","barn","field","tractor","engine","machine","tool","device","screen","keyboard",
"mouse","phone","camera","radio","speaker","clock","watch","calendar","paper","book",
"notebook","pen","pencil","brush","paint","color","art","music","song","dance",
"movie","story","poem","novel","letter","message","email","text","code","program",
"data","file","folder","system","network","internet","server","client","app","software",
"hardware","robot","drone","vehicle","car","bus","train","plane","ship","boat",
"bike","wheel","engine","fuel","speed","motion","energy","power","force","gravity",
"time","space","distance","length","width","height","volume","area","number","digit",
"math","algebra","geometry","calculus","science","physics","chemistry","biology","history","geography",
"culture","language","word","sentence","grammar","meaning","idea","thought","mind","brain",
"memory","logic","reason","truth","fact","belief","opinion","value","ethics","law",
"rule","order","system","process","method","plan","goal","target","result","success",
"failure","effort","work","job","career","skill","talent","ability","knowledge","wisdom",
"experience","learning","education","training","practice","habit","routine","schedule","task","project",
"team","group","community","society","nation","country","world","people","person","friend",
"family","parent","child","brother","sister","mother","father","uncle","aunt","cousin",
"neighbor","teacher","student","doctor","engineer","artist","writer","actor","singer","player",
"leader","manager","worker","driver","chef","farmer","builder","pilot","soldier","police",
"judge","lawyer","scientist","researcher","developer","designer","creator","inventor","owner","customer",
"buyer","seller","user","client","guest","host","visitor","stranger","partner","colleague",
"boss","employee","assistant","helper","guide","mentor","coach","advisor","support","service",
"product","item","object","thing","element","material","substance","metal","wood","plastic",
"glass","paper","fabric","cotton","wool","silk","leather","rubber","stone","brick",
"cement","steel","iron","gold","silver","copper","diamond","crystal","gem","jewel",
"ring","necklace","bracelet","watch","clothes","shirt","pants","dress","shoes","hat",
"jacket","coat","sweater","scarf","gloves","belt","bag","wallet","purse","suitcase",
"food","meal","breakfast","lunch","dinner","snack","drink","water","juice","milk",
"tea","coffee","soda","bread","rice","pasta","noodle","pizza","burger","sandwich",
"salad","soup","meat","chicken","beef","fish","egg","cheese","butter","oil",
"sugar","salt","spice","herb","fruit","vegetable","apple","banana","orange","grape",
"lemon","mango","peach","pear","plum","berry","carrot","potato","onion","tomato",
"pepper","cabbage","spinach","broccoli","bean","pea","corn","pumpkin","cucumber","lettuce",
"health","fitness","exercise","sport","game","match","team","score","win","lose",
"draw","play","run","walk","jump","swim","climb","lift","throw","catch",
"kick","hit","pass","shoot","train","practice","compete","challenge","goal","record",
"strength","speed","endurance","balance","flexibility","energy","focus","motivation","discipline","confidence",
"emotion","feeling","happiness","sadness","anger","fear","surprise","love","hate","joy",
"peace","stress","anxiety","calm","relax","tension","mood","attitude","behavior","action",
"choice","decision","option","chance","risk","reward","benefit","cost","value","price",
"money","cash","credit","debit","account","budget","saving","spending","investment","profit",
"loss","trade","market","business","company","brand","product","service","industry","economy",
"growth","decline","trend","change","development","progress","future","past","present","moment",
"event","history","memory","story","news","report","analysis","review","summary","detail",
"example","case","sample","test","experiment","result","conclusion","evidence","proof","theory",
"model","design","pattern","structure","system","framework","platform","tool","resource","asset",
"limit","range","scope","scale","level","degree","amount","quantity","quality","standard",
"rule","policy","strategy","plan","goal","mission","vision","purpose","reason","cause",
"effect","impact","influence","control","power","authority","leadership","management","organization","coordination"
];

const textContainer = document.getElementById('text-container');
const timerElement = document.getElementById('timer');
const tryAgainButton = document.getElementById('try-again');
const finalScoreElement = document.getElementById('final-score');

let totalTyped ='';
let currentIndex = 0;
let errors = 0;
let longText =  generateLongText();
let timeLeft =60;
let timerInterval;
let typingStarted =false;


textContainer.textContent = longText;


function shuffleArray(array) {
    for (let i = array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [array[i],array[j]]=[array[j],array[i]];
    }
    return array;
}

function generateLongText(){
    const shuffledWords=shuffleArray([...words]);
    return shuffledWords.join(' ');
}

function startTimer(){
    if(!typingStarted){
        typingStarted = true;
        timerInterval =setInterval(()=> {
            timeLeft--;
            timerElement.textContent = `Time left ${timeLeft}s`;
            if(timeLeft <= 0){
                clearInterval(timerInterval);
                endTest();
            }
        },1000);
    }
}

//end the test and display the final score
function endTest(){
    timerElement.textContent = `Time's up!`;
    finalScoreElement.textContent = `Final WPM:${calculateWPM()} `;
    textContainer.style.display = 'none';
    tryAgainButton.style.display = 'block'; 
    
}

// calculate words-per-minute with error adjustment
function calculateWPM() {
    const wordsTyped = totalTyped.trim().split(/\s+/).length;
    const baseWPM = Math.round((wordsTyped/60)*60);
    const adjustedWPM = Math.max(baseWPM - errors, 0);
    return adjustedWPM;
    
}


//handle typing over he displayed text and scrolling
document.addEventListener('keydown', (e)=>{

    startTimer();
    if(e.key === 'Backspace')
        {
        if(totalTyped.length>0){
            currentIndex = Math.max(currentIndex -1,0);
            totalTyped = totalTyped.slice(0,-1);
        }
    }  
    else if(e.key.length === 1 && !e.ctrlKey && !e.metaKey){
        totalTyped +=e.key;
         currentIndex ++;
    }
    console.log('e.key',e.key,'totalTyped',totalTyped,'currentIndex',currentIndex);

    const textArray =longText.split('');
    textContainer.innerText='';

    errors = 0;

    for(let i=0;i< textArray.length;i++){
        const span = document.createElement('span');

        if(i<totalTyped.length){
            if(totalTyped[i]===textArray[i]){
                span.classList.add('correct');
            }
            else{
                span.classList.add('error');
                errors++;
            }
        }
        span.textContent = textArray[i];
        textContainer.appendChild(span);
    }
});

//reset the test
function resetTest() {
    clearInterval(timerInterval);
    timeLeft=60;
    timerElement.textContent = `Time lef: ${timeLeft}s`;
    finalScoreElement.textContent = '';
    textContainer.style.display = 'block';
    tryAgainButton.style.display = 'block';
    totalTyped = '';
    typingStarted = false;
    currentIndex = 0;
    errors = 0;
    textContainer.scrollLeft = 0;
    longText = generateLongText();
    Init();
}

// initialize the test
function init(){
    if(isMobileDevice()){
        showMobileMessage();
    }
        else {
            textContainer.innerText = longText;
            timerElement.textContent =`Time left :${timeLeft}s`;
        }
    }


//try again button
tryAgainButton.addEventListener('click',resetTest);

//direct if the device is mobile
function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent)||window.innerWidth <800;
}

//show message for mobile usrs
function showMobileMessage(){
    textContainer.textContent + 'This typing test is designed for desktop only'
}


// startup
init();