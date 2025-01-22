uniform float uTime;
uniform sampler2D uAlbedo;
uniform sampler2D uHeight;
uniform sampler2D uNormals;
uniform float uParallaxScale;
uniform vec3 uLightColor;
uniform vec3 uDarkColor;

in vec2 vUv;
in vec3 worldPosition;
in vec3 worldNormal;
in vec3 viewDirection;
in vec3 normals;
in mat3 TBN;
in vec3 viewDirTangent;
in vec3 lightDirectionTangent;

#include ./lib/uv/uvPOM.glsl

void main()
{

    vec2 uv = vUv;
    float time = uTime;
    vec2 parallaxUV = uvPOM( uHeight, uv, lightDirectionTangent, uParallaxScale, 8.0, 128.0 );

    vec3 normalz = texture( uNormals, parallaxUV ).xyz * 2.0 - 1.0;
    normalz = normalize(normalz );

    float diffuse = max( dot( lightDirectionTangent, normalz ), 0.0 );

    vec4 albedo = texture( uAlbedo, parallaxUV );
    vec3 colorIce = mix( uLightColor, uDarkColor, 1.0 - diffuse );
    albedo.rgb *= diffuse * colorIce;

    

    gl_FragColor = albedo;
    
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
    
}