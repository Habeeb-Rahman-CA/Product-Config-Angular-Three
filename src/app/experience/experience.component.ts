import { CUSTOM_ELEMENTS_SCHEMA, Component, viewChild, ElementRef, ChangeDetectionStrategy, computed } from '@angular/core';
import { extend, injectBeforeRender, injectLoader } from 'angular-three';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

extend(THREE);

@Component({
  standalone: true,
  template: `
    
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {

  gltf = injectLoader(() => GLTFLoader, () => `scene.gltf`)

  model = computed(() => {
    const gltf = this.gltf()
    if (!gltf) return null

    return gltf.scene
  })

}

