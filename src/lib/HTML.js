const fs = require('fs');
const path = require('path');

class HTML {
    #path = null;
    #results = [];

    constructor() {
    }

    getResults() {
        return this.results;
    }

    setResults(value) {
        this.results = value;
    }

    getPath() {
        return this.path;
    }

    setPath(value) {
        this.path = value;
    }

    getCss() {
        return `
            <style>
                body{
                    background-color: #616368;
                    color: #bdc1c6;
                }
                td{
                    padding:8px 8px 8px 0;
                }
                th {
                        text-align:left
                }
            </style>
        `;
    }

    getHTML() {
        let htmlRow = "";
        this.results.map((e) => {
            const copyData = this.getPath() + e;
            htmlRow += `<tr><td>${e}</td><td>${copyData}</td> <td><button type="button" onclick="copy()" id="${copyData}" data-arg1=${copyData}>Copy</button></td></tr>`
        });
        return `
        <html>
            <head>
                ${this.getCss()}
            </head>
            <body>
            <table>
                <th>File</th>
                <th>File Path</th>
                ${htmlRow}
            </table>
            <script>
                function copy(){
                    let data =  event.target.getAttribute('data-arg1');
                    let arg1 = 'open ' + data;g
                    document.getElementById(data).innerHTML = 'Copied';
                    setTimeout(()=>document.getElementById(data).innerHTML = 'Copy',2000)
                    const textArea = document.createElement("textarea");
                    document.body.appendChild(textArea);
                    textArea.setAttribute("id", "textArea_id");
                    document.getElementById("textArea_id").value=arg1;
                    textArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textArea);
                }
            </script>
            </body>
        </html>
        `;
    }

    createHTMLFile(htmlpage, outputPath) {
        const buildFileExists = fs.existsSync(outputPath);
        if (!buildFileExists) {
            console.log('Output path doesn"t exist. Please check your path again and include "/" at the end of your output path')
        }
        fs.writeFileSync(`${outputPath}find-dir.html`, htmlpage)
    }
}

module.exports = HTML;