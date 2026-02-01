// Flashcard data organized by topic
const flashcardData = {
    "Greetings & Introductions": [
        { english: "Hello", spanish: "Hola" },
        { english: "How are you?", spanish: "¿Cómo estás?" },
        { english: "My name is...", spanish: "Me llamo…" },
        { english: "Nice to meet you", spanish: "Mucho gusto" },
        { english: "Goodbye", spanish: "Adiós" }
    ],
    "Food & Eating": [
        { english: "I'm hungry", spanish: "Tengo hambre" },
        { english: "How much does it cost?", spanish: "¿Cuánto cuesta?" },
        { english: "A table for two", spanish: "Una mesa para dos" },
        { english: "I would like...", spanish: "Quisiera…" },
        { english: "The check, please", spanish: "La cuenta, por favor" }
    ],
    "Travel & Directions": [
        { english: "Where is the bathroom?", spanish: "¿Dónde está el baño?" },
        { english: "To the right", spanish: "A la derecha" },
        { english: "I'm lost", spanish: "Estoy perdido/a" },
        { english: "Do you speak English?", spanish: "¿Habla inglés?" },
        { english: "How do I get to...?", spanish: "¿Cómo llego a...?" }
    ]
};

// Global variables
let currentTopic = "";
let currentCardIndex = 0;
let currentCards = [];
let isFlipped = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    const topicSelect = document.getElementById('topicSelect');
    const flashcardContainer = document.getElementById('flashcardContainer');
    const navigation = document.getElementById('navigation');
    
    // Hide flashcard container initially
    flashcardContainer.style.display = 'none';
    navigation.style.display = 'none';
    
    // Add event listener for topic selection
    topicSelect.addEventListener('change', function() {
        const selectedTopic = this.value;
        if (selectedTopic && flashcardData[selectedTopic]) {
            startLesson(selectedTopic);
        }
    });
});

// Start a new lesson
function startLesson(topic) {
    currentTopic = topic;
    currentCards = flashcardData[topic];
    currentCardIndex = 0;
    isFlipped = false;
    
    // Update lesson title
    document.getElementById('lessonTitle').textContent = `${topic}`;
    
    // Show flashcard container
    document.getElementById('flashcardContainer').style.display = 'flex';
    document.getElementById('navigation').style.display = 'flex';
    
    // Update progress
    updateProgress();
    
    // Load first card
    loadCard();
}

// Load current card
function loadCard() {
    if (currentCards.length === 0) return;
    
    const card = currentCards[currentCardIndex];
    document.getElementById('frontContent').textContent = card.english;
    document.getElementById('backContent').textContent = card.spanish;
    
    // Reset flip state
    isFlipped = false;
    document.getElementById('flashcard').classList.remove('flipped');
    
    // Update progress
    updateProgress();
}

// Flip the card
function flipCard() {
    const flashcard = document.getElementById('flashcard');
    isFlipped = !isFlipped;
    flashcard.classList.toggle('flipped', isFlipped);
}

// Go to next card
function nextCard() {
    if (currentCardIndex < currentCards.length - 1) {
        currentCardIndex++;
        loadCard();
    } else {
        // Lesson completed
        alert('Congratulations! You have completed this lesson!');
        // Reset to topic selection
        document.getElementById('topicSelect').value = '';
        document.getElementById('flashcardContainer').style.display = 'none';
        document.getElementById('navigation').style.display = 'none';
                updateProgress();
    }
}

// Go to previous card
function previousCard() {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        loadCard();
    }
}

// Update progress bar
function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    if (currentCards.length > 0) {
        const progress = ((currentCardIndex + 1) / currentCards.length) * 100;
        progressFill.style.width = progress + '%';
    } else {
        progressFill.style.width = '25%';
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (document.getElementById('flashcardContainer').style.display === 'none') return;
    
    switch(event.key) {
        case 'ArrowLeft':
            previousCard();
            break;
        case 'ArrowRight':
        case ' ':
            event.preventDefault();
            if (isFlipped) {
                nextCard();
            } else {
                flipCard();
            }
            break;
        case 'Enter':
            event.preventDefault();
            flipCard();
            break;
    }
});
