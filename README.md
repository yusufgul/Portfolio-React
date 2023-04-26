<a name="readme-top"></a>
# Portfolio

Welcome to my personal portfolio project that I created for myself. I wanted to reflect my love towards the sky to this project, and I intend to continue developing it in the future.</br></br>This project was made with React.js and Tailwind.
```diff
I recommend using Chrome or another Chromium-based browser. The background of this 
project is somewhat heavy to render, and Firefox doesn't seem to be doing great with it. 
```

## Demo Link
https://portfolio-9defb.web.app/

## Features
- Starry sky for the background created using canvas.
- Background moves slowly. 
- Displayed projects are not hard-coded. They are getting fetched from Firebase - Firestore Database. So, they can be updated easily.
- For handling contact form, [Getform.io](https://getform.io/) is used. Getform.io is a powerful form backend for HTML web forms.
- Responsive design for screens of any size.
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation

    Clone the repository: git clone https://github.com/yusufgul/Portfolio-React.git
    Add your firebase info to the FirebaseConfig.js file inside the /src/components/firebase folder
    Install the dependencies: npm install
    Run the development server: npm start
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Firestore Collection Structure Example
    
    collection-name | document-id | data-fields
    -------------------------------------------
       projects
       |
       |_____________ Ha23agf5s...
                           |
                           |________ color1: "#F40076"
                           |
                           |________ color2: "#342711"
                           |
                           |________ demoLink: "https://-----------------.web.app/"
                           |
                           |________ id: 5
                           |
                           |________ name: "project-name"
                           |
                           |________ projectLink: "https://github.com/----/-------"

### Contributing

If you would like to contribute to the project, please fork the repository and make a pull request.</br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### License

This project is licensed under the MIT License.</br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Contact

If you have any questions or suggestions, please feel free to contact me.
<p align="right">(<a href="#readme-top">back to top</a>)</p>
