uniform sampler2D sampler2d3, sampler2d5;
varying vec3 normal, lightDir, eyeVec;

void main()
{
	vec4 vertex = gl_Vertex;

	vec4 color_map = texture2D(sampler2d3, gl_MultiTexCoord0.xy);
	vec4 color_map_bico = texture2D(sampler2d5, gl_MultiTexCoord0.xy);

	if(color_map.rgb != vec3(1.0))
	{
		vertex.xyz *= (0.98);
	}

	if (color_map_bico.rgb == vec3(0.0))
	{
		vertex.xyz *= (0.8);
	}

	vertex = gl_ModelViewMatrix * vertex;
	
	normal = gl_NormalMatrix * gl_Normal;

	vec3 vVertex = vec3(gl_ModelViewMatrix * vertex);

	lightDir = vec3(gl_LightSource[0].position.xyz - vVertex);
	eyeVec = -vVertex;

	gl_Position = gl_ProjectionMatrix * vertex;
	gl_TexCoord[0] = gl_MultiTexCoord0;
}

