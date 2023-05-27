document.addEventListener('DOMContentLoaded', function() {
      // Handle click event for the button
      document.getElementById('getDataBtn').addEventListener('click', getData);
      //POST
      document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Get the form data
        var formData = new FormData(this);
        
        // Create an XMLHttpRequest object
        var xhr = new XMLHttpRequest();
        
        // Set up the request
        xhr.open('POST', 'api1.php', true);
        
        // Set the response type to JSON
        xhr.responseType = 'json';
        
        // Set up the onload event handler
        xhr.onload = function() {
          if (xhr.status === 200) {
            // Display the response
            var resultDiv = document.getElementById('result');
            if(xhr.response.status ==='success')
            {
              let tbody = resultDiv.querySelector('table tbody');
              tbody.innerHTML = tbody.innerHTML + `<tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <td>${xhr.response.data.name}</td>
                <td>${xhr.response.data.mob}</td>
                <td>${xhr.response.data.email}</td>
                <td><button type="button" onclick="deleteData(event, '${xhr.response.data.email}')" id="deleteBtn" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
                </td>
              </tr>`;
            }
          } else {
            // Handle the error
            console.log('Request failed. Status: ' + xhr.status);
          }
        };
        
        // Send the request
        xhr.send(formData);
      });
    });

    function getData(){
      // Create an XMLHttpRequest object
      var xhr = new XMLHttpRequest();
        
      // Set up the request
      xhr.open('GET', 'api1.php', true);
      
      // Set the response type to JSON
      xhr.responseType = 'json';

      xhr.onreadystatechange  = function() {
        if(xhr.readyState === 4){
        if (xhr.status === 200) {
          // Display the response
          var resultDiv = document.getElementById('result');
          console.log(xhr.response);
          var tbody = resultDiv.querySelector('table tbody');
          for(let i=0;i<xhr.response.length;i++)
          {
            tbody.innerHTML = tbody.innerHTML + `<tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <td>${xhr.response[i].name}</td>
              <td>${xhr.response[i].mob}</td>
              <td>${xhr.response[i].email}</td>
              <td><button type="button" onclick="deleteData(event, '${xhr.response[i].email}')" id="deleteBtn" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
              </td>
            </tr>`;
          }
        } 
        else {
          // Handle the error
          console.log('Request failed. Status: ' + xhr.status);
        }
      }
        
      };
      xhr.send();
    }

    function deleteData(event,email){
      console.log('delete',email);
      var xhr = new XMLHttpRequest();
        
      // Set up the request
      xhr.open('DELETE', 'api1.php', true);
      
      // Set the response type to JSON
      xhr.responseType = 'json';
      //
      xhr.onload = function() {
        if (xhr.status === 200) {
          // Display the response
          console.log(xhr.response);
        }
      };
      
      // Send the request
      xhr.send(JSON.stringify({'email':email}));
      //
    }