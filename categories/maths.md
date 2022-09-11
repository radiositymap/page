---
layout: page
title: Guides
permalink: /blog/categories/maths/
---

<h5> Posts by Category : {{ page.title }} </h5>

<div class="card">
{% for post in site.categories.maths %}
 <li class="category-posts"><span>{{ post.date | date_to_string }}</span> &nbsp; <a href="{{site.url}}{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</div>
