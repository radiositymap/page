---
layout: post
title:  "Code Completion on VSCodium"
summary: "Getting Unity C# code completion to work on Linux"
author: radiositymap
date: '2024-01-04'
category: ['linux', 'unity3d']
thumbnail: /assets/img/posts/2024-01-04-autocomplete.png
usemathjax: true
permalink: /blog/vscodium-code-completion/
---

I do Unity development on Linux, and it's quite hard to get all the tools to work because C# belongs to Microsoft. I use VSCodium, which is the open-source version of Visual Studio Code, and the main challenge is getting the auto-complete function to work on VSCodium.

## Mono

I first tried installing Mono, but found that it was already installed on my system. Just in case, the instructions for installation are [here](https://forum.unity.com/threads/solved-unity-with-vs-code-and-intellisense-on-linux-mint.986088/#post-6405369).

## .NET

I also installed a newer version of the .NET SDK. You can find all your installed versions wih the following command.

```
dotnet --list-sdks
```

It seems Unity has updated its requirements, so .NET 6.0 is needed now. I installed it from my package repository.

```
sudo apt install dotnet-sdk-6.0
```

## Disable Modern Net

I had to disable the 'Use Modern Net' option in VSCodium for Omnisharp to run properly. Go to **Files > Preferences > Settings** and look for the 'Use Modern Net' setting. Set this to false.

## Rename VSCodium Executable

After that, I wanted to upate my C# project files, but I had to first change my editor executable to 'code' so that Unity would show the project file regeneration options.

To do that, I created a symlink of the VSCodium executable.

```
ln -s codium code
```

I then went to Unity's **Preferences > External Tools**, and changed the **External Script Editor** to 'code'.

## Regenerate Project Files

After that, the options showed up, so I regenerated the project files for Embedded packages, Local packages, Git packages and Built-In packages.

## Restart VSCodium

Finally, I restarted VSCodium by clicking on a script in the Unity Editor, and let the Omnisharp server run. With this, the code completion worked for me.
