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

Попробуем написать собственную реализацию bind:

{% codeblock lang:javascript %}
Function.prototype.mybind = function(context, ...args) {
    const fn = this;
    return function() { 
        return fn.apply(
            context,
            args
        );
    }
}

const x = 5;
add.mybind(x, 2)(); // 7
{% endcodeblock %}

Как видно из примера выше функция mybind работает аналогично стандартной функции bind.
То есть мы назначаем собственную функцию прототипу объекта Function
и в этой функции возвращаем функцию apply c переданным окружением и аргументами.

Перепишем её с использованием стрелочных функций для большей наглядности:

{% codeblock lang:javascript %}
Function.prototype.mybind = function(context, ...args) {
    return () => this.apply(context, args);
}

const x = 5;
add.mybind(x, 2)(); // 7
{% endcodeblock %}
