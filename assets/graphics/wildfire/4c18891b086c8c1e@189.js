function _1(md){return(
md`# Product Education Callout Boxes`
)}

function _2(note){return(
note("This is a note. You can write any HTML in here, but you'll need to write htl.html`` or md``. Check out the next example.")
)}

function _exampleNote(note,md,fileIcon){return(
note(md`**Note**: You can also use the **Files** icon ${fileIcon()} in the upper-right of the notebook (then click the plus sign next to **File attachments**).`)
)}

function _note(box){return(
box("hsl(55deg 80% 98%)")
)}

function _5(try_it,htl){return(
try_it(htl.html`This is a <b>Try it!</b> box. Use Try it! boxes to prompt users to tinker with or add code in a notebook.`)
)}

function _try_it(box){return(
box("hsl(204, 100%, 93%)")
)}

function _7(details,htl){return(
details(htl.html`This is a <b>Details</b> box.`)
)}

function _details(box){return(
box("hsl(0, 0%, 96%)")
)}

function _9(md){return(
md`### Columns`
)}

function _10(md){return(
md`Pass multiple arguments to a box to display each text as a column:`
)}

function _11(details,md){return(
details(
  md`
**Detail One**

Here's a bunch of information about detail one

Here's more information about detail one
  `,
  md`
**Detail Two**

Here's a bunch of information about detail two

Here's more information about detail one
  `,
  md`
**Detail Three**

Here's a bunch of information about detail three

Here's more information about detail one
  `
)
)}

function _12(details,md){return(
details(
  md`
**Free**
- Create an unlimited number of notebooks.
- Work in public; that is, your notebooks are visible to everyone.
  `,
  md`
**Pro**
- Create an unlimited in public or private; make them public when you choose.
- Use private data such as data from [database connections](https://observablehq.com/@observablehq/databases) or [secrets](https://observablehq.com/@observablehq/secrets).
  `
)
)}

function _13(md){return(
md`### Table`
)}

function _14(details_table,htl){return(
details_table(htl.html`

<table>
  <tr>
    <th>Detail One</th>
    <th>Detail Two</th>
    <th>Detail Three</th>
  </tr>
  <tr>
    <td>Here's a bunch of information about detail one</td>
    <td>Here's a bunch of information about detail two</td>
    <td>Here's a bunch of information about detail three</td>
  </tr>
  <tr>
    <td>Here's more information about detail one</td>
    <td>Here's more information about detail one</td>
    <td>Here's more information about detail one</td>
  </tr>
</table>`)
)}

function _15(md){return(
md`It also works well for lists!`
)}

function _16(details_table,htl){return(
details_table
  (htl.html`

</style>

<table>
  <tr>
    <th>Free</th>
    <th>Pro</th>
  </tr>
  <tr>
    <td>
      <ul>
        <li>Create an unlimited number of notebooks.</li>
        <li>Work in public; that is, your notebooks are visible to everyone.</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>Create an unlimited in public or private; make them public when you choose.</li>
        <li>Use private data such as data from <a href='https://observablehq.com/@observablehq/databases'>database connections</a> or <a href='https://observablehq.com/@observablehq/secrets'>secrets</a>.</li>
      </ul>
    </td>
  </tr>
</table>`)
)}

function _details_table(box){return(
box("hsl(0, 0%, 96%)", {
  css: `
    :scope table {
      border: none !important;
      padding: 0px;
      margin: 0px;
    }

    :scope tr {
      border: none !important;
      padding-bottom: 5px;
      margin: 0px;
    }

    :scope th,
    :scope td {
      width: 29%;
      border-right: 1px solid #ccc;
      padding-left: 2%;
      padding-right: 2%;
    }

    :scope th:last-child,
    :scope td:last-child {
        border-right: none;
    }

    :scope ul {
      margin: 0px;
      padding-left: 5%;
    }

    :scope li {
      padding: 3px;
    }
  `
})
)}

function _18(md){return(
md`---
## Box Helper

**Notes:**
- The selector \`:scope\` is replaced with the actual class selector.
- \`css\` can also be a function that receives the current scope (if, for example, you want to apply the scope as a namespace).
- Multiple columns are supported out of the box.`
)}

