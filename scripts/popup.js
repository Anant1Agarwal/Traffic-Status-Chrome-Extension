
document.getElementById('button1').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const tabId = activeTab.id.toString();
    chrome.storage.local.get(tabId, function(result) {
      const statusCode = result[tabId];
      
      var statusCode2= ''+statusCode;
      console.log(statusCode);
      console.log( statusCode2[0]);

      if(statusCode2[0]==1){
        document.getElementById('status_container').style.background='#ebdd5e)';
        var image = document.getElementById('status_image');
                image.src='/assets/Information1xx.svg';
                image.alt='New Image';
    }
     else if(statusCode2[0]==2){
        document.getElementById('status_container').style.background='hsl(96, 81%, 65%)';
        var image = document.getElementById('status_image');
                image.src='/assets/Success2xx.svg';
                image.alt='New Image';
    }
    else if(statusCode2[0]==3){
        document.getElementById('status_container').style.background='#60d2ee';
        var image = document.getElementById('status_image');
                image.src='/assets/redirection3xx.svg';
                image.alt='New Image';
    }
    else if(statusCode2[0]==4){
        document.getElementById('status_container').style.background='hsl(0, 79%, 61%)';
        var image = document.getElementById('status_image');
                image.src='/assets/ClientError4xx.svg';
                image.alt='New Image';
    }
    else if(statusCode2[0]==5){
        document.getElementById('status_container').style.background='#ffaa64';
        var image = document.getElementById('status_image');
                image.src='/assets/ServerError5xx.svg';
                image.alt='New Image';
    }
      else{
        document.getElementById('status_container').style.background='#ff64a2';
       
    
    }
      document.getElementById('statusCode').textContent = statusCode
        ? `HTTP Status Code: ${statusCode}`
        : 'No status code found for this tab.';

        
    });
  });

 }

);

document.getElementById('opennew').addEventListener('click', function() {
  chrome.windows.create({ url: chrome.runtime.getURL('/html/allRedirects.html'), type: 'popup' });
  
});

