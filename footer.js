document.addEventListener("DOMContentLoaded", function () {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (!footerPlaceholder) return;
    
    // Simple Footer Content
    const footer = `
        <footer class="bg-gray-900 text-white py-10 mt-auto">
            <div class="container mx-auto px-4 text-center">
                <div class="flex justify-center space-x-6 mb-6 text-2xl">
                    <a href="https://www.facebook.com" target="_blank" class="hover:text-indigo-400 transition"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.twitter.com" target="_blank" class="hover:text-indigo-400 transition"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.instagram.com" target="_blank" class="hover:text-indigo-400 transition"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.linkedin.com" target="_blank" class="hover:text-indigo-400 transition"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <nav class="space-x-4 mb-4">
                    <a href="about.html" class="hover:text-indigo-400 transition">About Us</a>
                    <a href="contact.html" class="hover:text-indigo-400 transition">Contact</a>
                    <a href="#" class="hover:text-indigo-400 transition">Privacy Policy</a>
                    <a href="#" class="hover:text-indigo-400 transition">Terms of Use</a>
                </nav>
                <p class="text-sm text-gray-400 mt-6">
                    &copy; 2025 E-commerce by Elxan Mardiyev. All Rights Reserved.
                </p>
            </div>
        </footer>
    `;

    footerPlaceholder.innerHTML = footer;
});