---
title: "JavaScript: Bind"
tags: 
  - javascript
  - bind
categories:
  - coding      
---

Метод bind используется для привязки контекста к функции и возвращает новую функцию.

Например функция добавления числа к уже существующему:

{% codeblock lang:javascript %}
function add(n) {
    return this + n;
}

{% endcodeblock %}

Теперь создадим переменную со значением 5 и передадим её в качестве контекста в метод bind:
{% codeblock lang:javascript %}
const x = 5;
add.bind(x, 2)(); // 7
{% endcodeblock %}
