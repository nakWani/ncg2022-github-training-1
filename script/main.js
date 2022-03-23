// Insert All Sentence Main Element is named main_sentence in main.html 
function main(){
    
    var element = document.getElementById("example-markdown-content");
    element.innerHTML += MarkdownToHtml.parse(Intro_1_Text);
    element.innerHTML += MarkdownToHtml.parse(Intro_2_Text);
    element.innerHTML += MarkdownToHtml.parse(Intro_3_Text);
    element.innerHTML += MarkdownToHtml.parse(Intro_4_Text);
}
