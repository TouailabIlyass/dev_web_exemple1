document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getDataBtn').addEventListener('click', getData);
    // Handle form submission
    document.getElementById('myForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission
      
      // Get the form data
      var formData = new FormData(this);
      
      // Make the fetch request
      fetch('api1.php', {
        method: 'POST',
        body: formData
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Display the response
        var resultDiv = document.getElementById('result');
        let tbody = resultDiv.querySelector('table tbody');
        tbody.innerHTML = tbody.innerHTML + `<tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <td>${data.data.name}</td>
          <td>${data.data.mob}</td>
          <td>${data.data.email}</td>
          <td><button type="button" onclick="deleteData(event, '${data.data.email}')" id="deleteBtn" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
        </tr>`;
      })
      .catch(function(error) {
        // Handle the error
        console.log(error);
      });
    });
  });

  function getData(){

        fetch('api1.php')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed.');
      }
    })
    .then(data => {
      var resultDiv = document.getElementById('result');
        console.log(data);
        var tbody = resultDiv.querySelector('table tbody');
        tbody.innerHTML = '';
        for(let i=0;i<data.length;i++)
        {
          tbody.innerHTML = tbody.innerHTML + `<tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <td>${data[i].name}</td>
            <td>${data[i].mob}</td>
            <td>${data[i].email}</td>
            <td><button type="button" onclick="deleteData(event, '${data[i].email}')" id="deleteBtn" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
            </td>
          </tr>`;
        }
    })
    .catch(error => {
      // Handle the error
      console.log(error);
    });
    
  }

  function deleteData(event,email){
    // Make the fetch request
    fetch('api1.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'email':email})
    }).then(response => {
      if (response.ok) {
        if (response.status === 204) {
          return {}; // Return an empty object if the response has no content
        } else {
          return response.json();
        }
      } else {
        throw new Error('Request failed.');
      }
    })
    .then(responseData => {
      // Process the response data
      console.log(responseData);
    })
    .catch(error => {
      // Handle the error
      console.log(error);
    });
    
  }