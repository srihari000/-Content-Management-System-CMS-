module.exports = function (app) {
    app.registerContentBlock("custom_form", () => {
        return `
            <div class="custom-form">
                <h3>Subscribe to Our Newsletter</h3>
                <form id="customForm" onsubmit="handleFormSubmit(event)">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                    <button type="submit">Submit</button>
                </form>
                <div id="formMessage" style="margin-top: 10px; color: green;"></div>
            </div>
            <style>
                .custom-form {
                    max-width: 300px;
                    margin: auto;
                    padding: 10px;
                    border: 1px solid #ccc;
                }
                .custom-form label {
                    display: block;
                    margin-top: 10px;
                }
                .custom-form input, .custom-form button {
                    width: 100%;
                    padding: 8px;
                    margin-top: 5px;
                }
            </style>
            <script>
                // Handle form submission
                function handleFormSubmit(event) {
                    event.preventDefault();
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;

                    if (name && email) {
                        document.getElementById('formMessage').innerText = 'Thank you for subscribing, ' + name + '!';
                        document.getElementById('customForm').reset();
                    } else {
                        document.getElementById('formMessage').innerText = 'Please fill out all fields.';
                        document.getElementById('formMessage').style.color = 'red';
                    }
                }
            </script>
        `;
    });

    app.registerContentBlock("image_slider", (data) => {
        const images = data.images || [];

        // Generate HTML for an image slider with left and right buttons
        return `
        <style>
            .image-slider {
                position: relative;
                width: 100%;
                max-width: 600px; /* Adjust as needed */
                margin: auto;
                overflow: hidden;
            }

            .slider-container {
                display: flex;
                transition: transform 0.5s ease-in-out;
            }

            .slider-image {
                width: 100%;
                display: none;
            }

            .slider-image.active {
                display: block;
            }

            .slider-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.5);
                color: white;
                font-size: 24px;
                border: none;
                padding: 10px;
                cursor: pointer;
                z-index: 10;
            }

            .left-btn {
                left: 10px;
            }

            .right-btn {
                right: 10px;
            }
        </style>

        <div class="image-slider">
            <button class="slider-btn left-btn">&#10094;</button>
            <div class="slider-container">
                ${images.map((src, index) => `
                    <img src="${src}" class="slider-image ${index === 0 ? 'active' : ''}" />
                `).join('')}
            </div>
            <button class="slider-btn right-btn">&#10095;</button>
        </div>

        <script>
            document.addEventListener("DOMContentLoaded", () => {
                const sliders = document.querySelectorAll(".image-slider");

                sliders.forEach((slider) => {
                    const leftBtn = slider.querySelector(".left-btn");
                    const rightBtn = slider.querySelector(".right-btn");
                    const images = slider.querySelectorAll(".slider-image");

                    let currentIndex = 0;

                    // Update slider display based on the current index
                    function updateSlider() {
                        images.forEach((image, index) => {
                            image.classList.toggle("active", index === currentIndex);
                        });
                    }

                    // Handle left button click (previous image)
                    leftBtn.addEventListener("click", () => {
                        currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
                        updateSlider();
                    });

                    // Handle right button click (next image)
                    rightBtn.addEventListener("click", () => {
                        currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
                        updateSlider();
                    });

                    // Initial display setup
                    updateSlider();
                });
            });
        </script>
    `;
    });

};