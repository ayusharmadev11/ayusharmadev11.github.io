(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

})(jQuery);

// Neural network design
// document.addEventListener('DOMContentLoaded', function() {
// 	const canvas = document.getElementById('neuralNetworkCanvas');
// 	const ctx = canvas.getContext('2d');

// 	// Fix for canvas rendering to make lines sharper
// 	function setupHighDPICanvas(canvas) {
// 		const dpr = window.devicePixelRatio || 1;
// 		const rect = canvas.getBoundingClientRect();
// 		canvas.width = rect.width * dpr;
// 		canvas.height = rect.height * dpr;
// 		ctx.scale(dpr, dpr);
// 		canvas.style.width = rect.width + 'px';
// 		canvas.style.height = rect.height + 'px';
// 		return {width: rect.width, height: rect.height};
// 	}

// 	let dims = setupHighDPICanvas(canvas);
// 	let width = dims.width;
// 	let height = dims.height;

// 	// Mouse position
// 	let mouse = {
// 		x: width / 2,
// 		y: height / 2
// 	};

// 	// Track mouse position
// 	window.addEventListener('mousemove', function(e) {
// 		mouse.x = e.clientX;
// 		mouse.y = e.clientY;
// 	});

// 	// For touch devices
// 	window.addEventListener('touchmove', function(e) {
// 		if (e.touches.length > 0) {
// 			mouse.x = e.touches[0].clientX;
// 			mouse.y = e.touches[0].clientY;
// 		}
// 	});

// 	// Handle window resize
// 	window.addEventListener('resize', function() {
// 		dims = setupHighDPICanvas(canvas);
// 		width = dims.width;
// 		height = dims.height;
// 		initParticles();
// 	});

// 	// Particles array
// 	let particles = [];
// 	// Keep the increased particle count
// 	const particleCount = Math.min(180, Math.floor(width * height / 6500));
// 	// Keep larger connection distance for base network
// 	const maxDistance = 160;
// 	// Significantly reduced hover radius
// 	const hoverRadius = 80;
// 	const nodeRadius = 1.2;
// 	const lineColor = 'rgb(255, 255, 255)';
// 	const nodeColor = 'rgb(255, 255, 255)';
// 	const activeNodeColor = 'rgb(255, 255, 255)';
// 	const activeLineColor = 'rgba(255, 255, 255, 0.9)';

// 	// Particle class
// 	class Particle {
// 		constructor(x, y) {
// 		this.x = x || Math.random() * width;
// 		this.y = y || Math.random() * height;
// 		this.vx = Math.random() * 0.3 - 0.15;
// 		this.vy = Math.random() * 0.3 - 0.15;
// 		this.radius = nodeRadius;
// 		}
		
// 		update() {
// 		// Add gentle movement
// 		this.x += this.vx;
// 		this.y += this.vy;
		
// 		// Boundary checks
// 		if (this.x < 0 || this.x > width) {
// 			this.vx = -this.vx;
// 		}
		
// 		if (this.y < 0 || this.y > height) {
// 			this.vy = -this.vy;
// 		}
		
// 		// Distance from mouse
// 		const dx = mouse.x - this.x;
// 		const dy = mouse.y - this.y;
// 		const distance = Math.sqrt(dx * dx + dy * dy);
		
// 		// Draw node
// 		ctx.beginPath();
// 		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		
// 		if (distance < hoverRadius) {
// 			ctx.fillStyle = activeNodeColor;
// 		} else {
// 			ctx.fillStyle = nodeColor;
// 		}
		
// 		ctx.fill();
// 		}
// 	}

// 	// Initialize particles
// 	function initParticles() {
// 		particles = [];
// 		for (let i = 0; i < particleCount; i++) {
// 		particles.push(new Particle());
// 		}
// 	}

// 	// Animation loop
// 	function animate() {
// 		ctx.clearRect(0, 0, width * window.devicePixelRatio, height * window.devicePixelRatio);
		
// 		// Draw connections first (behind nodes)
// 		for (let i = 0; i < particles.length; i++) {
// 		for (let j = i + 1; j < particles.length; j++) {
// 			const dx = particles[i].x - particles[j].x;
// 			const dy = particles[i].y - particles[j].y;
// 			const distance = Math.sqrt(dx * dx + dy * dy);
			
// 			if (distance < maxDistance) {
// 			// Check if both particles are near the mouse (stricter condition)
// 			const distToMouse1 = Math.hypot(mouse.x - particles[i].x, mouse.y - particles[i].y);
// 			const distToMouse2 = Math.hypot(mouse.x - particles[j].x, mouse.y - particles[j].y);
			
// 			// Only highlight if BOTH nodes are within hover radius (much stricter)
// 			const nearMouse = distToMouse1 < hoverRadius && distToMouse2 < hoverRadius;
			
// 			ctx.beginPath();
// 			ctx.moveTo(particles[i].x, particles[i].y);
// 			ctx.lineTo(particles[j].x, particles[j].y);
			
// 			// Opacity based on distance (closer = more opaque)
// 			const opacity = 1 - (distance / maxDistance);
			
// 			if (nearMouse) {
// 				ctx.strokeStyle = activeLineColor;
// 			} else {
// 				ctx.strokeStyle = `rgba(120, 120, 120, ${opacity * 0.35})`;
// 			}
			
// 			// Thinner lines
// 			ctx.lineWidth = 0.3;
// 			ctx.stroke();
// 			}
// 		}
// 		}
		
// 		// Update and draw particles
// 		particles.forEach(particle => {
// 		particle.update();
// 		});
		
// 		requestAnimationFrame(animate);
// 	}

// 	// Start the animation
// 	initParticles();
// 	animate();
// });
