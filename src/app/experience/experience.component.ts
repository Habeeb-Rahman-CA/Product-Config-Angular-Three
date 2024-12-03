import { CUSTOM_ELEMENTS_SCHEMA, Component, viewChild, ElementRef, ChangeDetectionStrategy, computed } from '@angular/core';
import { extend, injectBeforeRender, injectLoader, injectStore, NgtArgs } from 'angular-three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

extend(THREE);
extend({ OrbitControls })

@Component({
  standalone: true,
  imports: [NgtArgs],
  template: `
  <ngt-ambient-light [intensity]="2"/>
  <ngt-directional-light [intensity]="2" [position]="[0, 0, 1]" />
  <ngt-directional-light [intensity]="2" [position]="[0, 0, -1]" />
  <ngt-point-light [intensity]="0.5" [position]="[1,1,0]" />
  <ngt-point-light [intensity]="0.5" [position]="[-0.5,-0.5,0]" />
  <ngt-primitive *args="[model()]" [position]="[0, -0.7, -0.1]" />
  <ngt-orbit-controls *args="[camara(), glDomElement()]" [autoRotate]="true" [autoRotateSpeed]="5"></ngt-orbit-controls>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {

  gltf = injectLoader(() => GLTFLoader, () => `scene.gltf`)
  ngtStore = injectStore()
  orbitControls = viewChild<ElementRef<OrbitControls>>('orbitControls')

  model = computed(() => {
    const gltf = this.gltf()
    if (!gltf) return null
    return gltf.scene
  })

camara = this.ngtStore.select('camera')
glDomElement = this.ngtStore.select('gl', 'domElement')

constructor(){
  injectBeforeRender(() => {
    const orbitControls = this.orbitControls()?.nativeElement;
    if (orbitControls) {
      orbitControls.update()
    }
  })
}

}

