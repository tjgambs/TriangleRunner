
	var htmlCanvas = document.getElementById('c');

	var context = htmlCanvas.getContext('2d');

    var gridDim = 30;
    var triangleDim = 15;
    var triangleColor = 'black';
    var speed = 2;
    var timerSpeed = 5;
    var timer;
    var direction = 'up';
    var numOfSpikes = 1000;

    var worldDim = 10000;

    var cornerOneX=window.innerWidth/2; 
	var cornerOneY=window.innerHeight/2-triangleDim;
	var cornerTwoX=window.innerWidth/2+triangleDim; 
	var cornerTwoY=window.innerHeight/2+triangleDim;
	var cornerThreeX=window.innerWidth/2-triangleDim; 
	var cornerThreeY=window.innerHeight/2+triangleDim;

	var xOfCircle = [];
	var yOfCircle = [];
	var colorOfCircle = [];

	function initialize() 
	{
		window.addEventListener('resize', resizeCanvas, false);
		resizeCanvas();
		drawPlayer();
		setupSpikeLocations();
		drawSpikes();
	}

	function resizeCanvas() 
	{
		htmlCanvas.width = window.innerWidth;
		htmlCanvas.height = window.innerHeight;
		drawGrid();	
	}

	function drawGrid()
	{
		for (var x = 0; x <= worldDim; x += gridDim) 
		{
    		context.moveTo(0.5 + x, 0);
    		context.lineTo(0.5 + x, worldDim);
		}

		for (var x = 0; x <= worldDim; x += gridDim)
		{
    		context.moveTo(0, 0.5 + x);
    		context.lineTo(worldDim, 0.5 + x);
		}
		context.strokeStyle = "lightgray";
		context.stroke();
	}

	function drawPlayer()
	{
		clearPlayer();
		context.fillStyle=triangleColor;
		context.beginPath();
		switch(direction)
		{
			case 'up':
				cornerOneY-=speed;
				cornerTwoY-=speed;
				cornerThreeY-=speed;

				context.moveTo(cornerOneX,cornerOneY);
				context.lineTo(cornerTwoX,cornerTwoY);
				context.lineTo(cornerThreeX,cornerThreeY);
				break;
				
			case 'down':
				cornerOneY+=speed;
				cornerTwoY+=speed;
				cornerThreeY+=speed;

				context.moveTo(cornerThreeX,cornerOneY);
				context.lineTo(cornerTwoX,cornerOneY);
				context.lineTo(cornerOneX,cornerTwoY);
				break;

			case 'right':
				cornerOneX+=speed;
				cornerTwoX+=speed;
				cornerThreeX+=speed;

				context.moveTo(cornerThreeX,cornerThreeY);
				context.lineTo(cornerThreeX,cornerOneY);
				context.lineTo(cornerTwoX,cornerOneY+triangleDim);
				break;

			case 'left':
				cornerOneX-=speed;
				cornerTwoX-=speed;
				cornerThreeX-=speed;

				context.moveTo(cornerTwoX,cornerTwoY);
				context.lineTo(cornerTwoX,cornerOneY);
				context.lineTo(cornerThreeX,cornerOneY+triangleDim);
				break;

		}
		context.closePath();
		context.fill();
		var timer = setTimeout('drawPlayer()',timerSpeed);
	}
	
	function clearPlayer()
	{
        context.clearRect(0, 0, htmlCanvas.width, htmlCanvas.height);
        drawGrid();
        drawSpikes();
	}

	function setupSpikeLocations()
	{
		for(var i = 0; i<numOfSpikes; i++)
		{
			xOfCircle.push(Math.random()*worldDim/2);
			yOfCircle.push(Math.random()*worldDim/2);
			colorOfCircle.push(context.fillStyle = "#" +  Math.floor(Math.random()*0xFFFFFF).toString(16));
		}
	}
	function drawSpikes()
	{
		for(var i = 0; i<xOfCircle.length; i++)
		{
			context.beginPath();
      		context.arc(xOfCircle[i], yOfCircle[i], 30, 0, 2 * Math.PI, false);
      		context.fillStyle = colorOfCircle[i];
      		context.fill();
		}
	}

	document.onkeydown = function(e) 
	{
    	switch(e.keyCode) 
    	{
        	case 37:
        		direction = 'left';
            	break;
        	case 38:
        		direction = 'up';
            	break;
        	case 39:
        		direction = 'right';
            	break;
        	case 40:
        		direction = 'down';
            	break;
    	}
	};