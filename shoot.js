AFRAME.registerComponent("bullets", {
    init: function () {
      this.shootBall();
    },
    shootBall: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var bullet = document.createElement("a-entity");
  
          bullet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.4,
          });
  
          bullet.setAttribute("material", "color", "black");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          bullet.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          bullet.setAttribute("velocity", direction.multiplyScalar(-10));
          bullet.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0"
          })
  
          var scene = document.querySelector("#scene");
          bullet.addEventListener("collide", this.removeBall)
  
          scene.appendChild(bullet);
        }
      });
    },

    removeBall: function(e){
       console.log(e.detail.target.el)
       console.log(e.detail.body.el)
       var element = e.detail.target.el
       var element_h = e.detail.body.el
       if(element_h.id.includes("box")){
          element_h.setAttribute("material", {opacity: 0.1, transparent: true})
       }
       element.removeEventListener("collide", this.shoot)
       var scene = document.querySelector("#scene");
       scene.removeChild(element)
    }
  });
  