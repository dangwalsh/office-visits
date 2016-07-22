var counter=0, index=0;
var jsonFile = '/javascripts/topics.json';
var animationOut = 'animated slideOutRight';
var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
var animationIn = 'animated slideInLeft';
var animationShake = 'animated rubberBand';

$(document).ready(function(){
    $.getJSON(jsonFile, function(topics){
        $.each(topics, function(i, t){
            $('ul').append('<li id='+i+'><a>'+t['nav']+'</a></li>');
        });
        setData(topics);
        $('#frame').on('click', function(){
            doFrameAnimation(-1, topics, incrementIndex);
            doNavAnimation($('#'+(index+1)));
        });
        $('li').on('click', function(){
            var id = parseInt($(this).attr('id'),10);
            doFrameAnimation(id, topics, setIndex);
        });
        $('li').on('mouseover', function(){
            doNavAnimation(this);
        });
    });
    $('#frame').css('margin-top', $(window).height()/10);
});

function setData(topics){
    $('#'+index).addClass('active');
    $('h1').text(topics[index].title);
    $('img').attr('src', topics[index].image);
    $('p').html(topics[index].description.replace(/\n/g,"<br>"));
}

function doNavAnimation(element){
    $(element).addClass(animationShake).one(animationEnd, function(){
        $(element).removeClass(animationShake);
    });
}

function doFrameAnimation(id, topics, callback){
    $('#frame').addClass(animationOut).one(animationEnd, function(){
        $('#'+index).removeClass('active');
        callback(id, topics);
        $('#'+index).addClass('active');
        $('h1').text(topics[index].title);
        $('img').attr('src',topics[index].image);
        $('p').html(topics[index].description.replace(/\n/g,"<br>"));
        $('#frame').removeClass(animationOut).addClass(animationIn);
    });
}

function setIndex(id, topics){
    index = id;
}

function incrementIndex(id, topics){
    if(++counter % 2 != 0) 
    if(++index >= topics.length) index=0; 
}