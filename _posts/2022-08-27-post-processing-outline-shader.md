---
layout: post
title:  "Post-Processing Outline Shader"
summary: "Wrote an outline shader in Unity using edge detection"
author: radiositymap
date: '2022-08-27'
category: ['graphics', 'post_processing']
thumbnail: /assets/img/posts/20220827-teahouse.png
usemathjax: false
---

## Outline Shader

There are many ways to render outlines to your image, and I tried using edge detection on an existing image to find and draw the outlines onto it. This is a post-processing shader, meaning I would read from the already rendered colour buffer and do further processing on the texture.

There are other methods like depth-based edge detection, which requires a 3D scene, but this method uses just the colour buffer, and essentially just the RGB channel data.

## Unity Post-Proceessing Shader

Before introducing edge-detection, I'd like to write a brief guide on creating a Unity post-processing shader. I'm using a rather old version of Unity, with just the built-in render pipeline. The post-processing shader is a normal shader whose input and output needs to be bound to the camera via code.

Create an 'Image effect shader'. Create a new material and assign this new shader to it.

Create a new C# script to bind the shader input and output. You'll have to use the 'OnRenderImage()' call back and 'Graphics.Blit()' function to draw using this shader and overwrite the colour buffer.

The 'OnRenderImage()' call back is only called on scripts which are attached to an active camera. The 'Graphics.Blit()' function sets two textures - the source texture would be accessible to the shader as '\_MainTex', and the destination is the texture rendered by the Camera.

Here is the code to set up the textures.

```cs
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[RequireComponent(typeof(Camera))]
public class ApplyImageEffect : MonoBehaviour
{
    public Material material;

    void OnRenderImage(RenderTexture src, RenderTexture dest) {
        Graphics.Blit(src, dest, material);
    }
}
```

Attach your script to the active camera.

## Edge-Detection

I used the [Sobel filter](https://homepages.inf.ed.ac.uk/rbf/HIPR2/sobel.htm) for edge detection.

Basically you have two 3x3 convolution kernels, in the x and y directions, to detect edges along that axis. After convolving with your image, you can obtain a single value indicating whether or not the texel is an edge.

I mentioned earlier we have the 3 colour channels in the colour buffer, so there are a few ways to do the convolution. I chose to just use the average of the colour values, but you can also calculate the luminance, or convolve across all channels getting multiple edge values.

This is my code for edge detection.

```c
fixed4 frag (v2f i) : SV_Target
{
    // edge detection using Sobel filter
    const half Gx[9] =
    {
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1,
    };
    const half Gy[9] =
    {
        -1, -2, -1,
         0,  0,  0,
         1,  2,  1,
    };

    float2 edgeX = 0;
    float2 edgeY = 0;
    float3 colour;
    float brightness;

    int idx = 0;
    for (int x=-1; x<2; x++) {
        for (int y=-1; y<2; y++) {
            colour = tex2D(_MainTex, i.uv +
                _MainTex_TexelSize.xy * _Thickness * float2(x, y)).rgb;
            brightness = ((colour.r + colour.g + colour.b)/3);
            edgeX += brightness * Gx[idx];
            edgeY += brightness * Gy[idx];
            idx++;
        }
    }

    float edge = 1 - abs(edgeX) - abs(edgeY);
    ...
}
```

How you use the edge value is up to you, but I created a limited-colour-palette shader with adjustable outline thickness and blending. I might write another post on that.

With just the edge value, you should be able to render a simple outline like this.

![Outline]({{site.url}}/assets/img/posts/20220827-outline.png)
