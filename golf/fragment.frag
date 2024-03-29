uniform sampler2D sampler2d0;
varying vec3 normal, lightDir, eyeVec;

void main (void)
{
	vec4 tex_color = texture2D(sampler2d0, gl_TexCoord[0].xy);

	vec4 final_color = 
	(gl_FrontLightModelProduct.sceneColor * vec4(1.0)) + 
	(gl_LightSource[0].ambient * vec4(0.5));
		
	vec3 N = normalize(normal);
	vec3 L = normalize(lightDir);
	
	float lambertTerm = dot(N,L);
	
	lambertTerm = max(lambertTerm, 0.0);
	final_color += gl_LightSource[0].diffuse * vec4(1.0) * lambertTerm;
		
	vec3 E = normalize(eyeVec);
		
	vec3 R = reflect(-L, N);
		
	float specular = 0.0;
		
	final_color += gl_LightSource[0].specular * specular;

	gl_FragColor = final_color;
}
