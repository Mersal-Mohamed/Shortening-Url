document.getElementById('icon').addEventListener('click',function() {
document.getElementById('links').style.display = document.getElementById('links').style.display === 'none' ? 'block' : 'none';
})

window.onload = function(){

window.localStorage.getItem('links')
}

       //check if the value is empty 
      let emptyLink =  document.getElementById('shortenAnchor')

      emptyLink.addEventListener('click',function(){
         if( document.getElementById('shorten').value.length == 0){
            console.log(document.getElementById('shorten').value)
            let warning = document.createElement('span')
            let warningText = document.createTextNode('Please add a link')
            let shortenParent = document.getElementById('shortenDiv')
            warning.appendChild(warningText)
            warning.setAttribute('class','warning-span')
            warning.setAttribute('id','warning-span')
            shortenParent.appendChild(warning)
            //input field style
            document.getElementById('shorten').setAttribute('class','warning-input')
            document.getElementById('shortenAnchor').style.marginTop = '1em'
                  }else {
                         //remove empty styles
      document.getElementById('shortenDiv').removeChild(document.getElementById('warning-span'))
      document.getElementById('shorten').removeAttribute('class','warning-input')
      document.getElementById('shortenAnchor').style.marginTop = ''
                  }
                  
  
      })




function showLink(){
   let shortUrl;
   const relUrl = ' https://rel.ink/api/links/';
   const options = {
      method: 'POST',
      headers:{
         'Accept': 'application/json',
         'content-Type': 'application/json;charset = utf-8'
      },
      body: JSON.stringify({
       url: document.getElementById('shorten').value
      })
   };
   let hash;
   fetch(relUrl,options)
   .then(response => response.json())
   .then(data => { 
      console.log(data)
      hash = data.hashid.toString()
      shortUrl= 'https://rel.ink/' + hash;



      // global declarations
      let parentNode =  document.createElement('div')
      let childNode =  document.createElement('div')
      let pargraph = document.createElement('p')
      let linkNode = document.createElement('div')

      // link
      let text = document.createTextNode(shortUrl);
      let link = document.createElement('a');
      link.appendChild(text)
      link.setAttribute('href',shortUrl);
      link.setAttribute('target','_blank');
      linkNode.appendChild(link)

      //copy button
      let copybtn = document.createElement('button');
      let buttonName = document.createTextNode('Copy');
      copybtn.appendChild(buttonName);
      linkNode.appendChild(copybtn)

      //copy to clipboard
      copybtn.addEventListener('click', function() {

         let textCopy = document.createElement('input')
         document.body.appendChild(textCopy)
         textCopy.setAttribute('value',shortUrl)  
         console.log(textCopy.value) 
         textCopy.select()
         document.execCommand("copy");
         textCopy.remove()
         this.setAttribute('class','active-button')
         this.removeChild(buttonName)
         this.appendChild(document.createTextNode('Copied!')) 
      })

      // original link
      let text2 = document.createTextNode(document.getElementById('shorten').value);
      childNode.appendChild(pargraph).appendChild(text2);

      // show link div

      childNode.appendChild(linkNode);
      childNode.setAttribute('class','container');
      parentNode.setAttribute('class','showLink');
      parentNode.appendChild(childNode);

      let shortLinks = [];
      shortLinks.push(parentNode)
      let i = 0;
      for (i; i < shortLinks.length; i++){
      document.body.insertBefore(shortLinks[i], document.getElementById('show'));
      window.localStorage.setItem('links',shortLinks[i]);

      }
      })
}



