import * as THREE from 'three';
import { BlendFunction, EffectComposer, RenderPass, EffectPass, OutlineEffect } from 'postprocessing';
import { ChaosNumber } from './ChaosNumber';

const warp: number[] = [0.64, 0.55, 0.5, 0.42];

export class TheEpicBox3D {
  private existence: THREE.Scene = new THREE.Scene();
  private camera: THREE.Camera = new THREE.PerspectiveCamera(70);
  private boxial_core: THREE.Group = new THREE.Group();
  private ready: boolean = true;
  private done: boolean = false;
  private quantum: ChaosNumber = new ChaosNumber(37, 3);
  private spaceception_limit: number = 0;
  private timer: THREE.Clock = new THREE.Clock();
  private time: number = 0;
  private everything_capture: THREE.MeshStandardMaterial | null = null;
  private everythings: THREE.Mesh[] = [];
  private reality: THREE.WebGLRenderer | null = null;
  private dimension: EffectComposer | null = null;
  private anything_in_between: OutlineEffect | null = null;
  
  constructor(resolution: number, private manual: boolean){
    this.camera.position.set(0, 0, (0.5 * Math.cos(Math.PI / 4)) + (Math.sqrt(3) / (2 * Math.tan((70 * (Math.PI / 180)) / 2))));
    this.existence.add(this.boxial_core);
    this.existence.add(new THREE.AmbientLight(0xffffff, 0.42));
    let existence_light = new THREE.DirectionalLight(0xffffff, 1);
    existence_light.position.set(0, 5, 0);
    existence_light.applyMatrix4(new THREE.Matrix4().makeRotationZ(-30 * (Math.PI / 180)));
    this.existence.add(existence_light);
    let The_True_Box: HTMLCanvasElement = document.createElement("canvas");
    The_True_Box.width = resolution;
    The_True_Box.height = resolution;
    this.reality = new THREE.WebGLRenderer({
      canvas: The_True_Box,
      powerPreference: "high-performance"
    });
    this.dimension = new EffectComposer(this.reality);
    this.dimension.addPass(new RenderPass(this.existence, this.camera));
    this.anything_in_between = new OutlineEffect(this.existence, this.camera, {
      blendFunction: BlendFunction.SCREEN,
      edgeStrength: 10,
      visibleEdgeColor: 0xffffff,
      hiddenEdgeColor: 0xffffff,
      multisampling: 4,
      height: 1080 * (2048 / resolution),
      blur: true,
      xRay: true
    });
    this.existence.background = new THREE.Color(0xcccccc);
    this.captureEverything().then((val) => {
      this.spaceception_limit = val;
      if(manual){
        this.captureTheEpicBox().then(() => {
          this.existence.background = new THREE.Color(0x000000);
          this.dimension!.render();
          this.done = true;
        });
      }
      else{
        this.boxial_core.rotation.x -= 0.05;
        this.boxial_core.rotation.y -= 0.08;
        this.boxial_core.rotation.z -= 0.02;
        this.animate();
      }
    });
  }

