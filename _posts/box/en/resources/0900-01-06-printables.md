---
layout: box
permalink: /en/resources/printables/
lang: en
title: Printables
category: resources
published: true
---

<div class="row">
  <div class="col-md-12">
      <div class="row">
        {% assign sorted_pages = (site.categories.printable | reversed sort: 'date') %}
          {% for post in sorted_pages %}
            {% assign display = null %}
            {% assign ready = null %}
            {% if post.featured == true %}{% assign display = true %}{% endif %}
            {% if display == true %}

            {% capture thecycle %}{% cycle '1', '2', '3' %}{% endcapture %}
    
              {% if thecycle == '4' %}
              <div class="row">
              {% endif %}

              <div class="col-sm-4 projects-thumbnail">
                <div class="projects-container">
                  <a href="{{ post.external_url }}" class="image">
                    <img src="{{ post.photo }} " alt="{{ post.title }}" class="img-responsive shadowed" />
                  </a>
                  <div class="caption">
                    <h3><a href="{{ post.external_url }}">{{ post.title }}</a></h3>
                    <p><strong>author</strong>: {{ post.author }}</p>
                    <!--
                    <p><strong>published</strong>: {{ post.date | date: '%B %d, %Y' }}</p>
                    -->
                  </div>
                </div>
              </div>

              {% if thecycle == '4' %}
                </div>
              {% endif %}

            {% endif %}
          {% endfor %}
      </div>
  </div>
</div>

