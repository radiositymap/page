---
layout: post
title:  "Matrix Transformation Cheat Sheet"
summary: "Cheat sheet for matrix transformations in graphics"
author: radiositymap
date: '2022-09-09'
category: ['graphics', 'maths']
thumbnail: /assets/img/posts/2022-09-09-matrix.png
usemathjax: true
permalink: /blog/matrix-transformation-cheat-sheet/
---

Since I deal with matrices quite a bit, I thought I should collate a cheat sheet for reference.

## Transformation Matrix

To transform a point, pre-multiply the point with the transformation matrix.

$$
p' = T \times p
$$

### Translation Matrix

$$
T =
\begin{bmatrix}
 1 & 0 & 0 & T_x \\
 0 & 1 & 0 & T_y \\
 0 & 0 & 1 & T_z \\
 0 & 0 & 0 & 1
\end{bmatrix}
$$

### Scaling Matrix

$$
S =
\begin{bmatrix}
 S_x & 0 & 0 & 0 \\
 0 & S_y & 0 & 0 \\
 0 & 0 & S_z & 0 \\
 0 & 0 & 0 & 1
\end{bmatrix}
$$

### Rotation Matrices

$$
R_x = 
\begin{bmatrix}
 1 & 0 & 0 & 0 \\
 0 & cos\,\theta & -sin\,\theta & 0 \\
 0 & sin\,\theta & cos\,\theta & 0 \\
 0 & 0 & 0 & 1
\end{bmatrix}
$$

$$
R_y = 
\begin{bmatrix}
 cos\,\theta & 0 & sin\,\theta & 0 \\
 0 & 1 & 0 & 0 \\
 -sin\,\theta & 0 & cos\,\theta & 0 \\
 0 & 0 & 0 & 1
\end{bmatrix}
$$

$$
R_z = 
\begin{bmatrix}
 cos\,\theta & -sin\,\theta & 0 & 0 \\
 sin\,\theta & cos\,\theta & 0 & 0 \\
 0 & 0 & 1 & 0 \\
 0 & 0 & 0 & 1
\end{bmatrix}
$$

## Order of Matrix Transformations

Scale -> Rotate -> Translate

$$
p' = T \times R \times S \times p
$$

## Matrix Inversion

To undo a matrix transformation, pre-multiply the point with the inverse of the transformation matrix.

$$
p = T^{-1} \times p'
$$

### Definition of Inverse Matrix

The inverse matrix, $$T^{-1}$$ is a matrix such that

$$
T x T{^-1} = T{^-1} \times T = I,
$$

where I is the identity matrix.

### Inverse of Combined Matrices

By definition, we get the identity matrix when multiplying a matrix with its inverse, hence, we can undo the effect of matrices by pre-multiplying the reverse combination of the matrices applied.

Here is an example using the model-view-projection matrix.

$$
p' = P \times V \times M \times p
$$

To get back p, we can apply $$P^{-1} V^{-1} M^{-1}$$ as follows.

$$
\begin{align*}
p &= M^{-1} V^{-1} P^{-1} P V M p \\
  &= M^{-1} V^{-1} (P^{-1} P) V M p \\
  &= M^{-1} V^{-1} I V M p \\
  &= M^{-1} (V^{-1} V) M p \\
  &= (M^{-1} M) p \\
  &= p
\end{align*}
$$

Therefore,

$$
p = M^{-1} V^{-1} P^{-1} p'
$$

Hence, the inverse of the matrix, $$PVM$$, is $$M^{-1} V^{-1} P^{-1}$$.