  public async *getRenderFrames(): AsyncGenerator<string>{
    while(this.reality != null){
      if(this.done){
        yield this.reality.domElement.toDataURL();
        this.done = false;
      }
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    return "";
  }

  public async next(): Promise<void>{
    if(this.manual&&this.dimension != null){
      this.time += 1/60;
      this.existence.background = new THREE.Color(0xcccccc);
      if(this.time >= 1/12){
        await this.captureEverything();
        this.time = 0;
      }
      this.boxial_core.rotation.x += 0.05;
      this.boxial_core.rotation.y += 0.08;
      this.boxial_core.rotation.z += 0.02;
      await this.captureTheEpicBox();
      this.existence.background = new THREE.Color(0x000000);
      this.dimension.render();
      this.done = true;
      this.ready = true;
    }
  }

  private async captureEverything(): Promise<number>{
    if(this.dimension != null&&this.anything_in_between != null){
      this.anything_in_between.selection.clear();
      this.boxial_core.clear();
      this.everythings.forEach((val) => {
        val.geometry.dispose();
        try{
          if(Array.isArray(val.material)){
            val.material.forEach((val2) => {
              val2.dispose();
            });
          }
          else{
            val.material.dispose();
          }
        }
        catch(e){}
      });
      let layer: number = 0;
      let loading = true;
      new THREE.TextureLoader().load("/THE_BOX.jpg", (THE_BOX) => {
        this.everything_capture = new THREE.MeshStandardMaterial({
          map: THE_BOX,
          side: THREE.FrontSide
        });
        let inside: number = 1;
        while(inside >= 0.00001){
          for(let x = 0;x < 6;x++){
            if(this.quantum.next() >= 0.64){
              continue;
            }
            let everything0 = new THREE.Mesh(new THREE.PlaneGeometry(inside, inside), this.everything_capture);
            switch(x){
              case 0:
                everything0.position.set(0, -0.5 + inside, 0);
                everything0.rotation.set(Math.PI / 2, 0, 0);
                break;
              case 1:
                everything0.position.set(0, -0.5 + (inside / 2), inside / 2);
                everything0.rotation.set(0, Math.PI, 0);
                break;
              case 2:
                everything0.position.set(inside / -2, -0.5 + (inside / 2), 0);
                everything0.rotation.set(0, Math.PI / 2, 0);
                break;
              case 3:
                everything0.position.set(0, -0.5 + (inside / 2), inside / -2);
                break;
              case 4:
                everything0.position.set(inside / 2, -0.5 + (inside / 2), 0);
                everything0.rotation.set(0, Math.PI / -2, 0);
                break;
              case 5:
                everything0.position.set(0, -0.5, 0);
                everything0.rotation.set(Math.PI / -2, 0, 0);
                break;
            }
            this.everythings.push(everything0);
            this.boxial_core.add(everything0);
            this.anything_in_between!.selection.add(everything0);
          }
          inside *= warp[THREE.MathUtils.clamp(layer, 0, warp.length - 1)];
          layer += 1;
        }
        this.dimension!.addPass(new EffectPass(this.camera, this.anything_in_between!));
        loading = false;
      });
      while(loading){
        await new Promise(resolve => setTimeout(resolve, 0));
      }
      return layer;
    }
    return -1;
  }

  private async captureTheEpicBox(relative_time: number = 0): Promise<void>{
    if(relative_time < this.spaceception_limit&&this.everything_capture != null&&this.reality != null&&this.dimension != null){
      this.dimension.render();
      let loading: boolean = true;
      new THREE.TextureLoader().load(this.reality.domElement.toDataURL(), (The_Epic_Box) => {
        this.everything_capture!.map = The_Epic_Box;
        loading = false;
      });
      while(loading){
        await new Promise(resolve => setTimeout(resolve, 0));
      }
      await this.captureTheEpicBox(relative_time + 1);
    }
  }

  private animate(): void {
    requestAnimationFrame(() => {
      this.animate();
    });
    this.time += this.timer.getDelta();
    if(this.ready&&(!this.manual)&&this.dimension != null){
      this.ready = false;
      this.existence.background = new THREE.Color(0xcccccc);
      if(this.time >= 1/12){
        this.captureEverything().then(() => {
          this.boxial_core.rotation.x += 0.05;
          this.boxial_core.rotation.y += 0.08;
          this.boxial_core.rotation.z += 0.02;
          this.captureTheEpicBox().then(() => {
            this.existence.background = new THREE.Color(0x000000);
            this.dimension!.render();
            this.done = true;
            this.ready = true;
          });
        });
        this.time = 0;
      }
      else{
        this.boxial_core.rotation.x += 0.05;
        this.boxial_core.rotation.y += 0.08;
        this.boxial_core.rotation.z += 0.02;
        this.captureTheEpicBox().then(() => {
          this.existence.background = new THREE.Color(0x000000);
          this.dimension!.render();
          this.done = true;
          this.ready = true;
        });
      }
    }
  }
}