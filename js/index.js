function start(){
	
	var pos, $id=function(d){ return document.getElementById(d);};
	
	//Create 
	var tierra = new PhiloGL.O3D.Sphere(
		{
			
			nlat:30,
			nlong:30,
			radius:3,
			colors: [1.0, 0.0, 0.0, 1.0],
			//textures: 'https://lizgar.github.io/A3D/js/earth.jpg'
			textures: 'img/earth.jpg'
			 
				
		}
		
	);
	
	//Create application
PhiloGL('glCanvas',
		{
	camera: {
		position: {
			x:0, y:0, z:-10
		}
	},
	
	
	
	///////////////
	
	
	textures:{
		
		//src: ['https://lizgar.github.io/A3D/js/earth.jpg'],
		src: ['img/earth.jpg'],
		parameters: [{
			name: 'TEXTURE_MAG_FILTER',
			value: 'LINEAR'
		},{
			
			name: 'TEXTURE_MIN_FILTER',
			value: 'LINEAR_MIPMAP_NEAREST',
			generateMipmap: true
		}
			
		]
	},
	
	
		
	
///////////////////


events: {
      onDragStart: function(e) {
        pos = {
          x: e.x,
          y: e.y
        };
      },
      onDragMove: function(e) {
        var z = this.camera.position.z,
            sign = Math.abs(z) / z;

        tierra.rotation.y += -(pos.x - e.x) / 100;
        tierra.rotation.x += sign * (pos.y - e.y) / 100;
        tierra.update();
        pos.x = e.x;
        pos.y = e.y;
      },
      onMouseWheel: function(e) {
		  
		  
        e.stop();
		
		
        var camera = this.camera;
        camera.position.z += e.wheel;
        camera.update();
		
		
      },
	  
	  //////////////////
	  
	  onKeyDown: function(e) {
		  
        switch(e.key) {
         /* case 'f':
            filter = (filter + 1) % 3;
            break;*/
          case 'w':
            tierra.position.y += 0.1;
			//console.log('lexiste');
			tierra.update();
            break;
          case 's':
            tierra.position.y -= 0.1;
			tierra.update();
            break;
          case 'a':
            tierra.position.x += 0.1;
			tierra.update();
            break;
          case 'd':
            tierra.position.x -= 0.1;
			tierra.update();
            break;
		   
		  ///////////////
			
			case 'u':
            tierra.scale.y += 0.1;
			console.log('lexiste');
			tierra.update();
            break;
          case 'j':
            tierra.scale.y -= 0.1;
			tierra.update();
            break;
          case 'i':
            tierra.scale.x += 0.1;
			tierra.update();
            break;
          case 'k':
            tierra.scale.x -= 0.1;
			tierra.update();
            break;
			case 'o':
            tierra.scale.z += 0.1;
			tierra.update();
            break;
			case 'l':
            tierra.scale.z -= 0.1;
			tierra.update();
            break;
			
          //handle page up/down
          /*
		  default:
            if (e.code == 33) {
              z -= 0.05;
            } else if (e.code == 34) {
              z += 0.05;
            }
			*/
			
        }
      }
	  
	   
	  
	  ////////////////////// 
	  
	  
    },
		
    			
		
    onError: function() {
      alert("There was an error creating the app.");
    },


	onLoad: function(app){
		
		var gl= app.gl,
			program = app.program,
			scene = app.scene,
			canvas = app.canvas,
			camera = app.camera;


		lighting = $id('lighting'),
          ambient = {
            r: 1.0,
            g: 1.0,
            b: 0.0
          },
          direction = {
            x: 1.0,
            y: 1.0,
            z: 1.0,
          
            r: 1.0,
            g: 1.0,
            b: 1.0
          };


/*
		lighting = $id('lighting'),
          ambient = {
            r: $id('ambientR'),
            g: $id('ambientG'),
            b: $id('ambientB')
          },
          direction = {
            x: $id('lightDirectionX'),
            y: $id('lightDirectionY'),
            z: $id('lightDirectionZ'),
          
            r: $id('directionalR'),
            g: $id('directionalG'),
            b: $id('directionalB')
          };
		  
		*/  
		
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.viewport(0,0, +canvas.width, +canvas.height);
	
					
		tierra.update();
		scene.add(tierra);
		draw();
		
		/////////// draw
		
		function draw(){
			
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPHT_BUFFER_BIT);
			
				
		var lights = scene.config.lights;
        //lights.enable = lighting.checked;
        lights.ambient = {
          r: +ambient.r,
          g: +ambient.g,
          b: +ambient.b
        };
        lights.directional = {
          color: {
            r: +direction.r,
            g: +direction.g,
            b: +direction.b
          },
          direction: {
            x: +direction.x,
            y: +direction.y,
            z: +direction.z
          }
        };
		
				
		//Setup lighting
		/*
        var lights = scene.config.lights;
        lights.enable = lighting.checked;
        lights.ambient = {
          r: 0.0,
          g: 1.0,
          b: 0.0
        };
        lights.directional = {
          color: {
            r: 1.0,
            g: 1.0,
            b: 0.0
          },
          direction: {
            x: 1.0,
            y: 1.0,
            z: 1.0
          }
        };
		*/
		
		
		
		/////////////
			
			scene.render();
			
			PhiloGL.Fx.requestAnimationFrame(draw);
		}
		
		
	}
	
	
} );
}
