export const lessonsMap = {
  // HTML ADVENTURES
  'html-l1': {
    id: 'html-l1',
    course_id: 'html-adventures',
    title: 'What is HTML?',
    objectives: ['Understand what HTML stands for', 'Learn how HTML gives structure to a page'],
    content: "HTML stands for HyperText Markup Language. It's like the skeleton of a webpage! Every webpage you visit is built with HTML tags.",
    example_code: '<h1>Hello World!</h1>',
    challenge_desc: 'Create your own heading that says your name!',
    challenge_html: '<!-- Type your heading tag below! -->\n'
  },
  'html-l2': {
    id: 'html-l2',
    course_id: 'html-adventures',
    title: 'Headings and Paragraphs',
    objectives: ['Learn h1 to h6 tags', 'Learn the p tag'],
    content: "Headings use tags from h1 (biggest) to h6 (smallest). Paragraphs use the p tag. They help separate text so it's easy to read.",
    example_code: '<h1>My Favorite Animal</h1><p>I love dogs because they are friendly.</p>',
    challenge_desc: 'Write a heading and a short paragraph about your favorite food.',
    challenge_html: '<!-- Write your HTML here! -->\n'
  },
  'html-l3': {
    id: 'html-l3',
    course_id: 'html-adventures',
    title: 'Links and Buttons',
    objectives: ['Learn how to use the anchor (a) tag', 'Learn how to use the button tag'],
    content: "Links let you travel to other pages using the 'a' tag. Buttons let you click things using the 'button' tag!",
    example_code: '<a href="https://google.com">Go to Google</a>\n<button>Click Me!</button>',
    challenge_desc: 'Create a button that says "Start Game"!',
    challenge_html: '<!-- Create your button below! -->\n'
  },
  'html-l4': {
    id: 'html-l4',
    course_id: 'html-adventures',
    title: 'Images and Pictures',
    objectives: ['Learn the img tag', 'Learn the src attribute'],
    content: "You can add pictures using the 'img' tag. The 'src' attribute tells the browser where the picture is. The img tag doesn't need a closing tag!",
    example_code: '<img src="https://placekitten.com/200/200" alt="A cute kitten">',
    challenge_desc: 'Add an image tag for a cute dog. Use the provided link!',
    challenge_html: '<!-- Puppy URL: https://placedog.net/200/200 -->\n'
  },
  'html-l5': {
    id: 'html-l5',
    course_id: 'html-adventures',
    title: 'Making Lists',
    objectives: ['Learn ul (unordered) and ol (ordered) lists', 'Learn li (list item) tags'],
    content: "If you want to list out items like a grocery list, you use 'ul' for bullets or 'ol' for numbers, and 'li' for the items inside.",
    example_code: '<ul>\n  <li>Apples</li>\n  <li>Bananas</li>\n</ul>',
    challenge_desc: 'Make an unordered list of your top 3 favorite animals.',
    challenge_html: '<!-- Top 3 Animals List: -->\n'
  },

  // CSS MAGIC
  'css-l1': {
    id: 'css-l1',
    course_id: 'css-magic',
    title: 'What is CSS?',
    objectives: ['Understand what CSS does', 'Learn how to change text color'],
    content: "CSS stands for Cascading Style Sheets. If HTML is the skeleton, CSS is the clothes! We use it to make things look beautiful. We use 'color' to change the text color.",
    example_code: 'h1 {\n  color: red;\n}',
    challenge_desc: 'Change the color of the heading from black to blue using CSS.',
    challenge_html: '<h1>Make me blue!</h1>\n',
    challenge_css: 'h1 {\n  color: black;\n}'
  },
  'css-l2': {
    id: 'css-l2',
    course_id: 'css-magic',
    title: 'Colors and Backgrounds',
    objectives: ['Change background color', 'Mix text and background colors safely'],
    content: "You can change the background color of an element or the entire page using 'background-color'. Just make sure your text is still easy to read!",
    example_code: 'body {\n  background-color: yellow;\n}',
    challenge_desc: 'Make the background of the paragraph lightblue, and its text darkblue.',
    challenge_html: '<p>I am a very colorful paragraph!</p>',
    challenge_css: 'p {\n  \n}'
  },
  'css-l3': {
    id: 'css-l3',
    course_id: 'css-magic',
    title: 'Sizing and Spacing',
    objectives: ['Learn width and height', 'Learn padding (inside spacing)'],
    content: "You can make elements bigger using 'width' and 'height'. You can also push the insides of a box away from its edges using 'padding'.",
    example_code: 'div {\n  width: 100px;\n  height: 100px;\n  padding: 20px;\n  background-color: pink;\n}',
    challenge_desc: 'Give the div a width of 200px, a height of 50px, and a green background.',
    challenge_html: '<div>Size me up!</div>',
    challenge_css: 'div {\n  \n}'
  },
  'css-l4': {
    id: 'css-l4',
    course_id: 'css-magic',
    title: 'Borders and Shapes',
    objectives: ['Add lines around elements', 'Make corners round'],
    content: "Borders draw a line around your element. 'border-radius' curves the corners. If you curve them enough, a square becomes a perfect circle!",
    example_code: 'img {\n  border: 5px solid purple;\n  border-radius: 50%;\n}',
    challenge_desc: 'Give the picture a red border and make it perfectly round by setting border-radius to 50%.',
    challenge_html: '<img src="https://placekitten.com/150/150" alt="Kitten">',
    challenge_css: 'img {\n  \n}'
  },

  // JS SPARKS
  'js-l1': {
    id: 'js-l1',
    course_id: 'javascript-sparks',
    title: 'Variables and Text',
    objectives: ['Learn how to store text in variables', 'Show variables in alerts'],
    content: "Variables are like small boxes where you can store information, like your name or your score. We create them using the 'let' keyword.",
    example_code: 'let myName = "Sprout";\nalert(myName);',
    challenge_desc: 'Create a variable called myFavoriteGame and alert it!',
    challenge_html: '<h1>JavaScript Practice</h1>',
    challenge_js: 'let myFavoriteGame = "Minecraft";\n// Try wrapping it in alert()!\nalert(myFavoriteGame);'
  },
  'js-l2': {
    id: 'js-l2',
    course_id: 'javascript-sparks',
    title: 'Math and Numbers',
    objectives: ['Use JS as a calculator', 'Add and multiply numbers'],
    content: "JavaScript is amazing at math! You can add (+), subtract (-), multiply (*), and divide (/). Variables can store numbers too.",
    example_code: 'let score = 10;\nlet bonus = 5;\nalert(score + bonus);',
    challenge_desc: 'Create a variable called total that multiplies 5 by 10, then alert total.',
    challenge_html: '<h1>Math time!</h1>',
    challenge_js: 'let total = 5 * 10;\n\n'
  },
  'js-l3': {
    id: 'js-l3',
    course_id: 'javascript-sparks',
    title: 'Making Decisions',
    objectives: ['Learn if statements', 'Check for equality'],
    content: "Sometimes you only want code to run IF something is true. We use 'if' statements to give JavaScript a brain!",
    example_code: 'let playerReady = true;\nif (playerReady === true) {\n  alert("Let\'s play!");\n}',
    challenge_desc: 'Write an if statement that checks if secretCode equals 123. If it does, alert("Unlocked!")',
    challenge_html: '<h1>Secret Vault</h1>',
    challenge_js: 'let secretCode = 123;\n// write your if statement here\n'
  },
  'js-l4': {
    id: 'js-l4',
    course_id: 'javascript-sparks',
    title: 'Functions',
    objectives: ['Learn what a function is', 'Call a function'],
    content: "Functions are reusable blocks of code. You can teach JS a new trick, name it, and then call its name whenever you want it to do the trick again!",
    example_code: 'function sayHi() {\n  alert("Hi there!");\n}\n\nsayHi(); // this runs it!',
    challenge_desc: 'Call the function cheer() so that it runs when the code starts.',
    challenge_html: '<h1>Functions!</h1>',
    challenge_js: 'function cheer() {\n  alert("Hooray!");\n}\n\n// type cheer(); below to run the function!\n'
  },
  'js-l5': {
    id: 'js-l5',
    course_id: 'javascript-sparks',
    title: 'Buttons and Events',
    objectives: ['Connect HTML buttons to JS', 'Learn onClick'],
    content: "The coolest part of JS is connecting it to HTML. Using the 'onclick' attribute on a button, you can make it run a JS function when a user clicks it!",
    example_code: 'function popUp() {\n  alert("You clicked me!");\n}',
    challenge_html: '<!-- Add onclick="sayMagicWord()" to the button! -->\n<button>Cast Spell</button>',
    challenge_js: 'function sayMagicWord() {\n  alert("Abracadabra!");\n}',
    challenge_desc: 'Add the onclick attribute to the HTML button so it runs sayMagicWord() when clicked.'
  }
};
