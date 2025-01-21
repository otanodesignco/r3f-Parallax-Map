import { shaderMaterial, useTexture } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import vertex from '../shaders/vertex.glsl'
import fragment from '../shaders/fragment.glsl'
import { RepeatWrapping, Vector2, Color } from 'three'

export default function BaseMaterial( {
    albedo ='./textures/albedo/albedoIce.jpg',
    height = './textures/heightmaps/heightIce.jpg',
    normal = './textures/normalmaps/normalIce.jpg',
    parallaxScale = 0.354,
    lightColor = '#b9e8ea',
    darkColor = '#20c3d0',
    ...props
} ) 
{
    const self = useRef()

    const textureAlbedo = useTexture( albedo )
    textureAlbedo.wrapS = RepeatWrapping
    textureAlbedo.wrapT = RepeatWrapping

    const textureHeight = useTexture( height )
    textureHeight.wrapS = RepeatWrapping
    textureHeight.wrapT = RepeatWrapping

    const textureNormal = useTexture( normal )
    textureNormal.wrapS = RepeatWrapping
    textureNormal.wrapT = RepeatWrapping

    lightColor = ( lightColor instanceof Color ) ? lightColor : new Color( lightColor )
    darkColor = ( darkColor instanceof Color ) ? darkColor: new Color( darkColor )

    const uniforms =
    {

        uTime: 0,
        uAlbedo: textureAlbedo,
        uHeight: textureHeight,
        uNormals: textureNormal,
        uParallaxScale: parallaxScale,
        uLightColor: lightColor,
        uDarkColor: darkColor,

    }

    useFrame( ( state, delta ) =>
    {
        self.current.uniforms.uTime.value += delta
    })

    const BaseMaterial = shaderMaterial( uniforms, vertex, fragment )
    extend( { BaseMaterial } )

    return (
        <baseMaterial
            key={ BaseMaterial.key }
            ref={ self }
            {...props}
        />
    )
}