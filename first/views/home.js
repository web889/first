const logout = async () => {
    try {
      const response = await fetch('/logout', { method: 'POST' });
      if (response.ok) {
        window.location.href = '/'; // Redirect to home page after successful logout
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/api/data')
        .then((res) => res.json())
        .then((data) => {
            const dataContainer = document.getElementById('data-container');

            if (dataContainer) {
                data.map(item => {
                    // Create a new div for each user
                    const userDiv = document.createElement('div');
                    userDiv.className = 'user-details';

                    // Create elements for user details
                    const username = document.createElement('h1');
                    username.textContent = `Username: ${item.name}`;
                    userDiv.appendChild(username);

                    const email = document.createElement('p');
                    email.textContent = `Email: ${item.email}`;
                    userDiv.appendChild(email);

                    // Append the user div to the data container
                    dataContainer.appendChild(userDiv);
                });
            }
        })
        .catch((err) => {
            console.error('Error:', err);
        });
});
const name = "dev.png";
const imgElement = document.getElementById('dynamic-image');
imgElement.src = name;

