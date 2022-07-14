const btn  = document.getElementById('btn');
const input = (document.getElementById('inpUser') as HTMLInputElement);
const errorP: HTMLElement = document.getElementById('error-Field') 
const userDescription: HTMLElement = document.getElementById('user-desc')
console.log(input)






input.addEventListener('input', (e: any) => {
    const start = Date.now();
  
    fetch(`https://api.github.com/users/${e.target.value}`, {
      method: 'GET'
    })
    .then(response => {
      return new Promise(resolve => {
          const diff  = Date.now() - start;
          if (diff < 1000) {
              setTimeout(() => {
                  console.log('1000');
                  resolve(response);
              }, 1000-diff);
              userDescription.innerHTML = `
                <img src="src/assets/loader.gif"/>
              `
          } else {
              resolve(response);
          }
      });
  })
    .then(function(res: Response) {
        if(res.status === 200){
          errorP.innerHTML = ''
          console.log(res.body)
        } else {
          errorP.innerHTML = "I don`t find this user"
        }
      
  
        
        
      return res.json();
    }).then(function(data) {
      let imgContent: string;
        if(data.avatar_url === null){
          imgContent = "src/assets/img_null.png"
          console.log(imgContent)
        } else {
          imgContent = data.avatar_url
        }
      userDescription.innerHTML = `
      <div class="userCard">
        <img class="user_avatar" src=${imgContent}/>
        <div class="userCard_desc">
          <h3 class="title">User Info</h3>
          <p>UserName: ${data.name === null ? '-' : data.name}</p>
          <p>UserEmail:  ${data.email === null ? '-' : data.email}</p>
          <p>UserCompany:  ${data.company === null ? '-' : data.company}</p>
          <p>UserAdress:  ${data.location === null ? '-' : data.location}</p>
          <p>User Amount of reposetories:  ${data.public_repos === null ? 0 : data.public_repos}</p>
        </div>
      </div>
  
      `
      // `data` is the parsed version of the JSON returned from the above endpoint.
      console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
    });
    
})