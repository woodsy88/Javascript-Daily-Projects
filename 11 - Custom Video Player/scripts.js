// Get our elements
 const player = document.querySelector('.player');
 const video = document.querySelector('.viewer');
//  console.log(video);
//  console.dir(video);
 const progress = document.querySelector('.progress');
 console.log('progress: ', progress);
 const progressBar = document.querySelector('.progress__filled');
 
 const toggle = player.querySelector('.toggle');

//  anything with a data-skip attribute
 const skipButtons = player.querySelectorAll('[data-skip]');
//  console.log('skipButtons: ', skipButtons);
 const ranges = player.querySelectorAll('.player__slider');
//  console.log(ranges);
 


// Build our functions

function togglePlay() {
  if(video.paused){
      video.play();
  } else {
    video.pause();
  }
}

function updateButton(params) {
  // console.log('update the button');
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}


function skipVideo(){
  // console.log('i am skipping');
  // dataset is the reference to the data-skip attribute on the dom elemennt
  // console.log(this.dataset);
  // take the string from the data-skip attribute on the dom elemenet and turn it into a number, then add it to the current time
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
  //  name attribute of the input we want to change
  // console.log(this.name);
  
  // value comes from the value of the input
  // console.log(this.value);   
  
  // update the value on the attribute
  video[this.name] = this.value;
}

function scrub(e){
  console.log(e);

  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}


// hook up the event listeners

// for querySelector - you are only targeting 1 item
toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

// for querySelectorAll, you are targeting a list of elements and need to use forEach(), then run event listener on each iterable
skipButtons.forEach( button => button.addEventListener('click', skipVideo));

ranges.forEach(range => range.addEventListener('click', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));


// Progress bar of video
let mousedown = false;
progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);