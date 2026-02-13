$(document).ready(function () {
    $('.left-curtain').css('width', '0%');
    $('.right-curtain').css('width', '0%');

    // Music control
    var music = document.getElementById('bgMusic');
    var musicToggle = document.getElementById('musicToggle');
    var isPlaying = true;

    // Ensure music plays on any user interaction if autoplay is blocked
    function ensureMusicPlays() {
        if (music.paused) {
            music.play().then(function() {
                isPlaying = true;
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                musicToggle.classList.remove('muted');
            }).catch(function(error) {
                console.log('Music play failed:', error);
            });
        }
    }

    // Try to play music immediately
    music.play().catch(function(error) {
        console.log('Autoplay blocked. Will play on first user interaction.');
        isPlaying = false;
        
        // Play music on first click anywhere on the page
        $(document).one('click', function() {
            ensureMusicPlays();
        });
    });

    // Toggle music on/off
    $('#musicToggle').click(function(e) {
        e.stopPropagation(); // Prevent triggering document click
        
        if (isPlaying) {
            music.pause();
            $(this).html('<i class="fas fa-volume-mute"></i>');
            $(this).addClass('muted');
            isPlaying = false;
        } else {
            music.play();
            $(this).html('<i class="fas fa-volume-up"></i>');
            $(this).removeClass('muted');
            isPlaying = true;
        }
    });

    $('.valentines-day').click(function () {
        $('.envelope').css({ 'animation': 'fall 3s linear 1', '-webkit-animation': 'fall 3s linear 1' });
        $('.envelope').fadeOut(800, function () {
            $('.valentines-day .heart, .valentines-day .text, .valentines-day .front').hide();

            $('#card').css({ 'visibility': 'visible', 'opacity': 0, 'transform': 'scale(0.1)' });
            $('#card').animate({ 'opacity': 1 }, {
                duration: 1000, step: function (now, fx) {
                    var scale = 1 + Math.sin(now * Math.PI) * 0.1;
                    $(this).css('transform', 'scale(' + scale + ')');
                }
            });
        });
    });
}); 
