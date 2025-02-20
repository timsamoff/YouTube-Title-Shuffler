// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Random quotes to use for missing titles
const randomQuotes = [
    "The journey of a thousand miles begins with one step...",
    "Life is what happens when you’re busy making other plans",
    "Do what you can, with what you have, where you are",
    "You miss 100% of the shots you don’t take",
    "Not all those who wander are lost",
    "Everything you can imagine is real",
    "Turn your wounds into wisdom",
    "Happiness depends upon ourselves",
    "Imagination is more important than knowledge",
    "Do. or do not. There is no try.",
    "The way to get started is to quit talking and begin doing",
    "To infinity and beyond!",
    "Common sense is like deodorant. The people who need it most never use it.",
    "Gravitation is not responsible for people falling in love",
    "Have you ever wondered why you can't taste your tongue?"
];

// Function to shuffle all video & Shorts titles
function shuffleYouTubeTitles() {
    console.log("Running YouTube Title Shuffler...");

    // Collect all video elements, including Shorts
    let videoElements = Array.from(document.querySelectorAll('ytd-rich-item-renderer, ytd-video-renderer'));

    if (videoElements.length === 0) {
        console.log("No videos found.");
        return;
    }

    // Extract video and Shorts titles
    let titles = videoElements.map(video => {
        // Regular video titles
        let titleElem = video.querySelector('#video-title');
        if (titleElem) {
            let title = titleElem.textContent.trim();
            return title.length > 0 ? title : randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
        }

        // Shorts titles
        let shortsTitleElem = video.querySelector('span.yt-core-attributed-string');
        if (shortsTitleElem) {
            let title = shortsTitleElem.textContent.trim();
            return title.length > 0 ? title : randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
        }

        // Fallback in case no title is found
        return randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
    });

    // Shuffle the titles
    shuffleArray(titles);

    // Apply shuffled titles back to the DOM
    videoElements.forEach((video, index) => {
        let titleElem = video.querySelector('#video-title');
        if (titleElem) {
            titleElem.textContent = titles[index];
        }

        let shortsTitleElem = video.querySelector('span.yt-core-attributed-string');
        if (shortsTitleElem) {
            shortsTitleElem.textContent = titles[index];
        }
    });

    console.log("Title shuffling complete.");
}

// Observe dynamic content changes
function observeYouTubeChanges() {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && (node.matches('ytd-rich-item-renderer') || node.matches('ytd-video-renderer'))) {
                    shuffleYouTubeTitles(); // Re-shuffle when new videos are added
                }
            });
        });
    });

    // Observe changes in the video list
    const targetNode = document.querySelector('ytd-rich-grid-renderer, ytd-section-list-renderer');
    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
        console.log("Observer initialized to watch for new videos and Shorts.");
    } else {
        console.log("Could not find target container to observe.");
    }
}

// Shuffle after a short delay
setTimeout(() => {
    shuffleYouTubeTitles();
    observeYouTubeChanges(); // Observe for dynamically-loaded content
}, 3000);