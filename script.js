console.log("Welcome")

//Fetching elements to use in JS
let playButton = document.getElementById('mainPlay');
let audio = new Audio ('/songs/1.mp3'); //creating audioelement - it has different properties in it which we can use - like paused ,play ,duration,currentTime etc.
let index=0;
let myProgressBar = document.getElementById('myProgressBar');
let previous = document.getElementById('prev');
let next = document.getElementById('next');

let smallplay =  Array.from(document.getElementsByClassName('smallPlay'));

let songItem = Array.from(document.getElementsByClassName('songitemlist'));

let songs = [ /*Array of Objects*/
    {songName: "Ae Dil Hai Mushkil" , filePath: "/songs/1.mp3" ,coverPath: "/covers/1.jpg"},
    {songName: "Koi Mil Gaya" , filePath: "/songs/2.mp3" ,coverPath: "/covers/2.jpg"},
    {songName: "Kuch Kuch hota hai" , filePath: "/songs/3.mp3" ,coverPath: "/covers/3.jpg"},
    {songName: "Apne" , filePath: "/songs/4.mp3" ,coverPath: "/covers/4.jpg"},
    {songName: "Aisa Kyun Hota Hai" , filePath: "/songs/5.mp3" ,coverPath: "/covers/5.jpg"},
    {songName: "Kahani Suno" , filePath: "/songs/6.mp3" ,coverPath: "/covers/6.jpg"},
] // we dpn't need this as I have initialized these values in my html

// songItem.forEach((element,i) => {
//     console.log(element);

// })

//Handle play/pause click
playButton.addEventListener ('click', () => {
    //console.log(playButton);
    if(audio.paused || audio.currentTime<=0){
        audio.play();
        playButton.classList.remove('fa-solid', 'fa-play'); // we pass this way as - fa-solid fa-pause was throwing error
        playButton.classList.add('fa-solid', 'fa-pause');
    }
    else
    {
        audio.pause();
        playButton.classList.remove('fa-solid', 'fa-pause');
        playButton.classList.add('fa-solid', 'fa-play');
    }
})

//update progress bar:-to move the bar
audio.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    //logic
    progress = parseInt((audio.currentTime/audio.duration)*100);
    myProgressBar.value = progress;
})

//setting the value of audio as we increase/decrease the time
myProgressBar.addEventListener('change', () => {  //using 'change' event - as it changes then we're updating the audio
    audio.currentTime = myProgressBar.value * audio.duration/100;
})

//to play/pause the button beside each song
smallplay.forEach((element) => {
    //console.log(element);
    element.addEventListener('click' , (e) =>{
        //  console.log(e);
        //  console.log(e.target);
        makeAllPlays();
        index = parseInt(e.target.id); // gave id's in the html of all the play buttons so that we get a variable - index whose value changes and we assign the name as song1, song2 etc.
        //console.log(index);
        e.target.classList.remove('fa-solid', 'fa-play');
        e.target.classList.add('fa-solid', 'fa-pause');
        audio.src = `/songs/${index}.mp3`;  //used template literals
        audio.play();
        playButton.classList.remove('fa-solid', 'fa-play'); // we pass this way as - fa-solid fa-pause was throwing error
        playButton.classList.add('fa-solid', 'fa-pause');

    })
})

makeAllPlays = () => {
    smallplay.forEach((element) => {
        element.classList.remove('fa-solid', 'fa-pause');
        element.classList.add('fa-solid', 'fa-play');
})}

//previous  and next buttons
next.addEventListener('click' ,() =>{
    if(index>=6){
        index=0;
    }
    else{
        index+=1;
    }
        audio.src = `/songs/${index+1}.mp3`;
        audio.play();
})

previous.addEventListener('click' ,() =>{
    if(index<=0){
        index=0;
    }
    else{
        index-=1;
    }
        audio.src = `/songs/${index+1}.mp3`;
        audio.play();
   })