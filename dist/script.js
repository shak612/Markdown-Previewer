const placeholderInput = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

const markdownRenderer = new marked.Renderer();
markdownRenderer.link = function (href, title, text) {
  return `<a target='_blank' href="${href}">${text}</a>`;
};

class InputArea extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("textarea", {
        className: "editor",
        id: "editor",
        value: this.props.input,
        onChange: this.props.onChange }));


  }}


class MarkdownArea extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: "previewer",
        id: "preview",
        dangerouslySetInnerHTML: this.props.input }));


  }}


class Previewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: placeholderInput };


    this.handleChange = this.handleChange.bind(this);
    this.generateMarkdown = this.generateMarkdown.bind(this);
  }

  componentWillMount() {
    // document.body.style.backgroundImage =
    //   "url('https://images.unsplash.com/photo-1628543183750-09c71606f032?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80')";
    document.body.style.backgroundColor = "#87b5b5";
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = null;
    document.body.style.backgroundImage = null;
  }

  handleChange(event) {
    this.setState({
      input: event.target.value });

  }

  generateMarkdown(text) {
    return {
      __html: marked(this.state.input, {
        renderer: markdownRenderer,
        gfm: true,
        tables: true,
        breaks: true,
        smartLists: false }) };


  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { className: "header" }, /*#__PURE__*/
      React.createElement("h1", null, "Markdown Previewer")), /*#__PURE__*/

      React.createElement("div", { className: "container" }, /*#__PURE__*/
      React.createElement(InputArea, { input: this.state.input, onChange: this.handleChange }), /*#__PURE__*/
      React.createElement("div", { className: "divider" }), /*#__PURE__*/
      React.createElement(MarkdownArea, { input: this.generateMarkdown() }))));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Previewer, null), document.getElementById("root"));