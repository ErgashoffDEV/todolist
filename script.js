let tresults = [
    {text: "Dancing", id: '1'}
]

let todoResults = document.querySelector(".todo-results")
let todoResult = todoResults.querySelector(".todo-result")
let form = document.querySelector("form")
let index = 1
let editingTask = null

const showTasks = result => {
    let clone = todoResult.cloneNode(true)
    todoResults.appendChild(clone)
    clone.classList.remove("is-hidden")

    let id = index++
    clone.setAttribute('id', id)

    clone.querySelector(".title").textContent = result.text
    clone.querySelector('#delete').dataset.id = id
    clone.querySelector('#edit').dataset.id = id
}

tresults.forEach(result => {
    showTasks(result)
})

const toggleSpace = resultTitle => {
    return resultTitle
}

const validate = text => {
    console.log(text)
    let hasTask = tresults.find(task => task.text === text)

    if (hasTask && !editingTask) {
       alert(`Task ${form.task.value} is already added!`)
        return true
    } else if (hasTask && hasTask.text === editingTask.text) {
        return false
    } else if (hasTask) {
        alert(`Task ${form.task.value} is already exists!`)
        form.task.classList.add("is-danger")
        form.task.focus()

        return true
    }
    return false
}


const deleteTask = id => {
    tresults = tresults.filter(item => item.id !== id)
    document.getElementById(id).remove()
}

const editTask = id => {
    let result = tresults.find(item => item.id === id)

    form.task.value = result.text

    form.querySelector(".todo-button").textContent = 'Update'
    editingTask = result
}


form.addEventListener('submit', event => {
    event.preventDefault()

    let alreadyAdded = validate(form.task.value)

    if (!alreadyAdded && editingTask) {
        let thisTask = document.getElementById(editingTask.id)

        tresults = tresults.map(result => {
            if (editingTask.text === result.text) {
                result.text = form.task.value
            }
            return result
        })


        thisTask.querySelector('.title').textContent = form.task.value
        thisTask.querySelector('#edit').dataset.text = form.task.value

        form.reset()
        form.querySelector(".todo-button").textContent = "Add"
        form.task.classList.remove("is-danger")

        editingTask = null

    } else if (!alreadyAdded) {
        let result = {
            text: form.task.value,
            id: String(index)
        }

        tresults.push(result)
        showTasks(result)

        form.reset()
        form.task.classList.remove("is-danger")
    }
})