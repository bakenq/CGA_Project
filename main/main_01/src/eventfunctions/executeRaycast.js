import * as THREE from 'three';

window.raycaster = new THREE.Raycaster();

let blades = false;
let armDown = true;
let armDownBlender = true;

export function executeRaycast(event) {

  const mousePosition = new THREE.Vector2();
  mousePosition.x = 2 * (event.clientX / window.innerWidth) - 1;
  mousePosition.y = -2 * (event.clientY / window.innerHeight) + 1;

  window.raycaster.setFromCamera(mousePosition, window.camera);
  let intersects = window.raycaster.intersectObject(window.scene, true);

  if (intersects.length > 0) {
    let firstHit = intersects[0].object;
    //console.log(firstHit.name);

    if (firstHit.name === 'bladeArm') {
      firstHit.up = !firstHit.up;
      if (firstHit.up) {
        firstHit.tweenAnimationDown.stop();
        firstHit.tweenAnimationUp.start();
        armDown = false;
        blades = false;
      } else {
        firstHit.tweenAnimationUp.stop();
        firstHit.tweenAnimationDown.start();
        armDown = true;
      }
    } else if (firstHit.name === 'blades') {
      if (armDown) {
        blades = !blades;
      }
    } else if (firstHit.name === 'Arm') {
      firstHit.parentPowerstation.state.ArmUp = !firstHit.parentPowerstation.state.ArmUp;
      if (firstHit.parentPowerstation.state.ArmUp) {
        firstHit.parentPowerstation.animations.get('ArmDown').stop();
        firstHit.parentPowerstation.animations.get('ArmUp').play();

        firstHit.parentPowerstation.animations.get('RotationBlatR').stop();
        firstHit.parentPowerstation.animations.get('RottionBlatL').stop();
        armDownBlender = false;
      } else {
        firstHit.parentPowerstation.animations.get('ArmUp').stop();
        firstHit.parentPowerstation.animations.get('ArmDown').play();
        armDownBlender = true;
      }
    } else if (firstHit.name === 'BlatneuR' || firstHit.name === 'BlatneuL' || firstHit.name === 'Blatneu003' || firstHit.name === 'Blatneu'){
      firstHit.parentPowerstation.state.RotationBlatR = !firstHit.parentPowerstation.state.RotationBlatR;
      if (armDownBlender) {
        firstHit.parentPowerstation.animations.get('RotationBlatR').stop();
        firstHit.parentPowerstation.animations.get('RottionBlatL').stop();
        if (firstHit.parentPowerstation.state.RotationBlatR) {
          firstHit.parentPowerstation.animations.get('RotationBlatR').play();
          firstHit.parentPowerstation.animations.get('RottionBlatL').play();
        } else {
          firstHit.parentPowerstation.animations.get('RotationBlatR').stop();
          firstHit.parentPowerstation.animations.get('RottionBlatL').stop();
        }
      }
    }
  }

}

export {blades};
export {armDown};
