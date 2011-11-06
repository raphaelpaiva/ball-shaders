uniform sampler2D sampler2d0, sampler2d1;
varying vec3 normal, lightDir, eyeVec;

void main (void)
{
	vec4 tex_color = texture2D(sampler2d0, gl_TexCoord[0].xy);
	vec4 tex_color2 = texture2D(sampler2d1, gl_TexCoord[0].xy);

	if (tex_color.rgb != vec3(0.0))
	{
		tex_color = tex_color2;
	}

	vec4 final_color = 
	(gl_FrontLightModelProduct.sceneColor * tex_color) + 
	(gl_LightSource[0].ambient * tex_color);
							
	vec3 N = normalize(normal);
	vec3 L = normalize(lightDir);
	
	float lambertTerm = dot(N,L);
	
	if(lambertTerm > 0.0)
	{
		final_color += gl_LightSource[0].diffuse * tex_color * lambertTerm;
		
		vec3 E = normalize(eyeVec);
		
		vec3 R = reflect(-L, N);
		
		float specular = 0.0;

		if (tex_color.xyz == vec3(0.0))
		{
			specular = pow( max(dot(R, E), 0.0), 8 );
		}
		
		final_color += gl_LightSource[0].specular * specular;	
	}

	gl_FragColor = final_color;			
}
