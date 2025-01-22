attribute vec4 tangent;

out vec2 vUv;
out vec3 worldPosition;
out vec3 worldNormal;
out vec3 viewDirection;
out vec3 normals;
out mat3 TBN;
out vec3 viewDirTangent;
out vec3 lightDirectionTangent;


void main()
{

    vec4 worldPos = modelMatrix * vec4( position, 1.0 );
    vec4 worldNorm = modelMatrix * vec4( normal, 0.0 );

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    vUv = uv;
    worldPosition = worldPos.xyz;
    worldNormal = worldNorm.xyz;
    viewDirection = cameraPosition - worldPosition.xyz;
    normals = normal;

    vec3 N = normalize( modelMatrix * vec4( normal, 0.0 ) ).xyz;
    vec3 T = normalize( modelMatrix * tangent ).xyz;
    vec3 B = normalize( cross( N, T ) * tangent.w );
    TBN = transpose( mat3( T, B, N ) );

    viewDirTangent = normalize( TBN * normalize( viewDirection ) );
    vec3 worldPosTangent = TBN * worldPosition;
    vec3 lightDirTangent = TBN * cameraPosition;
    lightDirectionTangent = normalize( lightDirTangent - worldPosTangent );
    
}