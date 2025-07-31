document.addEventListener('DOMContentLoaded', () => {
    const theButton = document.getElementById('theButton');
    const congratulationsMessage = document.getElementById('congratulationsMessage');
    const confettiContainer = document.querySelector('.confetti-container');
    const gameContainer = document.querySelector('.game-container'); // To get its dimensions

    let buttonWidth = 0;
    let buttonHeight = 0;
    let containerWidth = 0;
    let containerHeight = 0;

    // Function to get/update dimensions
    function updateDimensions() {
        // Get button dimensions only once, or if it changes significantly
        if (buttonWidth === 0 || buttonHeight === 0) {
            const buttonRect = theButton.getBoundingClientRect();
            buttonWidth = buttonRect.width;
            buttonHeight = buttonRect.height;
        }

        // Always get container dimensions as window resize can change them
        containerWidth = window.innerWidth;
        containerHeight = window.innerHeight;
    }

    // Initial dimension update
    updateDimensions();

    // Update dimensions on window resize
    window.addEventListener('resize', updateDimensions);

    // --- Button Movement Logic ---
    theButton.addEventListener('mouseover', () => {
        // Only move if the congratulatory message is not active
        if (!congratulationsMessage.classList.contains('active')) {
            moveButtonRandomly();
        }
    });

    theButton.addEventListener('click', () => {
        // Prevent multiple clicks activating the celebration
        if (!congratulationsMessage.classList.contains('active')) {
            showCongratulations();
        }
    });

    function moveButtonRandomly() {
        // Calculate new random position within the viewport
        // Ensure button stays fully within bounds
        const newX = Math.random() * (containerWidth - buttonWidth);
        const newY = Math.random() * (containerHeight - buttonHeight);

        // Apply new position
        // We use 'px' values as 'absolute' positioning needs them
        theButton.style.left = `${newX}px`;
        theButton.style.top = `${newY}px`;
        // Remove transform: translate(-50%, -50%) as we're directly setting top/left
        theButton.style.transform = 'none'; // Or set to empty string if no other transforms
    }


    // --- Congratulations Logic ---
    function showCongratulations() {
        theButton.style.display = 'none'; // Hide the button
        congratulationsMessage.classList.add('active'); // Show message
        generateConfetti();
        // Optionally, reset after a few seconds
        // setTimeout(() => {
        //     resetGame();
        // }, 5000);
    }

    // --- Confetti Generation ---
    function generateConfetti() {
        const colors = ['#ff6b6b', '#ffe66d', '#4ecdc4', '#fed766', '#a9d6e5']; // Confetti colors
        const numConfetti = 100; // Number of particles

        for (let i = 0; i < numConfetti; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Random color
            confetti.style.left = `${Math.random() * 100}%`; // Random horizontal start position
            confetti.style.animationDelay = `${Math.random() * 2}s`; // Stagger animation start
            confetti.style.animationDuration = `${3 + Math.random() * 2}s`; // Vary fall speed
            confetti.style.width = `${5 + Math.random() * 10}px`; // Vary size
            confetti.style.height = confetti.style.width; // Keep square
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`; // Random initial rotation

            confettiContainer.appendChild(confetti);

            // Remove confetti after animation to prevent DOM clutter
            confetti.addEventListener('animationend', () => {
                confetti.remove();
            });
        }
    }

    // --- Optional: Reset Game Function ---
    // function resetGame() {
    //     congratulationsMessage.classList.remove('active');
    //     confettiContainer.innerHTML = ''; // Clear existing confetti
    //     theButton.style.display = 'block'; // Show the button again
    //     // Reset button to center or a random initial position
    //     theButton.style.left = '50%';
    //     theButton.style.top = '50%';
    //     theButton.style.transform = 'translate(-50%, -50%)';
    // }

    // Initial random position for the button on load (optional, but good)
    setTimeout(() => {
        updateDimensions(); // Ensure dimensions are fresh after initial render
        moveButtonRandomly();
    }, 100); // Small delay to ensure all CSS is rendered and dimensions are accurate
});