uniform sampler2D sampler2d0, sampler2d1, sampler2d2, sampler2d4;
varying vec3 normal, lightDir, eyeVec;

void main (void)
{
	vec4 tex_color = texture2D(sampler2d0, gl_TexCoord[0].xy);
	vec4 tex_color_garras = texture2D(sampler2d1, gl_TexCoord[0].xy);
	vec4 tex_color_logo = texture2D(sampler2d2, gl_TexCoord[0].xy);
	vec4 tex_color_dirt = texture2D(sampler2d4, gl_TexCoord[0].xy);

	tex_color = tex_color * tex_color_logo;

	tex_color *= tex_color_garras;

	tex_color = max(tex_color + tex_color_dirt, vec4(0.0, 0.0, 0.0, 1.0));

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
			float k = max(dot(R, E), 0.0);

		    specular = pow(k, 32.0);
		}

		final_color += gl_LightSource[0].specular * specular;	
	}

	gl_FragColor = final_color;			
}

