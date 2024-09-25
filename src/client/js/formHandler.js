async function handleSubmit(event) {
    event.preventDefault();
    
    const text = document.getElementById('text').value;
    if (!text) {
        alert("Text input cannot be empty!");
        return;
    }

    const response = await fetch('/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
    });

    try {
        const data = await response.json();
        document.getElementById('polarity').innerHTML = `Polarity: ${data.score_tag}`;
        document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
        document.getElementById('textSnippet').innerHTML = `Text Snippet: ${text}`;
    } catch (error) {
        console.log('Error:', error);
    }
}

export { handleSubmit };