function _box(FONT_SIZE,DOM,htl,ensureUnit,invalidation){return(
(color, {
  title = null,
  fontSize = FONT_SIZE,
  css = "",
  scope = DOM.uid("note").id,
  titleColor = "inherit",
  titleBackground = "rgba(0, 0, 0, 0.05)",
} = {}) => {
  const style = document.head.appendChild(htl.html`<style>${`
    :scope {
      --background-color: ${color};
      --title-background: ${titleBackground};
      --title-color: ${titleColor};
      --font-size: ${ensureUnit(fontSize)};
      border: 1px solid rgba(0, 0, 0, 0.05);
      padding: 0.8rem;
      max-width: 640px;
      border-radius: 4px;
      font: var(--font-size)/1.5em var(--sans-serif);
      color: #444;
      box-sizing: border-box;
      background: var(--background-color);
      column-rule: 1px solid #ccc;
      gap: 1.6rem;
      overflow: hidden;
    }
    :scope[title]:before {
      content: attr(title);
      margin: -.8rem;
      margin-bottom: .8rem;
      padding: .4rem .8rem;
      color: var(--title-color);
      background: var(--title-background);
      font-weight: bold;
      display: block;
    }
    :scope > * {
      break-inside: avoid;
    }
    :scope code {
      font-size: inherit;
    }
    /* Handle nested Markdown */
    ${["p", "ul"].flatMap(d => [
      `:scope > ${d}:first-child`,
      `:scope > div > ${d}:first-child`
    ])} {
      margin-top: 0;
    }
    ${["p", "ul"].flatMap(d => [
      `:scope > ${d}:last-child`,
      `:scope > div > ${d}:last-child`
    ])} {
      margin-bottom: 0;
    }

    ${typeof css === "function" ? css(scope) : css}
  `.replace(/:scope\b/g, `.${scope}`)}`);
  invalidation.then(() => style.remove());
  return (...contents) => htl.html`<div ${{
    title,
    class: scope,
    style: `columns:${contents.length}`
  }}>${contents}</div>`;
}
)}

function _fileIcon(htl){return(
({size = "1em", style=`display:inline-block;height:${size}`} = {}) => htl.html`<svg ${{style}} viewBox="0 0 16 16" fill="none" stroke-width="2"><path d="M7.19855 2.52175L7.88131 1.79111L7.19855 2.52175ZM12.6 11.7764L13.2581 11.0234L12.6 11.7764ZM5.34191 6.76078L11.9419 12.5293L13.2581 11.0234L6.65809 5.2549L5.34191 6.76078ZM10.8958 13.6864L3.35462 6.63385L1.98852 8.09459L9.52965 15.1472L10.8958 13.6864ZM6.51578 3.25238L13.8172 10.0755L15.1828 8.61419L7.88131 1.79111L6.51578 3.25238ZM3.08395 3.55474C3.91017 2.45311 5.50967 2.31219 6.51578 3.25238L7.88131 1.79111C6.0058 0.0384695 3.02413 0.301162 1.48395 2.35474L3.08395 3.55474ZM3.35462 6.63385C2.49183 5.82695 2.37516 4.49978 3.08395 3.55474L1.48395 2.35474C0.162683 4.11642 0.380169 6.59044 1.98852 8.09459L3.35462 6.63385ZM11.993 13.6551C11.6977 13.9647 11.2082 13.9786 10.8958 13.6864L9.52965 15.1472C10.6432 16.1886 12.3878 16.1388 13.4402 15.0356L11.993 13.6551ZM11.9419 12.5293C12.2764 12.8216 12.2996 13.3337 11.993 13.6551L13.4402 15.0356C14.5328 13.8903 14.4499 12.0651 13.2581 11.0234L11.9419 12.5293Z" fill="currentColor"></path></svg>`
)}

function _FONT_SIZE(){return(
13
)}

function _ensureUnit(){return(
v => typeof v === "number" ? `${v}px` : v
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["note"], _2);
  main.variable(observer("exampleNote")).define("exampleNote", ["note","md","fileIcon"], _exampleNote);
  main.variable(observer("note")).define("note", ["box"], _note);
  main.variable(observer()).define(["try_it","htl"], _5);
  main.variable(observer("try_it")).define("try_it", ["box"], _try_it);
  main.variable(observer()).define(["details","htl"], _7);
  main.variable(observer("details")).define("details", ["box"], _details);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["details","md"], _11);
  main.variable(observer()).define(["details","md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["details_table","htl"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["details_table","htl"], _16);
  main.variable(observer("details_table")).define("details_table", ["box"], _details_table);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer("box")).define("box", ["FONT_SIZE","DOM","htl","ensureUnit","invalidation"], _box);
  main.variable(observer("fileIcon")).define("fileIcon", ["htl"], _fileIcon);
  main.variable(observer("FONT_SIZE")).define("FONT_SIZE", _FONT_SIZE);
  main.variable(observer("ensureUnit")).define("ensureUnit", _ensureUnit);
  return main;
}
