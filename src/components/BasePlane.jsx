import React, { useEffect, useRef } from 'react'
import BaseMaterial from '../materials/BaseMaterial.jsx'
import { PlaneGeometry } from 'three'
import { useControls } from 'leva'

export default function BasePlane() 
{
  const self = useRef()

  const { parallaxScale } = useControls({
    parallaxScale:{
      value: 0.07,
      min: 0.0001,
      max: 0.25,
      step: 0.01
    }
  })

  const geometry = new PlaneGeometry( 8, 5, 64, 64 )
  geometry.computeTangents()

  return (
    <mesh ref={ self } geometry={ geometry }>
        <BaseMaterial
          parallaxScale={ parallaxScale }
        />
    </mesh>
  )
}
