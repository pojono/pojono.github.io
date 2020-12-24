---
title: "JavaScript: Closure"
tags: 
  - javascript
  - closure
categories:
  - coding      
---
Замыкание - это сочетание функции и лексического окружения в котором эта функция была определена.
То есть внутренняя функция имеет доступ к окружению внешней функции.

Пример, наглядно демонстрирующий работу замыкания:

{% codeblock lang:javascript %}
function counter () {
  let index = 0;
  return () => index++;
}

const myCounter1 = counter();
myCounter1(); // 0
myCounter1(); // 1
myCounter1(); // 2

const myCounter2 = counter();
myCounter2(); // 0
{% endcodeblock %}
