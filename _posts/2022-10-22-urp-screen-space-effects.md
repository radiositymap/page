---
layout: post
title:  "Screen-space Effects on Unity URP"
summary: "Notes on Unity's universal render pipeline"
author: radiositymap
date: '2022-10-22'
category: ['graphics', 'unity3d']
thumbnail: /assets/img/posts/2022-10-22-urp.png
usemathjax: false
permalink: /blog/urp-screen-space/
---

I tried setting up a screen-space outline shader for Unity's universal rendering pipeline. It was more complicated than I thought, especially since I was using the older version (7.7), so here are some notes.

# Renderer Feature

You have to use a renderer feature to set up screen-space effects. I had to extend the 'ScriptableRendererFeature' and 'ScriptableRenderPass' classes to create my own custom render pass that could be used in the renderer.

The code I found in the Unity manual and other tutorials didn't work with my version of the universal pipeline, so I modified the implementation of one of the existing renderer features in Unity's URP demo project.

After setting up the renderer feature, you can go to the renderer asset and click 'Add Renderer Feature' to add your custom feature. You'll need to expose a shader or material field in your renderer feature so that you can implement your effect in the shader.

# Quirks

Some parts of the process were very unintuitive, so I'll document them here.

## Copying Buffers

I was implementing an outline shader, so I had to take in the camera buffer contents and process them, then write them to the camera buffer again. You cannot read and write to the same buffer in one pass, so I thought I should copy the buffer contents out to a temporary buffer before processing.

I tried using the 'CommandBuffer.CopyTexture()' command to copy the camera buffer contents out, but I got an error notifying me that the formats of the source and destination were different. Upon some debugging, my suspicions were that the editor's scene mode colour format was 'ARGBHalf', and the play mode format was 'ARGB32'. I couldn't get this to work so I tried something else.

There was also the 'ConvertTexture()' command, but this didn't work either, and I got some null source errors. It seems that only blitting works.

I wrote a work-around using blitting, by passing shader pass IDs so that I could blit with pass-through shaders, effectively copying out the texture.

## Shader Variables

You can set shader variables in the pipeline by using 'CommandBuffer.SetGlobalFloat()' and equivalent functions for each variable type. There are also 'SetGlobalTexture()', 'SetGlobalInt()' and so on.

These variables are only passed to the shader correctly if the variables are not defined as shader properties. For instance, my variables are defined as follows. I commented them out so it's easy to see that I've not defined the variables in the 'Properties' section. They are defined only in the pass.

```c
Shader "Custom/RenderFeature/Outline"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        //_BackgroundTex ("Background Texture", 2D) = "white" {}
        //_LineColour("Line Colour", Color) = (0, 0, 0, 1)
        //_Threshold("Threshold", Range(0, 1)) = 0.5
        //_Thickness("Thickness", Float) = 1
        //_PassId("PassId", Int) = 0
    }

    SubShader
    {
        ...
        Pass
        {
            CGPROGRAM
            ...
            sampler2D _MainTex;
            sampler2D _BackgroundTex;
            float4 _MainTex_TexelSize;
            float4 _MainTex_ST;
            float4 _BackgroundTex_ST;
            float4 _LineColour;
            float _Threshold;
            float _Thickness;
            int _PassId;
            ...
            ENDCG
        }
    }
}
```

# Aside

WebGL on Linux requires the 'libtinfo5' library.
