let $content = document.getElementById("content");
let $form = document.getElementById("form");
let $name = document.querySelector('[name=name]')
let $weapon = document.querySelector('[name=weapon]')
let $occupation = document.querySelector('[name=occupation]')

$form.onsubmit = (event) => {
  event.preventDefault() // Stop the behavior (stop the redirection)
  console.log("Form submitted", $name.value, $weapon.value, $occupation.value)
  axios.post("https://ih-crud-api.herokuapp.com/characters", {
    name: $name.value,
    weapon: $weapon.value,
    occupation: $occupation.value,
  })
    .then(response => {
      console.log(response.data)
      getAndDisplayAllCharacters()
      $name.value = ""
      $weapon.value = ""
      $occupation.value = ""
    })
}

getAndDisplayAllCharacters()

function getAndDisplayAllCharacters() {
  axios.get("https://ih-crud-api.herokuapp.com/characters").then(response => {
    let characters = response.data;
    let html = `<ul>`;
    for (let i = 0; i < characters.length; i++) {
      html += `<li>
        ${characters[i].name}
        <button data-id="${characters[i].id}">Delete</button>
      </li>`;
    }
    html += `</ul>`;
    $content.innerHTML = html;

    document.querySelectorAll('button').forEach($button => {
      $button.onclick = () => {
        let id = $button.getAttribute('data-id')
        axios.delete("https://ih-crud-api.herokuapp.com/characters/" + id)
          .then(() => {
            getAndDisplayAllCharacters()
          })
      }
    })
  });
}

// Every 2 seconds, get the list of all characters to see if something changed
setInterval(() => {
  getAndDisplayAllCharacters()
}, 2000)