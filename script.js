var wybraneLiczby = [];
var tablicaLiczb = [];
var liczba;
var li;

// RANDOM function ------------------------
function rand(min, max) {
  var argc = arguments.length
  if (argc === 0) {
    min = 1
    max = 2147483647
  } else if (argc === 1) {
    throw new Error('Warning: rand() expects exactly 2 parameters, 1 given')
  }
  return Math.floor(Math.random() * (max - min + 1)) + min

}

// Fill in tablicaKulek from 1 to 42 function ------------------------

function tablicaKulek() {
  var row2 = '<ul>';
  for (var i=1; i <= 42; i++){
    row2 += '<li>' + i + '</li>';
  }
  row2 += '</ul>';
  $('#tablica2').html(row2);
}

// Fill in tablicaLiczb function ------------------------

function fillin(){
  tablicaLiczb = [];
  for (var i = 1; i <= 42; i++){
    tablicaLiczb.push(i);
  }
}

// wypiszLiczby function ----------------

function wypiszLiczby(){
  var ciagTekstowy = '<ul>';
  
  wybraneLiczby.map(function(value) {
    ciagTekstowy += '<li>' + value + '</li>';
  })
  ciagTekstowy += '</ul>';
  $('#lista-wybranych').html(ciagTekstowy);
}

// Color change function -----------------

function colorChange(){
  $(li).toggleClass('color-selected');
}

// Sort function -------------------------

function sort(){
  var p=0;
    if (wybraneLiczby.indexOf(liczba) == -1 && wybraneLiczby.length < 6) {
      for (i=0; i<(wybraneLiczby.length+1); i++){
        if (liczba < +wybraneLiczby[i]) {
          wybraneLiczby.splice(i, 0, liczba);
          colorChange(); 
          p=1;
          break;
        }
      }
      if (p == 0){
        wybraneLiczby.push(liczba);
        colorChange();
      }
    }
    else if (wybraneLiczby.indexOf(liczba) == -1 && wybraneLiczby.length == 6){
      alert('juz maksymalną ilość liczb!');
    }
    else {
      wybraneLiczby.splice(wybraneLiczby.indexOf(liczba), 1);
      colorChange();
      }
}

// Reset function ----------------------------------

function reset() {
  wybraneLiczby = [];
  wypiszLiczby();
  $('#tablica2 li').removeClass('color-selected');
  $('#losowe-liczby').empty();
  $('#results').empty();
  $('.losowanie').attr('disabled', true);
}


// ----------------------------------------------------------------------
$(document).ready(function () {

$("#myModal").modal({
  backdrop: 'static',
  keyboard: false,
  show: true
});

// Modal function ----------------------------------
var noName = ['Enter your name!', 'Are you jocking?', 'Enter your name, PLEASE!'];

$('#myModal').on('shown.bs.modal', function () {
  $('#userName').focus()
})

var userName;
var click = 0;

$('#myModal').unbind("keyup").keyup(function(e){ 
    var code = e.which; // recommended to use e.which, it's normalized across browsers
    if(code==13)
    {
        $('.save').click();
    }
});

$('.save').click(function () {
  userName = $('#userName').val();
  if (userName == ""){
    userName = 0;
    $('.test').empty();
    $('.test').append('<br>'+'<blockquote>'+'<p>'+noName[click]+'</p>'+'</blockquote>');
    click++;
    if (click == noName.length){
      click = 0;
    }
  } else {
    $('#myModal').modal('hide');
    $('.hello').append(userName+'!');
  }
});

// -------------------------------------------------

$('.losowanie').attr('disabled', true);

tablicaKulek();

$('#tablica2 li').on('click', function(){
  if (wybraneLiczby.length <= 6){
    li = $(this);
    liczba = $(this).text();
    
    sort();
    wypiszLiczby();
 
  }
  else {
    alert('Wybrales juz maksymalną ilość liczb!');
  }

  if (wybraneLiczby.length > 5){
    $('.losowanie').attr('disabled', false);
    $('.losowanie').css({'cursor': 'pointer'});
  } else {
    $('.losowanie').attr('disabled', true);
  }

  });

// Random numbers --------------------

fillin();

 
// Fill in losowe-liczby and matched results ------------------
$('.losowanie').click(function () {

var x = '<ul>',
    y = '<ul>';

for (var i = 0; i<6; i++) {
  var index = rand(0, tablicaLiczb.length - 1);
  x += '<li>' + tablicaLiczb[index] + '</li>';
  
  for (var a=0; a<6; a++){
    if (tablicaLiczb[index] == wybraneLiczby[a]) {
      y += '<li>' + tablicaLiczb[index] + '</li>';
    }
  }

tablicaLiczb.splice(index, 1);

  }
  
x += '</ul>';
y += '</ul>';

$('#losowe-liczby').html(x);
$('#results').html(y);
fillin();

});

// reset function --------------------------

$('.resetowanie').click(function () {
  reset();
});

})