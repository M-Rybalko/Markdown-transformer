# Markdown-transformer

It is a console app I did as a practice task in KPI University

You can transform a `Markdown` file to `HTML` and write it to a separate file.

No libs designed to work with Markdown were used.

## Installing the program
***

First up, clone the repository via this command:

    https://github.com/M-Rybalko/Markdown-transformer.git

Install the dependencies:

    npm install

Run the program:

    node mdtransformer.js <path-to-md-file> -o <path-to-html-file>

This will transform your markdown text to HTML and write it into the file you provided a path to.
> You are not obliged to put in `-o <path-to-html-file>` option. If you don't do so, the result will be printed in console.

For instance, let's parse our `example.md` file with an outstanding joke in it. It can be done with the command `node mdtransformer.js ./example.md -o ./index.html`
```md
Заходить чоловік в **магазин** і _просить_продавчиню_:

-- Дайте `мені`, **будь ласка**, _200 грам ковбаси_. Але 80 грам відріжте з **одного кінця**, а 120 - з _іншого_
    ```
    Продавчиня **здивувалась**, але зробила `все як він і просив`. Вже майже чоловік вийшов, як вона питає:
    -- А ви що, _з поліції_?
    ```

-- Так, я **поліцейський**. `А як ви дізнались?`

-- _А на вас форма поліцейська_
```
> The tabulation is not present in original examle file but i did it here for the sake of aesthetics :)

The result we will get is:

```html
<p>Заходить чоловік в <b>магазин</b> і <i>просить_продавчиню</i>:</p>
<p>-- Дайте <tt>мені</tt>, <b>будь ласка</b>, <i>200 грам ковбаси</i>. Але 80 грам відріжте з <b>одного кінця</b>, а 120 - з <i>іншого</i>
<pre>
Продавчиня **здивувалась**, але зробила `все як він і просив`. Вже майже чоловік вийшов, як вона питає:
-- А ви що, _з поліції_?
</pre></p>
<p>-- Так, я <b>поліцейський</b>. <tt>А як ви дізнались?</tt></p>
<p>-- <i>А на вас форма поліцейська</i></p>
```

## Revert commit

[Revert commit link]([https://link-url-here.org](https://github.com/M-Rybalko/Markdown-transformer/commit/3667adadc58254f946613d69cb063f877d79b5c2)https://github.com/M-Rybalko/Markdown-transformer/commit/3667adadc58254f946613d69cb063f877d79b5c2)
