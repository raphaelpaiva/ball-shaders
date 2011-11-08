uniform sampler2D sampler2d0;
varying vec3 normal, lightDir, eyeVec;

void main()
{	
	vec4 new_vertex_pos;
	vec4 dv;
	float df;

	gl_TexCoord[0] = gl_MultiTexCoord0;

	dv = texture2D(sampler2d0, gl_MultiTexCoord0.xy);

	df = 0.30*dv.x + 0.59*dv.y + 0.11*dv.z;

	new_vertex_pos = vec4(gl_Normal * df * 0.18, 0.0) + gl_Vertex;

	normal = gl_NormalMatrix * gl_Normal;

	vec3 vVertex = vec3(gl_ModelViewMatrix * gl_Vertex);

	lightDir = vec3(gl_LightSource[0].position.xyz - vVertex);
	eyeVec = -vVertex;

	gl_Position = gl_ModelViewProjectionMatrix * new_vertex_pos;
}
