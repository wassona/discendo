window.onload = function() {
	console.log("window loaded")

	document.querySelectorAll('.assignment-divider').forEach(function(div){
		div.addEventListener('click', dividerClick, false);

	});

	function dividerClick(e){
		var newDiv = document.createElement('div'),  // element to make resizable
			resizer = document.createElement('div'),
			remover = document.createElement('div'),
			parent = e.target.parentNode,
			parentHeight = window.getComputedStyle(parent).height,
			startY, startHeight;
		

		newDiv.className = "auto-label";
		resizer.className = 'resizer';
		remover.className = 'auto-label-remover';
		parent.appendChild(newDiv);
		console.log(e.target.offsetTop/parseInt(parentHeight));
		newDiv.style.top = (e.target.offsetTop/parseInt(parentHeight))*100 + "%";
		newDiv.addEventListener('click', init, false);

		function init() {
		    newDiv.removeEventListener('click', init, false);
		    newDiv.addEventListener('click', end, false);
		    newDiv.appendChild(resizer);
		    newDiv.appendChild(remover);
		    resizer.addEventListener('mousedown', initDrag, false);
		    remover.addEventListener('click', destroy, false);
		};

		function initDrag(e) {
		   startY = e.clientY;
		   e.preventDefault();
		   startHeight = parseInt(document.defaultView.getComputedStyle(newDiv).height, 10);
		   document.documentElement.addEventListener('mousemove', doDrag, false);
		   document.documentElement.addEventListener('mouseup', stopDrag, false);
		}

		function doDrag(e) {
		   newDiv.style.height = ((startHeight + e.clientY - startY)/parseInt(parentHeight))*100 + '%';
		}

		function stopDrag(e) {
		    document.documentElement.removeEventListener('mousemove', doDrag, false);
		    document.documentElement.removeEventListener('mouseup', stopDrag, false);
		}

		function end(){
			newDiv.removeEventListener('click', end, false);
			newDiv.addEventListener('click', init, false);
			newDiv.removeChild(resizer);
			newDiv.removeChild(remover);
		};

		function destroy(){
			parent.removeChild(newDiv);
		}

	}


}