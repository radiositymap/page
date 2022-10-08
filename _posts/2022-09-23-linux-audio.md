---
layout: post
title:  "Linux Microphone Settings"
summary: "Fixing poor audio quality on Linux"
author: radiositymap
date: '2022-09-23'
category: ['linux', 'audio']
usemathjax: false
permalink: /blog/linux-audio/
---

For quite a while I've been having poor microphone audio quality. I managed to fix it using alsamixer, and by enabling the echo cancelling module in PulseAudio.

## Lower Mic Boost in alsamixer

Run `alsamixer`.

Press F6 to select the microphone input.

Lower the 'Mic Boost' value.

## Enable Echo Cancelling in PulseAudio

Open the pulse audio settings file at `'/etc/pulse/default.pa'`.

Add the line `load-module module-echo-cancel` to the file.

Restart PulseAudio. Kill the service by running `pulseaudio -k`. Start the service with `pulseaudio --start`.
